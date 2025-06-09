import React, { useState } from 'react';
import { CiFileOn } from "react-icons/ci";
import { mockBallSizes, mockFAQs, mockHitchTypes, mockOwnerCategories, mockPopularLocations, mockSecurityDeposits, mockTrailerCategories, mockTrailerTitleStatus, mockTrustedByImages } from '../../../constants/listing';


const AdminSettingsPage = () => {
    const [faqTab, setFaqTab] = useState('Guests');
    const [activeSetting, setActiveSetting] = useState('Trusted by section');


    const renderContent = () => {
        switch (activeSetting) {
            case 'Trusted by section':
                return (
                    <div>
                        <div className='flex justify-between items-center mb-6'>
                            <h2 className='text-2xl font-semibold text-gray-800'>Trusted by section</h2>
                            <button className='px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 text-sm font-medium'>
                                create new settings
                            </button>
                        </div>
                        <div className='space-y-4'>
                            {mockTrustedByImages.map((item) => (
                                <div key={item.id} className='flex items-center justify-between p-4 border border-gray-200 rounded-md bg-white'>
                                    <div className='flex items-center space-x-4'>
                                        <img src={item.imageUrl} alt="Logo" className='w-16 h-16 rounded-md object-cover' />
                                        <span className='text-gray-800 font-medium'>Image: {item.name}</span>
                                    </div>
                                    <div className='flex space-x-3'>
                                        <button className='text-blue-600 hover:text-blue-800 text-sm font-medium'>Edit</button>
                                        <button className='text-red-600 hover:text-red-800 text-sm font-medium'>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Popular location section':
                return (
                    <div>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Popular location</h2>
                            <p className='text-blue-600 cursor-pointer hover:underline'>Add new</p>
                        </div>

                        <div className='flex justify-start items-start flex-wrap -mx-2'> {/* Added -mx-2 for negative margin */}
                            {
                                mockPopularLocations.map((item) => (
                                    <div key={item.id} className='w-1/2 sm:w-1/3 lg:w-1/4 p-2 my-3'> {/* Added p-2 for padding */}
                                        <img className='w-full h-[267px] rounded-md object-cover' src={item.imageUrl} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/223x267/CCCCCC/666666?text=Image+Unavailable"; }} />
                                        <p className='mt-3 text-gray-800 font-medium'>{item.name}</p>
                                        <div className='flex space-x-3'>
                                            <button className='text-blue-600 hover:text-blue-800 text-sm font-medium'>Edit</button>
                                            <button className='text-red-600 hover:text-red-800 text-sm font-medium'>Delete</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                );
            case 'Trailers by category section':
                return (
                    <div>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Trailers by category</h2>
                            <p className='text-blue-600 cursor-pointer hover:underline'>Add new</p>
                        </div>

                        <div className='flex justify-start items-start flex-wrap -mx-2'> {/* Added -mx-2 for negative margin */}
                            {
                                mockTrailerCategories.map((item) => (
                                    <div key={item.id} className='w-1/2 sm:w-1/3 lg:w-1/4 p-2 my-3'> {/* Added p-2 for padding */}
                                        <img className='w-full h-[267px] rounded-md object-cover' src={item.imageUrl} alt={item.name} onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/223x267/CCCCCC/666666?text=Image+Unavailable"; }} />
                                        <p className='mt-3 text-gray-800 font-medium'>{item.name}</p>
                                        <div className='flex space-x-3'>
                                            <button className='text-blue-600 hover:text-blue-800 text-sm font-medium'>Edit</button>
                                            <button className='text-red-600 hover:text-red-800 text-sm font-medium'>Delete</button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                );
            case 'FAQ':
                return (
                    <div>
                        <div className='flex justify-between items-center mb-6'>
                            <h2 className='text-2xl font-semibold text-gray-800'>Frequently asked questions</h2>
                            <p className='text-blue-600 cursor-pointer hover:underline'>Add new</p>
                        </div>

                        {/* FAQ Tabs */}
                        <div className='flex mb-6 border-b border-gray-200'>
                            <button
                                onClick={() => setFaqTab('Guests')}
                                className={`py-2 px-4 text-md font-medium rounded-t-lg
                  ${faqTab === 'Guests' ? 'bg-gray-100 text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}
                `}
                            >
                                Guests
                            </button>
                            <button
                                onClick={() => setFaqTab('Hosts')}
                                className={`py-2 px-4 text-md font-medium rounded-t-lg
                  ${faqTab === 'Hosts' ? 'bg-gray-100 text-gray-900 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}
                `}
                            >
                                Hosts
                            </button>
                        </div>

                        {/* FAQ List based on active FAQ tab */}
                        <div className='space-y-6'>
                            {mockFAQs[faqTab].map((faq) => (
                                <div key={faq.id} className='p-4 border border-gray-200 rounded-lg bg-white shadow-sm'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <h3 className='text-lg font-semibold text-gray-900'>{faq.question}</h3>
                                        <div className='flex space-x-3 text-sm'>
                                            <button className='text-blue-600 hover:text-blue-800 font-medium'>Edit</button>
                                            <button className='text-red-600 hover:text-red-800 font-medium'>Delete</button>
                                        </div>
                                    </div>
                                    <p className='text-gray-700 text-sm'>{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Security Deposit':
                return (
                    <div>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Security Deposit</h2>
                        <div className='space-y-4'>
                            {mockSecurityDeposits.map((item) => (
                                <div key={item.id} className='flex items-center justify-between p-4 border border-gray-200 rounded-md bg-white'>
                                    <div>
                                        <p className='text-gray-800 font-medium'>{item.type}</p>
                                        <p className='text-gray-700'>{item.amount}</p>
                                    </div>
                                    <div className='flex space-x-3 text-sm'>
                                        <button className='text-blue-600 hover:text-blue-800 font-medium'>Edit</button>
                                        <button className='text-red-600 hover:text-red-800 font-medium'>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Category':
                return (
                    <div>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Categories</h2>
                        <div className='space-y-4'>
                            {mockOwnerCategories.map((item) => (
                                <div key={item.id} className='flex items-center justify-between p-4 border border-gray-200 rounded-md bg-white'>
                                    <p className='text-gray-800 font-medium'>{item.name}</p>
                                    <div className='flex space-x-3 text-sm'>
                                        <button className='text-blue-600 hover:text-blue-800 font-medium'>Edit</button>
                                        <button className='text-red-600 hover:text-red-800 font-medium'>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Trailer title status':
                return (
                    <div>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Trailer title status</h2>
                        <div className='space-y-4'>
                            {mockTrailerTitleStatus.map((item) => (
                                <div key={item.id} className='flex items-center justify-between p-4 border border-gray-200 rounded-md bg-white'>
                                    <p className='text-gray-800 font-medium'>{item.name}</p>
                                    <div className='flex space-x-3 text-sm'>
                                        <button className='text-blue-600 hover:text-blue-800 font-medium'>Edit</button>
                                        <button className='text-red-600 hover:text-red-800 font-medium'>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Hitch type':
                return (
                    <div>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Hitch type</h2>
                        <div className='space-y-4'>
                            {mockHitchTypes.map((item) => (
                                <div key={item.id} className='flex items-center justify-between p-4 border border-gray-200 rounded-md bg-white'>
                                    <p className='text-gray-800 font-medium'>{item.name}</p>
                                    <div className='flex space-x-3 text-sm'>
                                        <button className='text-blue-600 hover:text-blue-800 font-medium'>Edit</button>
                                        <button className='text-red-600 hover:text-red-800 font-medium'>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'Ball size':
                return (
                    <div>
                        <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Ball size</h2>
                        <div className='space-y-4'>
                            {mockBallSizes.map((item) => (
                                <div key={item.id} className='flex items-center justify-between p-4 border border-gray-200 rounded-md bg-white'>
                                    <p className='text-gray-800 font-medium'>{item.size}</p>
                                    <div className='flex space-x-3 text-sm'>
                                        <button className='text-blue-600 hover:text-blue-800 font-medium'>Edit</button>
                                        <button className='text-red-600 hover:text-red-800 font-medium'>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return (
                    <div>
                        <p className='text-gray-600'>Select a setting from the left sidebar to view its details.</p>
                    </div>
                );
        }
    };
    return (
        <div className='min-h-screen bg-[#fff] flex p-4 rounded-lg'>
            {/* Left Sidebar */}
            <div className='w-full md:w-1/4 p-6 mr-6 border rounded-md'>
                <h1 className='text-xl -bold text-gray-900 mb-6'>Platform setting</h1>

                {/* Website settings */}
                <h3 className='text-lg -semibold text-gray-800 mb-3'>Website settings</h3>
                <nav className='space-y-2 mb-6'>
                    {['Trusted by section', 'Popular location section', 'Trailers by category section', 'FAQ'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveSetting(item)}
                            className={`w-full text-left px-4 py-2 rounded-md text-sm -medium
                ${activeSetting === item ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}
              `}
                        >
                            {item}
                        </button>
                    ))}
                </nav>

                {/* Owner settings */}
                <h3 className='text-lg -semibold text-gray-800 mb-3'>Owner settings</h3>
                <nav className='space-y-2'>
                    {['Security Deposit', 'Category', 'Trailer title status', 'Hitch type', 'Ball size'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveSetting(item)}
                            className={`w-full text-left px-4 py-2 rounded-md text-sm -medium
                ${activeSetting === item ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}
              `}
                        >
                            {item}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Right Content Area */}
            <div className='flex-1 p-6 overflow-y-auto border rounded-md'>
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminSettingsPage;
