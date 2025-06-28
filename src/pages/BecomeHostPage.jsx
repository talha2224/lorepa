import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VerificationModal from '../components/VerificationModel';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

const BecomeHostPage = () => {
    const nav = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [formData, setFormData] = useState({});

    const UploadCloudIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-gray-400">
            <path d="M12 16v-8" /><path d="M8 12h8" /><path d="M16 16l-4-4-4 4" />
            <path d="M18 10h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h1" />
        </svg>
    );

    const steps = [
        {
            title: 'Valid drivers license(Class 5 or equivalent)',
            description: 'Scan your driver\'s license or enter your information exactly as it appears on your license.',
            fields: [
                { id: 'driverLicense', label: 'Scan/upload your drivers license', type: 'file', placeholder: 'SVG, PNG, JPG or GIF (max. 800x600px)', icon: <UploadCloudIcon /> },
                { id: 'country', label: 'Country', type: 'select', options: ['Select country', 'USA', 'Canada', 'Mexico'] },
                { id: 'firstName', label: 'First name', type: 'text', placeholder: 'First name' },
                { id: 'middleName', label: 'Middle name', type: 'text', placeholder: 'Middle name (optional)' },
                { id: 'lastName', label: 'Last name', type: 'text', placeholder: 'Last name' },
                { id: 'licenseNumber', label: 'License number', type: 'text', placeholder: '000-0000-000' },
                { id: 'dateOfBirth', label: 'Date of birth', type: 'text', placeholder: 'DD-MM-YYYY' },
                { id: 'expirationDate', label: 'Expiration date', type: 'text', placeholder: 'DD-MM-YYYY' },
            ],
        },
        {
            title: 'Valid Auto Insurance Policy',
            description: 'Provide details about your auto insurance policy.',
            fields: [
                { id: 'policyNumber', label: 'Policy Number', type: 'text', placeholder: 'Policy Number' },
                { id: 'insuranceProvider', label: 'Insurance Provider', type: 'text', placeholder: 'Insurance Provider' },
                { id: 'policyDocument', label: 'Upload Policy Document', type: 'file', placeholder: 'PDF, JPG, PNG' },
            ],
        },
        {
            title: 'Trailer Registration Certificate (SAAQ)',
            description: 'Upload your trailer registration certificate.',
            fields: [
                { id: 'registrationCertificate', label: 'Upload Certificate', type: 'file', placeholder: 'PDF, JPG, PNG' },
            ],
        },
        {
            title: 'Photos of the Trailer (at least 4 angles)',
            description: 'Upload clear photos of your trailer from various angles.',
            fields: [
                { id: 'trailerPhoto1', label: 'Photo 1', type: 'file', placeholder: 'JPG, PNG' },
                { id: 'trailerPhoto2', label: 'Photo 2', type: 'file', placeholder: 'JPG, PNG' },
                { id: 'trailerPhoto3', label: 'Photo 3', type: 'file', placeholder: 'JPG, PNG' },
                { id: 'trailerPhoto4', label: 'Photo 4', type: 'file', placeholder: 'JPG, PNG' },
            ],
        },
        {
            title: 'Mechanical Inspection Report (if applicable)',
            description: 'If required, upload your mechanical inspection report.',
            fields: [
                { id: 'inspectionReport', label: 'Upload Report', type: 'file', placeholder: 'PDF, JPG, PNG' },
            ],
        },
        {
            title: 'Proof of Ownership (If registration is under a different name)',
            description: 'Provide proof of ownership if the registration is not in your name.',
            fields: [
                { id: 'proofOfOwnership', label: 'Upload Proof', type: 'file', placeholder: 'PDF, JPG, PNG' },
            ],
        },
        {
            title: 'Trailer Serial Number (VIN)',
            description: 'Enter your trailer\'s serial number (VIN).',
            fields: [
                { id: 'vinNumber', label: 'VIN Number', type: 'text', placeholder: 'Trailer VIN Number' },
            ],
        },
        {
            title: 'Permission from Third Party Owner or Lessor',
            description: 'If applicable, upload permission from the third-party owner or lessor.',
            fields: [
                { id: 'permissionLetter', label: 'Upload Permission Letter', type: 'file', placeholder: 'PDF, JPG, PNG' },
            ],
        },
    ];

    const handleChange = (e) => {
        const { id, value, files, type } = e.target;
        setFormData(prev => ({ ...prev, [id]: type === 'file' ? files[0] : value }));
    };

    const currentStepData = steps[currentStep];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    return (
        <div className='min-h-screen bg-gray-100 flex flex-col font-inter'>
            <Navbar />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                className="flex flex-1 p-4 sm:p-6 lg:p-8 flex-wrap"
            >
                <div className="w-1/4 pr-8 hidden md:block border-r border-r-[#C3C3C3]">
                    <ul className="space-y-4">
                        {steps.map((step, index) => (
                            <li key={index} onClick={() => setCurrentStep(index)}
                                className={`flex items-center text-lg font-medium cursor-pointer rounded-lg p-2 ${index === currentStep ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-200'} ${index < currentStep ? 'text-gray-400' : ''}`}
                            >
                                <div className={`min-w-6 min-h-6 flex items-center justify-center rounded-full text-sm mr-3 ${index === currentStep ? 'bg-blue-600 text-white' : 'border border-gray-400 text-gray-600'} ${index < currentStep ? 'bg-green-500 text-white border-green-500' : ''}`}>
                                    {index < currentStep ? '✓' : index + 1}
                                </div>
                                <span className='text-xs'>{step.title}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 px-8">
                    <motion.h2 variants={fadeInUp} className="text-3xl text-[#757982] mb-4 border-b border-b-[#CCCCCC] pb-3">Become a host</motion.h2>
                    <motion.h3 variants={fadeInUp} className="text-2xl font-semibold text-gray-700 mb-6">{currentStepData.title}</motion.h3>
                    <motion.p variants={fadeInUp} className="text-gray-600 mb-8">{currentStepData.description}</motion.p>

                    <motion.div variants={fadeInUp} className="grid grid-cols-1 gap-6">
                        {currentStepData.fields.map(field => (
                            <div key={field.id} className="mb-4">
                                <label htmlFor={field.id} className="block text-gray-700 text-sm mb-2">{field.label}</label>
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
                                    <select id={field.id} value={formData[field.id] || ''} onChange={handleChange} className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md">
                                        {field.options.map((opt, i) => (
                                            <option key={i} value={opt === field.options[0] ? '' : opt} disabled={opt === field.options[0]}>{opt}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input id={field.id} type={field.type} placeholder={field.placeholder} value={formData[field.id] || ''} onChange={handleChange} className="shadow-sm appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none" />
                                )}
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={fadeInUp} className="flex justify-between mt-8 pt-4 border-t border-gray-200">
                        {currentStep > 0 && (
                            <button onClick={() => setCurrentStep(prev => prev - 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-md shadow-md">Back</button>
                        )}
                        {currentStep < steps.length - 1 ? (
                            <button onClick={() => setCurrentStep(prev => prev + 1)} className="ml-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-md">Next</button>
                        ) : (
                            <button onClick={() => setShowVerificationModal(true)} className="ml-auto bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md shadow-md">Submit</button>
                        )}
                    </motion.div>
                </div>
            </motion.div>

            <VerificationModal isOpen={showVerificationModal} onClose={() => setShowVerificationModal(false)} onListTrailer={() => { setShowVerificationModal(false); nav('/list'); }} />
            <Footer />
        </div>
    );
};

export default BecomeHostPage;
