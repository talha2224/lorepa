import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { GoAlertFill } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const ListTrailer = () => {
    const nav = useNavigate()
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        // Basic Info
        listingTitle: '',
        category: '',
        trailerMake: '',
        trailerModel: '',
        description: '',
        // Trailer Details - add more fields as needed
        year: '',
        length: '',
        sleeps: '',
        // Location
        address: '',
        city: '',
        state: '',
        zipCode: '',
        // Pricing & Rental Terms
        dailyRate: '',
        weeklyRate: '',
        monthlyRate: '',
        cleaningFee: '',
        securityDeposit: '',
        insuranceDeductible: '',
        // Add more pricing fields as seen in the image
    });

    const steps = [
        {
            title: 'Basic Info',
            description: 'Start with the basic information about your trailer.',
            fields: [
                { id: 'listingTitle', label: 'Listing Title', type: 'text', placeholder: 'Give your listing a captivating title' },
                { id: 'category', label: 'Category', type: 'select', options: ['Select Category', 'Travel Trailer', 'Fifth Wheel', 'Toy Hauler'] },
                { id: 'trailerMake', label: 'Trailer Make', type: 'text', placeholder: 'e.g., Airstream' },
                { id: 'trailerModel', label: 'Trailer Model', type: 'text', placeholder: 'e.g., Classic' },
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
                // Add more fields for additional details like amenities, features etc.
            ],
        },
        {
            title: 'Location Address',
            description: 'Enter the location where your trailer will be available for pickup.',
            fields: [
                { id: 'address', label: 'Address', type: 'text', placeholder: 'Street Address' },
                { id: 'city', label: 'City', type: 'text', placeholder: 'City' },
                { id: 'state', label: 'State/Province', type: 'text', placeholder: 'State/Province' },
                { id: 'zipCode', label: 'Zip/Postal Code', type: 'text', placeholder: 'Zip/Postal Code' },
            ],
        },
        {
            title: 'Pricing & Rental Terms',
            description: 'Set your pricing and define rental terms for your trailer.',
            fields: [
                { id: 'dailyRate', label: 'Daily Rate (CAD)', type: 'text', placeholder: 'e.g., $150.00 CAD' },
                { id: 'weeklyRate', label: 'Weekly Rate (CAD)', type: 'text', placeholder: 'e.g., $900.00 CAD' },
                { id: 'monthlyRate', label: 'Monthly Rate (CAD)', type: 'text', placeholder: 'e.g., $3000.00 CAD' },
                { id: 'cleaningFee', label: 'Cleaning Fee (CAD)', type: 'text', placeholder: 'e.g., $50.00 CAD' },
                { id: 'securityDeposit', label: 'Security Deposit (CAD)', type: 'text', placeholder: 'e.g., $1000.00 CAD' },
                { id: 'insuranceDeductible', label: 'Insurance Deductible (CAD)', type: 'text', placeholder: 'e.g., $500.00 CAD' },
                // Add other pricing related fields like discounts, minimum rental periods etc.
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
        console.log('Trailer Listing Submitted:', formData);
        nav("/")
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
                            <li key={index} className={`flex items-center text-lg font-medium cursor-pointer rounded-lg p-2 transition-colors duration-200 ${index === currentStep ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-200'} ${index < currentStep ? 'text-gray-400' : ''}`} onClick={() => setCurrentStep(index)}>
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
                    <h2 className="text-3xl text-[#757982] mb-4 border-b border-b-[#CCCCCC] pb-3">List Trailer</h2>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-6">{currentStepData.title}</h3>
                    <p className="text-gray-600 mb-8">{currentStepData.description}</p>

                    {/* Notification/Info Banner (as seen in the image) */}
                    <div className="bg-black text-white px-4 py-3 rounded relative mb-8 flex items-center gap-x-2 " role="alert">
                        <GoAlertFill className='text-xl' />
                        <div>
                            <span>Important! </span>
                            <span className="block sm:inline">You will not be approved until you set up your bank account. Login to the mobile app to set up your bank account or click <a href="#" className="underline">here</a>.</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {currentStepData.fields.map(field => (
                            <div key={field.id} className="mb-4">
                                <label htmlFor={field.id} className="block text-gray-700 text-sm mb-2">
                                    {field.label}
                                </label>
                                {field.type === 'select' ? (
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
                                ) : field.type === 'textarea' ? (
                                    <textarea
                                        id={field.id}
                                        placeholder={field.placeholder}
                                        value={formData[field.id] || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    ></textarea>
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
