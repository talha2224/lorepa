import React, { useState } from 'react'
import trailer from '../../../assets/trailer.png'
import trailer2 from '../../../assets/trailer2.png'
import trailer3 from '../../../assets/trailer.png'
import { FaUser } from 'react-icons/fa'

const mockReservations = [
    { id: 1, title: "Diamond C Utility 77\" x 14'", user: "James R.", location: "Saskatoon, Saskatchewan", dates: "Dec 15 – 20, 2025", status: "Confirmed", image: trailer, type: 'Upcoming' },
    { id: 2, title: "16' Enclosed Moving Trailer", user: "Mike J.", location: "Saskatoon, Saskatchewan", dates: "Oct 10 – 12, 2024", status: "Completed", image: trailer2, type: 'Past' },
    { id: 3, title: "Diamond C Utility 77\" x 14'", user: "James R.", location: "Saskatoon, Saskatchewan", dates: "Sep 5 – 7, 2024", status: "Cancelled", image: trailer3, type: 'Past' },
    { id: 4, title: "Heavy Duty Flatbed", user: "Sarah K.", location: "Regina, Saskatchewan", dates: "Jan 25 – 30, 2026", status: "Pending", image: trailer, type: 'Upcoming' },
];

// Helper component for status tag styles
const getStatusClasses = (status) => {
    switch (status) {
        case 'Confirmed':
            return 'text-green-700 bg-green-100';
        case 'Completed':
            return 'text-gray-700 bg-gray-200';
        case 'Cancelled':
            return 'text-red-700 bg-red-100';
        case 'Pending':
            return 'text-yellow-700 bg-yellow-100';
        default:
            return 'text-gray-700 bg-gray-100';
    }
};

const TABS = ['All', 'Upcoming', 'Past', 'Cancel'];

// Reservation Item Component (Reusable)
const ReservationItem = ({ reservation }) => {
    return (
        <div className="py-4 border-b border-gray-200 last:border-b-0">

            {/* Left: Image and Details */}
            <div className="flex items-start space-x-4">
                <img
                    src={reservation.image}
                    alt={reservation.title}
                    className="w-32 h-20 sm:w-40 sm:h-24 object-cover rounded-lg flex-shrink-0"
                />

                <div className='flex-1'>
                    <p className="font-bold text-gray-900 text-lg leading-tight mb-1">{reservation.title}</p>

                    <div className="flex items-center text-sm text-gray-600 mb-1">
                        <FaUser className="w-3.5 h-3.5 mr-1 text-red-600" />
                        <span className="font-medium">{reservation.user}</span>
                    </div>

                    <p className="text-sm text-gray-500 mb-1">{reservation.location}</p>
                    <p className="text-sm text-gray-700 font-medium mb-2">{reservation.dates}</p>
                    <div className='flex justify-between items-center flex-1'>
                        <span className={`text-xs font-medium px-2 py-1 rounded-md w-fit ${getStatusClasses(reservation.status)}`}>
                            {reservation.status}
                        </span>

                        <div className="flex items-center justify-center gap-x-5">
                            <p className="text-sm font-medium transition duration-150">
                                View details
                            </p>
                            <button className="bg-blue-50 border border-blue-300 text-blue-600 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-150 shadow-sm">
                                Contact Owner
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};


const UserReservation = () => {
    const [activeTab, setActiveTab] = useState('All');

    const filteredReservations = mockReservations.filter(res => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Cancel') return res.status === 'Cancelled';
        return res.type === activeTab;
    });

    return (
        <div>

            {/* Header */}
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Reservations</h1>

            {/* All Reservations Container */}
            <div className="bg-white rounded-xl shadow-lg ">
                <div className="p-5">
                    <h2 className="text-xl font-semibold text-gray-800">All Reservations</h2>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 px-5 overflow-x-auto">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`
                px-4 py-3 text-sm font-medium transition duration-150 ease-in-out
                ${activeTab === tab
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                                }
              `}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Reservation List */}
                <div className="p-5">
                    {filteredReservations.length > 0 ? (
                        filteredReservations.map((reservation) => (
                            <ReservationItem key={reservation.id} reservation={reservation} />
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No {activeTab.toLowerCase()} reservations found.
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default UserReservation
