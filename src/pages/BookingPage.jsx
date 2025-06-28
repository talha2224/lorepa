import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UploadCloudIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12 text-gray-400"
    >
        <path d="M12 16v-8" />
        <path d="M8 12h8" />
        <path d="M16 16l-4-4-4 4" />
        <path d="M18 10h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1" />
        <path d="M18 10h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1" />
        <path d="M7 10v.01" />
        <path d="M17 10v.01" />
        <path d="M12 14v.01" />
        <path d="M12 6v.01" />
    </svg>
);


// Booking Success Modal Component - Updated for "Verification completed"
const BookingSuccessModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const handleGoHome = () => {
        onClose();
        window.location.href = '/'; // Simulate routing to the home page
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 relative w-96">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                >
                    &times;
                </button>

                <div className="flex flex-col items-center justify-center space-y-6">
                    {/* Checkmark Icon */}
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="white"
                            className="w-12 h-12"
                        >
                            <path
                                fillRule="evenodd"
                                d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9.75 10.5a.75.75 0 0 1-1.12.02L3.248 10.37a.75.75 0 1 1 1.06-1.06l5.25 5.25 9.25-9.998a.75.75 0 0 1 1.04-.208Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 text-center">Verification completed</h3>

                    <button
                        onClick={handleGoHome}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};


const BookingPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        // Driver's License Step
        driverLicenseFile: null,
        country: '',
        firstName: '',
        middleName: '',
        lastName: '',
        licenseNumber: '',
        dateOfBirth: '',
        expirationDate: '',
        // Vehicle Insurance Step
        vehicleInsuranceFile: null,
        // Vehicle Registration Step
        vehicleRegistrationFile: null,
    });

    const [showBookingSuccessModal, setShowBookingSuccessModal] = useState(false);


    const steps = [
        {
            title: 'Driver\'s License',
            description: 'Scan your driver\'s license or enter your information exactly as it appears on your license.',
            fields: [
                {
                    id: 'driverLicenseFile',
                    label: 'Scan/upload your drivers license',
                    type: 'file',
                    placeholder: 'SVG, PNG, JPG or GIF (max. 800x600px)',
                    icon: <UploadCloudIcon />,
                },
                {
                    id: 'country',
                    label: 'Country',
                    type: 'select',
                    options: ['Select country', 'USA', 'Canada', 'Mexico'],
                },
                { id: 'firstName', label: 'First name', type: 'text', placeholder: 'First name' },
                { id: 'middleName', label: 'Middle name', type: 'text', placeholder: 'Middle name' },
                { id: 'lastName', label: 'Last name', type: 'text', placeholder: 'Last name' },
                { id: 'licenseNumber', label: 'License number', type: 'text', placeholder: '000-0000-000' },
                { id: 'dateOfBirth', label: 'Date of birth', type: 'date', placeholder: 'DD-MM-YYYY' },
                { id: 'expirationDate', label: 'Expiration date', type: 'date', placeholder: 'DD-MM-YYYY' },
            ],
        },
        {
            title: 'Vehicle Insurance (FAQ 27)',
            description: 'For your safety and to complete your first booking, we\'ll need a few documents.',
            fields: [
                {
                    id: 'vehicleInsuranceFile',
                    label: 'Vehicle Insurance (FAQ 27)',
                    type: 'file',
                    placeholder: 'SVG, PNG, JPG or GIF (max. 800x600px)',
                    icon: <UploadCloudIcon />,
                },
            ],
        },
        {
            title: 'Vehicle registration',
            description: 'For your safety and to complete your first booking, we\'ll need a few documents.',
            fields: [
                {
                    id: 'vehicleRegistrationFile',
                    label: 'Vehicle registration',
                    type: 'file',
                    placeholder: 'SVG, PNG, JPG or GIF (max. 800x600px)',
                    icon: <UploadCloudIcon />,
                },
            ],
        },
    ];

    const handleChange = (e) => {
        const { id, value, files, type } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: type === 'file' ? files[0] : value,
        }));
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prevStep => prevStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prevStep => prevStep - 1);
        }
    };

    const handleSubmit = () => {
        console.log('Booking submitted:', formData);
        setShowBookingSuccessModal(true); // Open the success modal
    };

    const handleCloseBookingSuccessModal = () => {
        setShowBookingSuccessModal(false);
        // This will be handled by the modal's internal button to route to '/'
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const currentStepData = steps[currentStep];

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col font-inter'>
            <Navbar />

            <div className="flex flex-1 container mx-auto p-6 md:p-8 lg:p-10">
                {/* Sidebar for steps progress */}
                <div className="w-1/4 pr-8 hidden md:block border-r border-r-[#C3C3C3]">
                    <ul className="space-y-4">
                        {steps.map((step, index) => (
                            <li
                                key={index}
                                className={`flex items-center text-lg font-medium cursor-pointer rounded-lg p-2 transition-colors duration-200
                                    ${index === currentStep ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-200'}
                                    ${index < currentStep ? 'text-gray-400' : ''}`}
                                onClick={() => setCurrentStep(index)}
                            >
                                <div className={`min-w-6 min-h-6 flex items-center justify-center rounded-full text-sm mr-3
                                    ${index === currentStep ? 'bg-blue-600 text-white' : 'border border-gray-400 text-gray-600'}
                                    ${index < currentStep ? 'bg-green-500 text-white border-green-500' : ''}`}
                                >
                                    {index < currentStep ? '✓' : index + 1}
                                </div>
                                <span className='text-xs'>{step.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main content area for the form */}
                <div className="flex-1 px-8">
                    <h2 className="text-3xl text-[#757982] mb-4 border-b border-b-[#CCCCCC] pb-3">Book a trailer</h2>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-6">{currentStepData.title}</h3>
                    <p className="text-gray-600 mb-8">{currentStepData.description}</p>

                    <div className="grid grid-cols-1 gap-6">
                        {currentStepData.fields.map(field => (
                            <div key={field.id} className="mb-4">
                                <label htmlFor={field.id} className="block text-gray-700 text-sm mb-2">
                                    {field.label}
                                </label>
                                {field.type === 'file' ? (
                                    <div className="flex flex-col items-center justify-center w-full py-10 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <input id={field.id} type="file" className="hidden" onChange={handleChange} />
                                        {field.icon}
                                        <p className="mt-2 text-sm text-gray-600">
                                            <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">{field.placeholder}</p>
                                    </div>
                                ) : field.type === 'select' ? (
                                    <div className="relative">
                                        <select
                                            id={field.id}
                                            value={formData[field.id] || ''}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none pr-8"
                                        >
                                            {field.options.map((option, idx) => (
                                                <option key={idx} value={option === field.options[0] ? '' : option} disabled={option === field.options[0]}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                ) : (
                                    <input
                                        id={field.id}
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={formData[field.id] || ''}
                                        onChange={handleChange}
                                        className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                        {currentStep > 0 && (
                            <button
                                onClick={handleBack}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-md shadow-md transition duration-200"
                            >
                                Back
                            </button>
                        )}
                        {currentStep < steps.length - 1 ? (
                            <button
                                onClick={handleNext}
                                className="ml-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-md transition duration-200"
                            >
                                Next
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="ml-auto bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md shadow-md transition duration-200"
                            >
                                Completed
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

            {/* Booking Success Modal */}
            <BookingSuccessModal
                isOpen={showBookingSuccessModal}
                onClose={handleCloseBookingSuccessModal}
            />
        </div>
    );
};

export default BookingPage;
