import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GoAlertFill } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../config';
import toast from 'react-hot-toast';

const ListTrailer = () => {
    const nav = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        make: '',
        model: '',
        description: '',
        year: '',
        length: '',
        sleeps: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        dailyRate: '',
        weeklyRate: '',
        monthlyRate: '',
        cleaningRate: '',
        securityRate: '',
        insuranceDeductible: ''
    });

    const steps = [
        {
            title: 'Basic Info',
            description: 'Start with the basic information about your trailer.',
            fields: [
                { id: 'title', label: 'Listing Title', type: 'text', placeholder: 'Give your listing a captivating title' },
                { id: 'category', label: 'Category', type: 'select', options: ['Select Category', 'Travel Trailer', 'Fifth Wheel', 'Toy Hauler'] },
                { id: 'make', label: 'Trailer Make', type: 'text', placeholder: 'e.g., Airstream' },
                { id: 'model', label: 'Trailer Model', type: 'text', placeholder: 'e.g., Classic' },
                { id: 'description', label: 'Description of your trailer', type: 'textarea', placeholder: 'Describe your trailer in detail' },
            ],
        },
        {
            title: 'Trailer Details',
            description: 'Provide more specific details about your trailer.',
            fields: [
                { id: 'year', label: 'Year', type: 'text', placeholder: 'e.g., 2020' },
                { id: 'length', label: 'Length (in feet)', type: 'text', placeholder: 'e.g., 25' },
                { id: 'sleeps', label: 'Sleeps (number of people)', type: 'text', placeholder: 'e.g., 4' },
            ],
        },
        {
            title: 'Location Address',
            description: 'Enter the location where your trailer will be available for pickup.',
            fields: [
                { id: 'address', label: 'Address', type: 'text', placeholder: 'Street Address' },
                { id: 'city', label: 'City', type: 'text', placeholder: 'City' },
                { id: 'state', label: 'State/Province', type: 'text', placeholder: 'State/Province' },
                { id: 'zip', label: 'Zip/Postal Code', type: 'text', placeholder: 'Zip/Postal Code' },
            ],
        },
        {
            title: 'Pricing & Rental Terms',
            description: 'Set your pricing and define rental terms for your trailer.',
            fields: [
                { id: 'dailyRate', label: 'Daily Rate (CAD)', type: 'text', placeholder: 'e.g., $150.00 CAD' },
                { id: 'weeklyRate', label: 'Weekly Rate (CAD)', type: 'text', placeholder: 'e.g., $900.00 CAD' },
                { id: 'monthlyRate', label: 'Monthly Rate (CAD)', type: 'text', placeholder: 'e.g., $3000.00 CAD' },
                { id: 'cleaningRate', label: 'Cleaning Fee (CAD)', type: 'text', placeholder: 'e.g., $50.00 CAD' },
                { id: 'securityRate', label: 'Security Deposit (CAD)', type: 'text', placeholder: 'e.g., $1000.00 CAD' },
                { id: 'insuranceDeductible', label: 'Insurance Deductible (CAD)', type: 'text', placeholder: 'e.g., $500.00 CAD' },
            ],
        },
    ];

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) return toast.error("User ID not found");

            const data = new FormData();
            data.append("userId", userId);

            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            images.forEach((img) => {
                data.append("images", img);
            });

            const res = await axios.post(`${config.baseUrl}/trailer/create`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data?.status === 200) {
                toast.success("Trailer created successfully!");
                setTimeout(() => {
                    nav("/");
                }, 2000);
            } else {
                toast.error(res.data?.msg || "Submission failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const currentStepData = steps[currentStep];

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col font-inter'>
            <Navbar />
            <div className="flex flex-1 container mx-auto p-6 md:p-8 lg:p-10">
                <div className="w-1/4 pr-8 hidden md:block border-r border-r-[#C3C3C3]">
                    <ul className="space-y-4">
                        {steps.map((step, index) => (
                            <li key={index} className={`flex items-center text-lg font-medium cursor-pointer rounded-lg p-2 transition-colors duration-200 ${index === currentStep ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-200'} ${index < currentStep ? 'text-gray-400' : ''}`} onClick={() => setCurrentStep(index)}>
                                <div className={`min-w-6 min-h-6 flex items-center justify-center rounded-full text-sm mr-3 ${index === currentStep ? 'bg-blue-600 text-white' : 'border border-gray-400 text-gray-600'} ${index < currentStep ? 'bg-green-500 text-white border-green-500' : ''}`}>
                                    {index < currentStep ? '✓' : index + 1}
                                </div>
                                <span className='text-xs'>{step.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 px-8">
                    <h2 className="text-3xl text-[#757982] mb-4 border-b border-b-[#CCCCCC] pb-3">List Trailer</h2>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-6">{currentStepData.title}</h3>
                    <p className="text-gray-600 mb-8">{currentStepData.description}</p>

                    <div className="bg-black text-white px-4 py-3 rounded relative mb-8 flex items-center gap-x-2" role="alert">
                        <GoAlertFill className='text-xl' />
                        <div>
                            <span>Important! </span>
                            <span className="block sm:inline">
                                You will not be approved until you set up your bank account. Login to the mobile app to set up your bank account or click <a href="#" className="underline">here</a>.
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {currentStepData.fields.map(field => (
                            <div key={field.id} className="mb-4">
                                <label htmlFor={field.id} className="block text-gray-700 text-sm mb-2">{field.label}</label>
                                {field.type === 'select' ? (
                                    <select
                                        id={field.id}
                                        value={formData[field.id] || ''}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                                    >
                                        {field.options.map((option, idx) => (
                                            <option key={idx} value={option === field.options[0] ? '' : option} disabled={option === field.options[0]}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : field.type === 'textarea' ? (
                                    <textarea
                                        id={field.id}
                                        placeholder={field.placeholder}
                                        value={formData[field.id]}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                                    />
                                ) : (
                                    <input
                                        id={field.id}
                                        type="text"
                                        placeholder={field.placeholder}
                                        value={formData[field.id]}
                                        onChange={handleChange}
                                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {currentStep === steps.length - 1 && (
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm mb-2">Upload Trailer Images (Max 4)</label>
                            <button
                                type="button"
                                onClick={() => document.getElementById("imageUploadInput").click()}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-sm"
                            >
                                Upload Images
                            </button>
                            <input
                                type="file"
                                id="imageUploadInput"
                                accept="image/*"
                                multiple
                                hidden
                                onChange={(e) => {
                                    const selected = Array.from(e.target.files);
                                    if (selected.length > 4) {
                                        toast.error("Only 4 images allowed");
                                    } else {
                                        setImages(selected);
                                    }
                                }}
                            />
                            <p className="mt-2 text-sm text-gray-500">{images.length} image(s) selected.</p>
                        </div>
                    )}

                    <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                        {currentStep > 0 && (
                            <button onClick={handleBack} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-md">
                                Back
                            </button>
                        )}
                        {currentStep < steps.length - 1 ? (
                            <button onClick={handleNext} className="ml-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md">
                                Next
                            </button>
                        ) : (
                            <button onClick={handleSubmit} className="ml-auto bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md">
                                Submit
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ListTrailer;
