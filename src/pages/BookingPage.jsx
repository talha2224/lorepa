import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import config from '../config';
import toast from 'react-hot-toast';

const UploadCloudIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
        className="w-12 h-12 text-gray-400"
    >
        <path d="M12 16v-8" />
        <path d="M8 12h8" />
        <path d="M16 16l-4-4-4 4" />
        <path d="M18 10h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1" />
    </svg>
);

const BookingSuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleGoHome = () => {
        onClose();
        window.location.href = '/';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 relative w-96">
                <button onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">
                    &times;
                </button>
                <div className="flex flex-col items-center justify-center space-y-6">
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="w-12 h-12" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9.75 10.5a.75.75 0 0 1-1.12.02L3.248 10.37a.75.75 0 1 1 1.06-1.06l5.25 5.25 9.25-9.998a.75.75 0 0 1 1.04-.208Z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 text-center">Verification completed</h3>
                    <button onClick={handleGoHome}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200">
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

const BookingPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [trailers, setTrailers] = useState([]);
    const [selectedTrailer, setSelectedTrailer] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState(0);
    const [formData, setFormData] = useState({
        driverLicenseFile: null,
        country: '',
        firstName: '',
        middleName: '',
        lastName: '',
        licenseNumber: '',
        dateOfBirth: '',
        expirationDate: '',
        vehicleInsuranceFile: null,
        vehicleRegistrationFile: null,
    });

    const steps = [
        {
            title: 'Driver\'s License',
            description: 'Scan your driver\'s license or enter your information.',
            fields: [
                {
                    id: 'driverLicenseFile',
                    label: 'Upload Driver License',
                    type: 'file',
                    placeholder: 'Upload Driver License',
                    icon: <UploadCloudIcon />
                },
                {
                    id: 'country',
                    label: 'Country',
                    type: 'select',
                    options: ['Select country', 'USA', 'Canada', 'Mexico']
                },
                { id: 'firstName', label: 'First Name', type: 'text', placeholder: 'John' },
                { id: 'middleName', label: 'Middle Name', type: 'text', placeholder: 'M.' },
                { id: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe' },
                { id: 'licenseNumber', label: 'License Number', type: 'text', placeholder: 'ABC123456' },
                { id: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
                { id: 'expirationDate', label: 'Expiration Date', type: 'date' },
            ]
        },
        {
            title: 'Vehicle Insurance',
            description: 'Upload your valid insurance document.',
            fields: [
                {
                    id: 'vehicleInsuranceFile',
                    label: 'Upload Insurance',
                    type: 'file',
                    placeholder: 'Upload insurance document',
                    icon: <UploadCloudIcon />
                }
            ]
        },
        {
            title: 'Vehicle Registration',
            description: 'Upload your vehicle registration document.',
            fields: [
                {
                    id: 'vehicleRegistrationFile',
                    label: 'Upload Registration',
                    type: 'file',
                    placeholder: 'Upload registration document',
                    icon: <UploadCloudIcon />
                }
            ]
        },
    ];

    const [showBookingSuccessModal, setShowBookingSuccessModal] = useState(false);

    useEffect(() => {
        axios.get(`${config.baseUrl}/trailer/all`).then(res => setTrailers(res.data.data)).catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (startDate && endDate && selectedTrailer) {
            const trailer = trailers.find(t => t._id === selectedTrailer);
            if (trailer) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                const rate = parseFloat(trailer.dailyRate || '0');
                setPrice(rate * diffDays);
            }
        }
    }, [startDate, endDate, selectedTrailer, trailers]);

    const handleChange = (e) => {
        const { id, value, files, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = async () => {
        const form = new FormData();
        try {
            form.append("driverLicenseImage", formData.driverLicenseFile);
            form.append("vehicleInsuraneImage", formData.vehicleInsuranceFile);
            form.append("vehicleRegistrationImage", formData.vehicleRegistrationFile);
            form.append("country", formData.country);
            form.append("firstname", formData.firstName);
            form.append("middlename", formData.middleName);
            form.append("lastname", formData.lastName);
            form.append("licenseNumber", formData.licenseNumber);
            form.append("dob", formData.dateOfBirth);
            form.append("expirationDate", formData.expirationDate);
            form.append("trailerId", selectedTrailer);
            form.append("startDate", startDate);
            form.append("endDate", endDate);
            form.append("price", price);

            const res = await axios.post(`${config.baseUrl}/booking/create`, form, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (res.data) {
                toast.success("Booking submitted successfully");
                setShowBookingSuccessModal(true);
            }
        } catch (error) {
            console.error("Booking error:", error);
            toast.error(error.response?.data?.msg || "Submission failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col font-inter">
            <Navbar />
            <div className="flex-1 container mx-auto p-6 flex">
                <div className="hidden md:block w-1/4 pr-8 border-r border-gray-300">
                    <ul className="space-y-4">
                        {steps.map((step, index) => (
                            <li key={index}
                                className={`flex items-center cursor-pointer p-2 rounded-md
                                    ${index === currentStep ? 'text-blue-600' : 'text-gray-600'}
                                    ${index < currentStep ? 'text-green-600' : ''}`}
                                onClick={() => setCurrentStep(index)}>
                                <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-3
                                    ${index === currentStep ? 'bg-blue-600 text-white' : 'border border-gray-400'}
                                    ${index < currentStep ? 'bg-green-600 text-white' : ''}`}>
                                    {index < currentStep ? '✓' : index + 1}
                                </span>
                                <span className="text-sm">{step.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 px-4">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{steps[currentStep].title}</h2>
                    <p className="text-gray-500 mb-6">{steps[currentStep].description}</p>

                    <div className="grid grid-cols-1 gap-6">
                        {currentStep === 0 && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Trailer</label>
                                    <select value={selectedTrailer} onChange={(e) => setSelectedTrailer(e.target.value)}
                                        className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                                        <option value="" disabled>Select trailer</option>
                                        {trailers.map((trailer) => (
                                            <option key={trailer._id} value={trailer._id}>{trailer.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Booking Start Date</label>
                                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                                        className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Booking End Date</label>
                                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                                        className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                                </div>
                                {price > 0 && (
                                    <div>
                                        <p className="text-green-600 text-sm font-semibold">Estimated Price: ${price.toFixed(2)}</p>
                                    </div>
                                )}
                            </>
                        )}

                        {steps[currentStep].fields.map(field => (
                            <div key={field.id}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                {field.type === 'file' ? (
                                    <div onClick={() => document.getElementById(field.id).click()}
                                        className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center bg-white rounded-md cursor-pointer hover:bg-gray-50">
                                        <input id={field.id} type="file" className="hidden" onChange={handleChange} />
                                        {field.icon}
                                        <p className="text-sm text-gray-500 mt-2">{field.placeholder}</p>
                                        {formData[field.id] && (
                                            <p className="text-green-600 text-sm mt-1">{formData[field.id]?.name}</p>
                                        )}
                                    </div>
                                ) : field.type === 'select' ? (
                                    <select id={field.id} value={formData[field.id]} onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                                        {field.options.map((opt, idx) => (
                                            typeof opt === 'string' ? (
                                                <option key={idx} value={opt === 'Select country' ? '' : opt} disabled={idx === 0}>{opt}</option>
                                            ) : (
                                                <option key={idx} value={opt.value}>{opt.label}</option>
                                            )
                                        ))}
                                    </select>
                                ) : (
                                    <input id={field.id} type={field.type} value={formData[field.id] || ''}
                                        placeholder={field.placeholder}
                                        onChange={handleChange}
                                        className="w-full border px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-8 pt-4 border-t">
                        {currentStep > 0 && (
                            <button onClick={() => setCurrentStep(currentStep - 1)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-md">
                                Back
                            </button>
                        )}
                        {currentStep < steps.length - 1 ? (
                            <button onClick={() => setCurrentStep(currentStep + 1)}
                                className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                                Next
                            </button>
                        ) : (
                            <button onClick={handleSubmit}
                                className="ml-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
                                Complete
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
            <BookingSuccessModal isOpen={showBookingSuccessModal} onClose={() => setShowBookingSuccessModal(false)} />
        </div>
    );
};

export default BookingPage;
