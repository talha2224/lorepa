import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaTruck, FaUserCircle } from 'react-icons/fa';
import { IoWalletOutline } from 'react-icons/io5';
import trailerPlaceholder from '../../../assets/trailer.png';
import axios from 'axios';
import config from '../../../config';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const getStatusClasses = (status) => {
  switch (status) {
    case 'Active':
      return 'text-blue-700 bg-blue-100';
    case 'Completed':
      return 'text-green-700 bg-green-100';
    case 'pending':
      return 'text-yellow-700 bg-yellow-100';
    default:
      return 'text-gray-700 bg-gray-100';
  }
};

const UserHome = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const result = await axios.get(`${config.baseUrl}/booking/buyer/${localStorage.getItem("userId")}`);
      setBookings(result.data.data);
    } catch (err) {
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Get latest booking based on createdAt
  const latestBooking = bookings
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  const nav = useNavigate()
  const createChat = async () => {
    try {
      const currentUserId = localStorage.getItem("userId");
      const otherUserId = latestBooking?.owner_id?._id;

      if (!currentUserId || !otherUserId) return;

      const response = await axios.post(`${config.baseUrl}/chat/create`, {
        participants: [currentUserId, otherUserId]
      });

      const chat = response.data.data;
      console.log("Chat created or existing chat returned:", chat);

      nav(`/user/dashboard/messaging`);
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };

  return (
    <div className='flex-1 h-[100%] overflow-y-auto'>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Welcome to your dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-3">

        {/* Card 1: Next Booking */}
        <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-xl shadow-md flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-medium text-gray-700">Next Booking</h2>
            <div className="p-2 bg-white rounded-full">
              <FaCalendarAlt className="text-[#2563EB]" />
            </div>
          </div>

          {latestBooking ? (
            <div className="flex items-center space-x-4 my-4">
              <img
                src={latestBooking.trailerId?.images[0] || trailerPlaceholder}
                alt={latestBooking.trailerId?.title}
                className="w-16 h-12 rounded-lg object-cover flex-shrink-0 border-2 border-indigo-300"
              />
              <div>
                <p className="font-bold text-gray-900">{latestBooking.trailerId?.title}</p>
                <p className="text-sm text-[#757982] font-medium">
                  {latestBooking.startDate} - {latestBooking.endDate}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No bookings yet</p>
          )}

          {latestBooking && (
            <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4 ${getStatusClasses(latestBooking.status)}`}>
              {latestBooking.status}
            </span>
          )}

          <button onClick={createChat} className="w-full bg-transparent border border-[#2563EB] text-[#2563EB] font-semibold py-2.5 rounded-lg transition duration-150 shadow-md hover:bg-indigo-100">
            Contact Owner
          </button>
        </div>

        {/* Card 2: Total Rentals */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-medium text-gray-700">Total Rentals</h2>
            <div className="p-2 bg-blue-100 rounded-lg shadow-sm">
              <FaTruck className="w-5 h-5 text-blue-600" />
            </div>
          </div>

          <div className="text-left">
            <p className="text-6xl font-extrabold text-gray-900 leading-none">{bookings?.length}</p>
            <p className="text-sm text-gray-500 mt-2">Lifetime completed bookings</p>
          </div>
        </div>

        {/* Card 3: Total Payments */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-medium text-gray-700">Total Payments</h2>
            <div className="p-2 bg-yellow-100 rounded-lg shadow-sm">
              <IoWalletOutline className="w-5 h-5 text-yellow-600" />
            </div>
          </div>

          <div className="text-left">
            <p className="text-6xl font-extrabold text-[#EA4335] leading-none">
              ${bookings.reduce((a, c) => a + c.price, 0)}
            </p>
          </div>
        </div>

      </div>

      {/* Recent Reservations Section */}
      <div className="mt-8 bg-white rounded-xl p-5 border border-[#E4E7EC]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Reservations</h2>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings
            .slice()
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((reservation) => (
              <div key={reservation._id} className="bg-[#F9FAFB] p-4 rounded-xl shadow-md border border-[#E4E7EC] flex items-start space-x-4">

                <img
                  src={reservation.trailerId?.images[0] || trailerPlaceholder}
                  alt={reservation.trailerId?.title}
                  className="w-1/3 h-auto max-h-28 object-cover rounded-lg flex-shrink-0"
                />

                <div className="flex flex-col justify-between h-full">
                  <p className="font-bold text-gray-900 text-lg leading-tight mb-1">{reservation.trailerId?.title}</p>

                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <FaUserCircle className="w-4 h-4 mr-1" />
                    <span className="font-medium">{reservation.owner_id?.name}</span>
                  </div>

                  <p className="text-sm text-gray-500 mb-1">
                    {[reservation.startDate, reservation?.endDate].filter(i => i !== null).join(" - ")}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">{reservation._id?.slice(0, 9)}</p>

                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusClasses(reservation.status)}`}>
                      {reservation.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
