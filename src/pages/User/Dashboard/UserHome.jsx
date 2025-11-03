import React from 'react'
import { FaCalendarAlt, FaTruck, FaUserCircle } from 'react-icons/fa'
import { IoWalletOutline } from 'react-icons/io5'
import trailer from '../../../assets/trailer.png'
import trailer2 from '../../../assets/trailer2.png'

const mockReservations = [
  { id: 1, title: "2017 Diamond C Utility 77\" x 14'", user: "James R.", dates: "Jan 5 - Jan 10, 2025", ref: "0000000001", status: "Active", image: trailer, userIconColor: "text-red-600" },
  { id: 2, title: "18ft Aluminum Car Hauler", user: "John B.", dates: "Feb 1 - Feb 5, 2025", ref: "0000000002", status: "Completed", image: trailer2, userIconColor: "text-indigo-600" },
  { id: 3, title: "Heavy Duty Dump Trailer", user: "Sarah L.", dates: "Mar 10 - Mar 15, 2025", ref: "0000000003", status: "Completed", image: trailer, userIconColor: "text-green-600" },
  { id: 4, title: "Single Axle Enclosed", user: "Mike T.", dates: "Apr 20 - Apr 22, 2025", ref: "0000000004", status: "Upcoming", image: trailer2, userIconColor: "text-yellow-600" },
];

// Helper component for status tag styles
const getStatusClasses = (status) => {
  switch (status) {
    case 'Active':
      return 'text-blue-700 bg-blue-100';
    case 'Completed':
      return 'text-green-700 bg-green-100';
    case 'Upcoming':
      return 'text-yellow-700 bg-yellow-100';
    default:
      return 'text-gray-700 bg-gray-100';
  }
};

const UserHome = () => {
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

          <div className="flex items-center space-x-4 my-4">
            <img
              src={trailer}
              alt="16' Flatbed Utility"
              className="w-16 h-12 rounded-lg object-cover flex-shrink-0 border-2 border-indigo-300"
            />
            <div>
              <p className="font-bold text-gray-900">16' Flatbed Utility</p>
              <p className="text-sm text-[#757982] font-medium">Dec 15, 2025 - Dec 20, 2025</p>
            </div>
          </div>

          <span className="text-xs font-semibold text-green-700 bg-green-200 px-3 py-1 rounded-full w-fit mb-4">
            Completed
          </span>

          <button className="w-full bg-transparent border border-[#2563EB] text-[#2563EB] font-semibold py-2.5 rounded-lg transition duration-150 shadow-md hover:bg-indigo-100">
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
            <p className="text-6xl font-extrabold text-gray-900 leading-none">14</p>
            <p className="text-sm text-gray-500 mt-2">Lifetime completed bookings</p>
          </div>
        </div>

        {/* Card 3: Pending Payments */}
        <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-medium text-gray-700">Pending Payments</h2>
            <div className="p-2 bg-yellow-100 rounded-lg shadow-sm">
              <IoWalletOutline className="w-5 h-5 text-yellow-600" />
            </div>
          </div>

          <div className="text-left">
            <p className="text-6xl font-extrabold text-[#EA4335] leading-none">$299.00</p>
            <p className="text-sm text-gray-500 mt-2">Due in 5 days (Security Deposit)</p>
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
          {mockReservations.map((reservation) => (
            <div key={reservation.id} className="bg-[#F9FAFB] p-4 rounded-xl shadow-md border border-[#E4E7EC] flex items-start space-x-4">
              
              {/* Image */}
              <img
                src={reservation.image}
                alt={reservation.title}
                className="w-1/3 h-auto max-h-28 object-cover rounded-lg flex-shrink-0"
              />

              {/* Details */}
              <div className="flex flex-col justify-between h-full">
                <p className="font-bold text-gray-900 text-lg leading-tight mb-1">{reservation.title}</p>
                
                <div className="flex items-center text-sm text-gray-600 mb-1">
                  <FaUserCircle className={`w-4 h-4 mr-1 ${reservation.userIconColor}`} />
                  <span className="font-medium">{reservation.user}</span>
                </div>
                
                <p className="text-sm text-gray-500 mb-1">{reservation.dates}</p>
                <p className="text-xs text-gray-400 mb-2">{reservation.ref}</p>
                
                {/* Status and Action */}
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusClasses(reservation.status)}`}>{reservation.status}</span>
                  <p className="text-black">View details</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserHome
