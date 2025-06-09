import { useState } from 'react';
import { initialListings } from '../../../constants/listing';
import { Link } from 'react-router-dom';

const AdminListingPage = () => {
    const [filter, setFilter] = useState('All');
    const filteredListings = filter === 'All' ? initialListings : initialListings.filter(listing => listing.status === filter);

    return (
        <div className='min-h-screen'>


            <div className='bg-white p-6 rounded-lg shadow-md'>
                <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-xl  text-gray-900'>Recent listings</h3>
                    <a href='#' className='text-blue-600 hover:text-blue-800 text-sm  flex items-center'>
                        View all
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                <div className='flex space-x-2 mb-6 border-b border-gray-200'>
                    {['All', 'Pending', 'Active', 'Completed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`py-2 px-4 text-sm  ${filter === status ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>

                <div className='space-y-6'>
                    {filteredListings.map(listing => (
                        <div key={listing.id} className='flex flex-col sm:flex-row items-start sm:items-center p-4 border border-gray-200 rounded-lg'>
                            <img src={listing.image} alt={listing.title} className='w-full sm:w-48 h-auto sm:h-32 rounded-md object-cover mb-4 sm:mb-0 sm:mr-6' onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/180x120/CCCCCC/666666?text=Image+Unavailable"; }}/>
                            <div className='flex-1'>
                                <h4 className='text-lg  text-gray-900 mb-1'>{listing.title}</h4>
                                <p className='text-sm text-gray-700 mb-1'>
                                    <span className=''>John Doe</span>
                                </p>
                                <p className='text-sm text-gray-500 mb-1'>{listing.location}</p>
                                <p className='text-sm text-gray-500 mb-3'>{listing.phone}</p>
                                <span className={`px-3 py-1 rounded-full text-xs 
                  ${listing.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${listing.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                  ${listing.status === 'Completed' ? 'bg-blue-100 text-blue-800' : ''}
                `}>
                                    {listing.status}
                                </span>
                            </div>
                            <Link to={`/admin/dashboard/listing/${listing.id}`} className='mt-4 sm:mt-0 text-blue-600 hover:text-blue-800 text-sm  whitespace-nowrap'>View details</Link>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default AdminListingPage;
