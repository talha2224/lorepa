import React, { useState } from 'react';

const mockListing = {
    id: '123456',
    title: "2017 Diamond C Utility 77'' x14'",
    images: [
        "https://dealer-cdn.com/media/trailerworld/20250318_113718.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGgNn3wKnfWzUjEeel1WE0D5XUulbduHZGdg&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSihKBys-n7up81fK34e3-1c17yGK9JQTayK97c4A5Y5pZtyStmd2XRmDYrKgQKh485wCI&usqp=CAU",
    ],
    owner: {
        name: "John Doe",
        avatar: "https://placehold.co/40x40/BADA55/FFFFFF?text=JD", // Placeholder avatar
    },
    trailerId: "0008000021",
    category: "Enclosed Trailer Rentals",
    trailerType: "Cargo", // Placeholder for actual trailer type
    detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu euismod semper. Mauris vitae mi id metus magna aliqua.",

    // Pricing & Rental Terms
    pricing: {
        daily: "300 CAD",
        weekly: "850 CAD",
        monthly: "3000 CAD",
        totalAmount: "3800 CAD", // Example calculation based on monthly + some days
        largeServiceFee: "50 CAD",
        optionalInsurance: "50 CAD",
        securityDepositHold: "500 CAD",
        minimumRentalDays: "08 days",
        maximumRentalDays: "08 days",
    },

    // Trailer Details
    details: {
        hitchType: "Bumper pull",
        ballSize: "2 inch",
        weightCapacity: "10kg",
        lightPlugConfiguration: "07lt",
        trailerDimension: "000",
        year: "0000",
        model: "0000",
        vin: "0000",
    },

    // Final Setup
    finalSetup: {
        trailerValue: "0000",
    },
};

const AdminListingDetailPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0); // State for image carousel

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? mockListing.images.length - 1 : prevIndex - 1
        );
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === mockListing.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className='min-h-screen'>
            {/* Header and Title */}
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-xl sm:text-2xl  text-gray-900'>{mockListing.title}</h1>
                <div className='flex space-x-2'>
                    <button className='px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 text-sm '>
                        Approve
                    </button>
                    <button className='px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 text-sm '>
                        Reject
                    </button>
                </div>
            </div>

            {/* Image Carousel/Viewer */}
            <div className='relative w-full h-64 sm:h-96 bg-gray-200 rounded-lg overflow-hidden mb-8'>
                <img src={mockListing.images[currentImageIndex]} alt={mockListing.title} className='w-full h-full object-cover' onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/CCCCCC/666666?text=Image+Unavailable"; }}/>
                <button onClick={goToPreviousImage} className='absolute top-1/2 left-4 -translate-y-1/2 bg-blue-800  text-white p-2 rounded-full focus:outline-none hover:bg-opacity-75' aria-label='Previous image'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button onClick={goToNextImage} className='absolute top-1/2 right-4 -translate-y-1/2 bg-blue-800 text-white p-2 rounded-full focus:outline-none hover:bg-opacity-75' aria-label='Next image'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Basic Info Section */}
            <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
                <h3 className='text-xl  text-gray-900 mb-4'>Basic Info</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700'>
                    <p><span className=''>Name of owner:</span> {mockListing.owner.name}</p>
                    <div className='flex items-center justify-end'>
                        {mockListing.owner.avatar && (
                            <img
                                src={mockListing.owner.avatar}
                                alt={mockListing.owner.name}
                                className='w-10 h-10 rounded-full mr-2 object-cover'
                            />
                        )}
                        <span className=''>{mockListing.owner.name}</span>
                    </div>
                    <p><span className=''>Trailer ID:</span> {mockListing.trailerId}</p>
                    <p><span className=''>Category:</span> {mockListing.category}</p>
                    <p><span className=''>Trailer type/make:</span> {mockListing.trailerType}</p>
                    <div className='md:col-span-2'>
                        <p className=' mb-1'>Detailed description:</p>
                        <p>{mockListing.detailedDescription}</p>
                    </div>
                </div>
            </div>

            {/* Pricing & Rental Terms Section */}
            <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
                <h3 className='text-xl  text-gray-900 mb-4'>Pricing & Rental Terms</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700'>
                    {Object.entries(mockListing.pricing).map(([key, value]) => (
                        <div key={key} className='flex justify-between items-center'>
                            <span className='capitalize '>{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <span>{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trailer Details Section */}
            <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
                <h3 className='text-xl  text-gray-900 mb-4'>Trailer Details</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700'>
                    {Object.entries(mockListing.details).map(([key, value]) => (
                        <div key={key} className='flex justify-between items-center'>
                            <span className='capitalize '>{key.replace(/([A-Z])/g, ' $1')}:</span>
                            <span>{value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Final Setup Section */}
            <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
                <h3 className='text-xl  text-gray-900 mb-4'>Final Setup</h3>
                <div className='flex justify-between items-center text-gray-700'>
                    <span className=''>Trailer Value:</span>
                    <span>{mockListing.finalSetup.trailerValue}</span>
                </div>
            </div>

            {/* Action Buttons at the bottom */}
            <div className='  bottom-0 left-0 right-0 bg-white p-4 sm:p-6 shadow-lg flex justify-end items-center space-x-4 border-t border-gray-200'>
                <span className='text-gray-700 text-sm '>Chat with owner</span>
                <button className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 text-sm '>
                    Reject
                </button>
                <button className='px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 text-sm '>
                    Report
                </button>
            </div>
        </div>
    );
};

export default AdminListingDetailPage;
