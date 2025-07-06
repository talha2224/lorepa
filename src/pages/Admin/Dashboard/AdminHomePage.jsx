import { useEffect, useState } from 'react';
import AddLocationModal from '../Models/AddLocationModal';
import axios from 'axios';
import config from '../../../config';

let cardStyle = "bg-white p-6 rounded-lg shadow-md flex items-center justify-between";

const AdminHomePage = () => {
  const [filter, setFilter] = useState('All');
  const [showLocation, setShowLocation] = useState(false);
  const [type, setType] = useState("");
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    pendingTrailers: 0,
    recentTrailers: []
  });

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(`${config.baseUrl}/dashboard/data`);
      if (res.data.success) {
        setDashboardData(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const filteredListings = filter === 'All'
    ? dashboardData.recentTrailers
    : dashboardData.recentTrailers.filter(listing => listing.status === filter);

  return (
    <div className='min-h-screen'>

      <header className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
        <h1 className='text-3xl text-gray-900 mb-4 sm:mb-0'>Welcome to your dashboard</h1>
        <div className='flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4'>
          <button onClick={() => { setType("Location"); setShowLocation(true); }} className='px-4 py-2 bg-white text-gray-700 rounded-md shadow-sm hover:bg-gray-50 text-sm'>Add location</button>
          <button onClick={() => { setType("Category"); setShowLocation(true); }} className='px-4 py-2 bg-white text-gray-700 rounded-md shadow-sm hover:bg-gray-50 text-sm'>Trailers by categories</button>
        </div>
      </header>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
        <div className={cardStyle}>
          <div>
            <p className='text-lg text-gray-500'>Total Revenue</p>
            <p className='text-2xl text-gray-900'>${dashboardData.totalRevenue} CAD</p>
          </div>
          <div className='bg-blue-100 p-2 rounded-md'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.592 1L21 6m-4 6h4m-4 6h4m-9-4h.01M12 18H5a2 2 0 01-2-2V8a2 2 0 012-2h14a2 2 0 012 2v2M5 14h.01" />
            </svg>
          </div>
        </div>
        <div className={cardStyle}>
          <div>
            <p className='text-lg text-gray-500'>Pending listing approval</p>
            <p className='text-2xl text-gray-900'>{dashboardData.pendingTrailers}</p>
          </div>
          <div className='bg-blue-100 p-2 rounded-md'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className={cardStyle}>
          <div>
            <p className='text-lg text-gray-500'>Total Bookings</p>
            <p className='text-2xl text-gray-900'>{dashboardData.totalBookings}</p>
          </div>
          <div className='bg-blue-100 p-2 rounded-md'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
        </div>
      </div>

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
          {['All', 'Pending', 'Decline', 'Approved'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`py-2 px-4 text-sm ${
                filter === status ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className='space-y-6'>
          {filteredListings.map(listing => (
            <div key={listing._id} className='flex flex-col sm:flex-row items-start sm:items-center p-4 border border-gray-200 rounded-lg'>
              <img
                src={listing.images[0] || "https://placehold.co/180x120/CCCCCC/666666?text=No+Image"}
                alt={listing.title}
                className='w-full sm:w-48 h-auto sm:h-32 rounded-md object-cover mb-4 sm:mb-0 sm:mr-6'
              />
              <div className='flex-1'>
                <h4 className='text-lg text-gray-900 mb-1'>{listing.title}</h4>
                <p className='text-sm text-gray-700 mb-1'>Category: {listing.category}</p>
                <p className='text-sm text-gray-500 mb-1'>Location: {listing.location}</p>
                <p className='text-sm text-gray-500 mb-3'>Price: ${listing.dailyRate}</p>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  listing.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  listing.status === 'Approved' ? 'bg-green-100 text-green-800' :
                  listing.status === 'Decline' ? 'bg-red-100 text-red-800' :
                  listing.status === 'Completed' ? 'bg-blue-100 text-blue-800' : ''
                }`}>
                  {listing.status}
                </span>
              </div>
              <a href='#' className='mt-4 sm:mt-0 text-blue-600 hover:text-blue-800 text-sm whitespace-nowrap'>
                View details
              </a>
            </div>
          ))}
        </div>
      </div>

      {showLocation && (
        <AddLocationModal
          type={type}
          onClose={() => setShowLocation(false)}
          onSave={() => setShowLocation(false)}
        />
      )}
    </div>
  );
};

export default AdminHomePage;
