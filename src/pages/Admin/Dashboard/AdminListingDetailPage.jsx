import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../../config';
import toast from 'react-hot-toast';

const AdminListingDetailPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchTrailer = async () => {
    try {
      const res = await axios.get(`${config.baseUrl}/trailer/single/${id}`);
      setListing(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch trailer details");
    }
  };

  const updateStatus = async (status) => {
    try {
      await axios.put(`${config.baseUrl}/trailer/status/${id}`, { status });
      toast.success(`Status updated to ${status}`);
      fetchTrailer(); // Refresh data
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchTrailer();
  }, []);

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? listing.images.length - 1 : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === listing.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!listing) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className='min-h-screen'>
      {/* Header and Title */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-xl sm:text-2xl text-gray-900'>{listing.title}</h1>
        <div className='flex space-x-2'>
          <button
            onClick={() => updateStatus("Approved")}
            className='px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 text-sm'
          >
            Approve
          </button>
          <button
            onClick={() => updateStatus("Decline")}
            className='px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 text-sm'
          >
            Reject
          </button>
        </div>
      </div>

      {/* Image Viewer */}
      <div className='relative w-full h-64 sm:h-96 bg-gray-200 rounded-lg overflow-hidden mb-8'>
        <img
          src={listing.images[currentImageIndex]}
          alt={listing.title}
          className='w-full h-full object-cover'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/800x400/CCCCCC/666666?text=Image+Unavailable";
          }}
        />
        <button
          onClick={goToPreviousImage}
          className='absolute top-1/2 left-4 -translate-y-1/2 bg-blue-800 text-white min-w-8 min-h-8 rounded-full'
        >
          &lt;
        </button>
        <button
          onClick={goToNextImage}
          className='absolute top-1/2 right-4 -translate-y-1/2 bg-blue-800 text-white min-w-8 min-h-8 rounded-full'
        >
          &gt;
        </button>
      </div>

      {/* Basic Info */}
      <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
        <h3 className='text-xl text-gray-900 mb-4'>Basic Info</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700'>
          <p><span>Name of owner:</span> {listing?.userId?.name || "N/A"}</p>
          <div className='flex items-center justify-end'>
            {listing?.userId?.avatar && (
              <img src={listing.userId.avatar} className='w-10 h-10 rounded-full mr-2 object-cover' alt='avatar' />
            )}
            <span>{listing?.userId?.name || "N/A"}</span>
          </div>
          <p><span>Trailer ID:</span> {listing._id}</p>
          <p><span>Category:</span> {listing.category}</p>
          <p><span>Make:</span> {listing.make}</p>
          <p><span>Model:</span> {listing.model}</p>
          <div className='md:col-span-2'>
            <p className='mb-1'>Detailed description:</p>
            <p>{listing.description}</p>
          </div>
        </div>
      </div>

      {/* Pricing & Rental Terms */}
      <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
        <h3 className='text-xl text-gray-900 mb-4'>Pricing & Rental Terms</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700'>
          <p><span>Daily:</span> {listing.dailyRate} CAD</p>
          <p><span>Weekly:</span> {listing.weeklyRate} CAD</p>
          <p><span>Monthly:</span> {listing.monthlyRate} CAD</p>
          <p><span>Cleaning Fee:</span> {listing.cleaningRate} CAD</p>
          <p><span>Security Fee:</span> {listing.securityRate} CAD</p>
          <p><span>Insurance Deductible:</span> {listing.insuranceDeductible} CAD</p>
        </div>
      </div>

      {/* Trailer Details */}
      <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
        <h3 className='text-xl text-gray-900 mb-4'>Trailer Details</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700'>
          <p><span>Year:</span> {listing.year}</p>
          <p><span>Length:</span> {listing.length}</p>
          <p><span>Sleeps:</span> {listing.sleeps}</p>
          <p><span>City:</span> {listing.city}</p>
          <p><span>State:</span> {listing.state}</p>
          <p><span>Zip:</span> {listing.zip}</p>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className='bg-white p-4 sm:p-6 shadow-lg flex justify-end items-center space-x-4 border-t border-gray-200'>
        <span className='text-gray-700 text-sm'>Chat with owner</span>
        <button
          onClick={() => updateStatus("Decline")}
          className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm hover:bg-gray-50 text-sm'
        >
          Reject
        </button>
        <button className='px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 text-sm'>
          Report
        </button>
      </div>
    </div>
  );
};

export default AdminListingDetailPage;
