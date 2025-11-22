import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import config from '../../../config'
import axios from 'axios'

const getStatusClasses = (status) => {
    switch (status) {
        case 'confirmed':
            return 'text-green-700 bg-green-100';
        case 'completed':
            return 'text-gray-700 bg-gray-200';
        case 'cancelled':
            return 'text-red-700 bg-red-100';
        case 'pending':
            return 'text-yellow-700 bg-yellow-100';
        default:
            return 'text-gray-700 bg-gray-100';
    }
};

const TABS = ['All', 'Upcoming', 'Past', 'Cancel'];

const ReservationItem = ({ reservation }) => {
    return (
        <div className="py-4 border-b border-gray-200 last:border-b-0">

            <div className="flex items-start space-x-4">
                <img
                    src={reservation.trailerId?.images[0]}
                    alt={reservation.trailerId?.title}
                    className="w-32 h-20 sm:w-40 sm:h-24 object-cover rounded-lg flex-shrink-0"
                />

                <div className='flex-1'>
                    <p className="font-bold text-gray-900 text-lg leading-tight mb-1">{reservation.trailerId?.title}</p>

                    <div className="flex items-center text-sm text-gray-600 mb-1">
                        <FaUser className="w-3.5 h-3.5 mr-1 text-red-600" />
                        <span className="font-medium">{reservation.owner_id?.name}</span>
                    </div>

                    <p className="text-sm text-gray-500 mb-1">{[reservation.trailerId?.country, reservation.trailerId?.city]?.filter(i => i !== null).join(", ")}</p>
                    <p className="text-sm text-gray-700 font-medium mb-2">{[reservation.startDate, reservation?.endDate]?.filter(i => i !== null).join(", ")}</p>
                    <div className='flex justify-between flex-wrap items-center flex-1'>
                        <span className={`text-xs font-medium px-2 py-1 rounded-md w-fit ${getStatusClasses(reservation.status)}`}>
                            {reservation.status}
                        </span>

                        <div className="block sm:flex items-center justify-center gap-x-5">
                            {/* <p className="sm:mt:0 t:3 text-sm font-medium transition duration-150">
                                View details
                            </p> */}
                            <button className="sm:mt:0 t:3 bg-blue-50 border border-blue-300 text-blue-600 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-150 shadow-sm">
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
    const [bookings, setBookings] = useState([]);

    const filteredReservations = bookings.filter((booking) => {
        const today = new Date();

        switch (activeTab) {
            case 'All':
                return true;
            case 'Upcoming':
                return new Date(booking.startDate) >= today && booking.status !== 'cancelled';
            case 'Past':
                return new Date(booking.endDate) < today || booking.status === 'completed';
            case 'Cancel':
                return booking.status === 'cancelled';
            default:
                return true;
        }
    });


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
