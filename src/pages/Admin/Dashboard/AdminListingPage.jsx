import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import toast from 'react-hot-toast';

const AdminListingPage = () => {
  const [filter, setFilter] = useState('All');
  const [trailers, setTrailers] = useState([]);

  const fetchTrailers = async () => {
    try {
      const res = await axios.get(`${config.baseUrl}/trailer/all`);
      setTrailers(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load trailers");
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${config.baseUrl}/trailer/status/${id}`, { status });
      toast.success("Status updated");
      fetchTrailers();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchTrailers();
  }, []);

  const filteredListings = filter === 'All'
    ? trailers
    : trailers.filter(listing => listing.status === filter);

  return (
    <div className='min-h-screen'>
      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl text-gray-900'>Recent listings</h3>
          <a href='#' className='text-blue-600 hover:text-blue-800 text-sm flex items-center'>
            View all
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className='flex space-x-2 mb-6 border-b border-gray-200'>
          {['All', 'Pending', 'Approved', 'Decline'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`py-2 px-4 text-sm ${filter === status ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className='space-y-6'>
          {filteredListings.map(listing => (
            <div key={listing._id} className='flex flex-col sm:flex-row items-start sm:items-center p-4 border border-gray-200 rounded-lg'>
              <img
                src={listing?.images?.[0] || "https://placehold.co/180x120/CCCCCC/666666?text=Image+Unavailable"}
                alt={listing.title}
                className='w-full sm:w-48 h-auto sm:h-32 rounded-md object-cover mb-4 sm:mb-0 sm:mr-6'
              />
              <div className='flex-1'>
                <h4 className='text-lg text-gray-900 mb-1'>{listing.title}</h4>
                <p className='text-sm text-gray-700 mb-1'>
                  <span>{listing?.userId?.name || 'Unknown User'}</span>
                </p>
                <p className='text-sm text-gray-500 mb-1'>{listing.city}, {listing.state}</p>
                <p className='text-sm text-gray-500 mb-3'>{listing?.userId?.phone || 'No phone'}</p>
                <span className={`px-3 py-1 rounded-full text-xs 
                  ${listing.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${listing.status === 'Approved' ? 'bg-green-100 text-green-800' : ''}
                  ${listing.status === 'Decline' ? 'bg-red-100 text-red-800' : ''}
                `}>
                  {listing.status}
                </span>
              </div>
              <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:ml-4">
                <Link
                  to={`/admin/dashboard/listing/${listing._id}`}
                  className='text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap'
                >
                  View details
                </Link>
                <div className='flex space-x-1'>
                  {['pending', 'approved', 'decline'].map(status => (
                    <button
                      key={status}
                      onClick={() => updateStatus(listing._id, status)}
                      className={`text-xs px-2 py-1 rounded-md border ${listing.status === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                        }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminListingPage;
