import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../../config';
import toast from 'react-hot-toast';

const AdminBookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchBookings = async () => {
        try {
            const res = await axios.get(`${config.baseUrl}/booking/all`);
            setBookings(res.data.data);
        } catch (err) {
            toast.error('Failed to fetch bookings');
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`${config.baseUrl}/booking/status/${id}`, { status });
            toast.success(`Status updated to ${status}`);
            fetchBookings();
        } catch (err) {
            toast.error('Failed to update status');
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const indexOfLastBooking = currentPage * itemsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);
    const totalPages = Math.ceil(bookings.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='min-h-screen bg-[#fff] p-3 rounded-md'>
            <h1 className='text-3xl text-gray-900 mb-6'>All Bookings</h1>

            <div className='bg-white rounded-lg shadow-md overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='p-4 text-left text-xs text-gray-500 uppercase tracking-wider'>
                                <input type='checkbox' className='h-4 w-4 text-blue-600 border-gray-300 rounded' />
                            </th>
                            <th className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'>SIN</th>
                            <th className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'>Booking ID</th>
                            <th className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'>Name of Trailer</th>
                            <th className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'>Renter</th>
                            <th className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'>Start / End Date</th>
                            <th className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'>Amount</th>
                            <th className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'>Status</th>
                            <th className='px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {currentBookings.map((booking, index) => (
                            <tr key={booking._id}>
                                <td className='p-4 whitespace-nowrap'>
                                    <input type='checkbox' className='h-4 w-4 text-blue-600 border-gray-300 rounded' />
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{indexOfFirstBooking + index + 1}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{booking._id.slice(-6).toUpperCase()}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{booking?.trailerId?.title || 'N/A'}</td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-blue-600'>
                                    {booking.firstname} {booking.lastname}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                    {
                                        booking?.startDate ?
                                            new Date(booking.startDate).toLocaleDateString() +" - " +new Date(booking.endDate).toLocaleDateString() :
                                            "N/A"
                                    }



                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{booking?.price || 'N/A'}</td>

                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <select value={booking.status || 'Pending'} onChange={(e) => updateStatus(booking._id, e.target.value)} className={`px-2 py-1 text-sm rounded-md border ${booking.status === 'Completed' ? 'bg-green-100 text-green-800' : ''} ${booking.status === 'Active' ? 'bg-blue-100 text-blue-800' : ''} ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''} `}>
                                        <option value='Pending'>Pending</option>
                                        <option value='Active'>Active</option>
                                        <option value='Completed'>Completed</option>
                                    </select>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-right text-sm '>
                                    <button className='text-gray-500 hover:text-gray-700'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className='mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0'>
                <p className='text-sm text-gray-700'>Page {currentPage} of {totalPages}</p>
                <div className='flex items-center space-x-2'>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded-md text-sm 
                ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminBookingPage;
