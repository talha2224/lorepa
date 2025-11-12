import React, { useState } from 'react';
import { FaUser, FaStar, FaEnvelope, FaMobileAlt, FaCheckCircle, FaDownload, FaTimes, FaUserCircle } from 'react-icons/fa';
import { IoWalletOutline } from 'react-icons/io5';
import { MdOutlineDocumentScanner } from 'react-icons/md';
import trailer from '../../../assets/trailer.png';
import trailer2 from '../../../assets/trailer2.png';
import trailer3 from '../../../assets/trailer.png';


const mockReservations = [
    { id: 1, title: "Diamond C Utility 77\" x 14'", user: "James R.", location: "Saskatoon, Saskatchewan", dates: "Dec 15 – 20, 2025", status: "Confirmed", image: trailer, type: 'Upcoming', renterDetails: { name: "Alice Johnson", memberSince: "2023", rating: 4.5, reliability: 4.5, email: true, license: true, phone: true } },
    { id: 2, title: "16' Enclosed Moving Trailer", user: "Mike J.", location: "Saskatoon, Saskatchewan", dates: "Oct 10 – 12, 2024", status: "Completed", image: trailer2, type: 'Past', renterDetails: { name: "Mike Johnson", memberSince: "2022", rating: 4.8, reliability: 4.9, email: true, license: true, phone: true } },
    { id: 3, title: "Diamond C Utility 77\" x 14'", user: "James R.", location: "Saskatoon, Saskatchewan", dates: "Sep 5 – 7, 2024", status: "Cancelled", image: trailer3, type: 'Past', renterDetails: { name: "Sarah Connor", memberSince: "2024", rating: 3.9, reliability: 4.0, email: true, license: false, phone: true } },
    { id: 4, title: "Heavy Duty Flatbed", user: "Sarah K.", location: "Regina, Saskatchewan", dates: "Jan 25 – 30, 2026", status: "Pending", image: trailer, type: 'Upcoming', renterDetails: { name: "Tom Holland", memberSince: "2025", rating: 4.2, reliability: 4.3, email: true, license: true, phone: false } },
];

const STATUS_STYLES = {
    Confirmed: 'text-green-700 bg-green-100',
    Completed: 'text-gray-700 bg-gray-200',
    Cancelled: 'text-red-700 bg-red-100',
    Pending: 'text-yellow-700 bg-yellow-100',
}

const TABS = ['All', 'Upcoming', 'Past', 'Cancel']

const StatusBadge = ({ status }) => (
    <span className={`text-xs font-medium px-2 py-1 rounded-md w-fit ${STATUS_STYLES[status] || 'text-gray-700 bg-gray-100'}`}>
        {status}
    </span>
)

// Helper component for Booking Details Drawer
const BookingDetailsDrawer = ({ reservation, onClose }) => {
    if (!reservation) return null;

    const { title, image, status, renterDetails } = reservation;

    // Mock Booking Summary Data (Fixed to match image for the first reservation)
    const bookingSummary = {
        dates: "2025-12-01 - 2025-12-04",
        rentalFee: 500.00,
        securityDeposit: 200.00,
        insurance: 35.00,
        taxesAndFees: 20.00,
        totalPaid: 555.00, // (500 + 35 + 20)
        paymentStatus: "Paid",
    };

    const VerificationIcon = ({ isVerified, icon: Icon }) => (
        <span title={isVerified ? "Verified" : "Not Verified"} className={`p-1 rounded-full ${isVerified ? 'text-green-500 bg-green-100' : 'text-gray-400 bg-gray-100'}`}>
            <Icon className="w-3 h-3" />
        </span>
    );

    const checkInPhotos = ['1', '2', '3'];
    const checkOutPhotos = ['A', 'B', 'C'];

    return (
        <div className="fixed inset-0 z-40 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                {/* Backdrop */}
                <div className="absolute inset-0 bg-gray-600 bg-opacity-50 transition-opacity" onClick={onClose}></div>

                {/* Drawer */}
                <section className="absolute inset-y-0 right-0 max-w-full flex">
                    <div className="w-screen max-w-md">
                        <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                            {/* Header */}
                            <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                                <h2 className="text-xl font-bold text-gray-900">Booking Details</h2>
                                <button
                                    type="button"
                                    className="text-gray-400 hover:text-gray-500"
                                    onClick={onClose}
                                >
                                    <FaTimes className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-4 sm:p-6 space-y-6">
                                {/* Trailer Image and Status */}
                                <div className="space-y-4">
                                    <img
                                        src={image}
                                        alt={title}
                                        className="w-full h-40 object-cover rounded-lg"
                                        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x160/1E3A8A/FFFFFF?text=TRAILER"; }}
                                    />
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-bold text-gray-900">{title}</p>
                                        <StatusBadge status={status} />
                                    </div>
                                </div>

                                {/* Renter Details */}
                                <div className="border p-4 rounded-lg space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <FaUserCircle className="w-10 h-10 text-blue-600" />
                                        <div>
                                            <p className="font-semibold text-gray-800">{renterDetails.name}</p>
                                            <p className="text-xs text-gray-500">Member since {renterDetails.memberSince}</p>
                                        </div>
                                        <div className="flex items-center text-sm ml-auto font-medium text-yellow-500">
                                            {renterDetails.rating}/5 <FaStar className="w-3 h-3 ml-1" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-600">
                                        <div className="flex items-center space-x-1">
                                            <FaStar className="w-3 h-3 text-yellow-500" />
                                            <span>Reliability Score: {renterDetails.reliability}/5</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <VerificationIcon isVerified={renterDetails.email} icon={FaEnvelope} />
                                            <VerificationIcon isVerified={renterDetails.license} icon={MdOutlineDocumentScanner} />
                                            <VerificationIcon isVerified={renterDetails.phone} icon={FaMobileAlt} />
                                        </div>
                                    </div>
                                </div>

                                {/* Booking & Payment Summary */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Booking & Payment Summary</h3>
                                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm text-gray-700">
                                        <div className="flex justify-between border-b pb-1">
                                            <span className="font-medium">Booking Dates</span>
                                            <span className="text-blue-600 font-medium">{bookingSummary.dates}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Rental Fee</span>
                                            <span>${bookingSummary.rentalFee.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Security Deposit</span>
                                            <span>${bookingSummary.securityDeposit.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Insurance (Mandatory)</span>
                                            <span>${bookingSummary.insurance.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-300 pb-2">
                                            <span>Taxes & Fees</span>
                                            <span>${bookingSummary.taxesAndFees.toFixed(2)}</span>
                                        </div>
                                        <div className="pt-2 flex justify-between font-bold text-lg text-gray-900">
                                            <span>Total Paid</span>
                                            <span className="text-blue-600">${bookingSummary.totalPaid.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-end text-xs">
                                            <span className="text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-medium">{bookingSummary.paymentStatus}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Documents & Reports (Mock) */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Documents & Reports (Mock)</h3>
                                    <button className="w-full flex items-center justify-center p-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                                        <FaDownload className="w-4 h-4 mr-2" /> Rental Contract (PDF)
                                    </button>
                                </div>

                                {/* Check-in Photos */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Check-in Photos</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {checkInPhotos.map((label) => (
                                            <div key={label} className="bg-gray-200 h-16 rounded-lg flex items-center justify-center text-gray-700 font-semibold shadow-inner">
                                                {label}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Check-out Photos */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Check-out Photos</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {checkOutPhotos.map((label) => (
                                            <div key={label} className="bg-gray-200 h-16 rounded-lg flex items-center justify-center text-gray-700 font-semibold shadow-inner">
                                                {label}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Message Renter */}
                                <div className="pt-2">
                                    <button className="w-full p-3 border border-blue-600 rounded-lg text-blue-600 font-medium hover:bg-blue-50 transition">
                                        Message Renter
                                    </button>
                                </div>

                            </div>
                            {/* End Content */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};


// Updated Reservation Item to trigger the drawer
const ReservationItem = ({ reservation, onSelectReservation }) => (
    <div className="py-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition duration-150 rounded-lg p-2 -mx-2">
        <div className="flex items-start space-x-4">
            <img
                src={reservation.image}
                alt={reservation.title}
                className="w-32 h-20 sm:w-40 sm:h-24 object-cover rounded-lg flex-shrink-0"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/160x96/A3A3A3/FFFFFF?text=TRAILER"; }}
            />
            <div className="flex-1">
                <p className="font-bold text-gray-900 text-lg leading-tight mb-1">{reservation.title}</p>
                <div className="flex items-center text-sm text-gray-600 mb-1">
                    <FaUser className="w-3.5 h-3.5 mr-1 text-red-600" />
                    <span className="font-medium">{reservation.user}</span>
                </div>
                <p className="text-sm text-gray-500 mb-1">{reservation.location}</p>
                <p className="text-sm text-gray-700 font-medium mb-2">{reservation.dates}</p>
                <div className="flex justify-between flex-wrap items-center mt-3">
                    <StatusBadge status={reservation.status} />
                    <div className="flex items-center justify-center gap-x-2 mt-2 sm:mt-0">
                        {/* Buttons to open the drawer */}
                        <button
                            onClick={() => onSelectReservation(reservation)}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition duration-150 cursor-pointer"
                        >
                            View details
                        </button>

                        {reservation.status === 'Pending' && (
                            <>
                                <button
                                    onClick={() => onSelectReservation(reservation)}
                                    className="bg-blue-600 border text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition duration-150"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => onSelectReservation(reservation)}
                                    className="bg-blue-50 border border-blue-600 text-blue-600 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-150 shadow-sm"
                                >
                                    Decline
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
)


const BuyerReservation = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [selectedReservation, setSelectedReservation] = useState(null); // State to hold the selected reservation data

    const filteredReservations = mockReservations.filter(res => {
        if (activeTab === 'All') return true;
        if (activeTab === 'Cancel') return res.status === 'Cancelled';
        return res.type === activeTab;
    });

    return (
        <div className="">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Reservations</h1>
            <div className="bg-white rounded-xl shadow-lg">
                <div className="p-5">
                    <h2 className="text-xl font-semibold text-gray-800">All Reservations</h2>
                </div>
                <div className="flex border-b border-gray-200 px-5 overflow-x-auto">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-sm font-medium transition duration-150 ease-in-out ${activeTab === tab
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="p-5">
                    {filteredReservations.length ? (
                        filteredReservations.map(reservation => (
                            <ReservationItem
                                key={reservation.id}
                                reservation={reservation}
                                onSelectReservation={setSelectedReservation} // Pass the setter to the item
                            />
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No {activeTab.toLowerCase()} reservations found.
                        </div>
                    )}
                </div>
            </div>

            {/* Booking Details Drawer Component */}
            <BookingDetailsDrawer
                reservation={selectedReservation}
                onClose={() => setSelectedReservation(null)}
            />
        </div>
    );
}

export default BuyerReservation;