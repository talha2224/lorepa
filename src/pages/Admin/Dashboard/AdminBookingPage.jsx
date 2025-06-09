import React, { useState } from 'react';

// Mock data for bookings
const mockBookings = [
    {
        sin: 1,
        bookingId: '000001',
        nameOfTrailer: "2017 Diamond C Utility 77'' x14'",
        renter: "Waters Wilfred",
        startDate: "20-May-2025",
        endDate: "5-June-2025",
        status: "Completed",
    },
    {
        sin: 2,
        bookingId: '000002',
        nameOfTrailer: "2017 Diamond C Utility 77'' x14'",
        renter: "Albert Flores",
        startDate: "20-May-2025",
        endDate: "5-June-2025",
        status: "Active",
    },
    {
        sin: 3,
        bookingId: '000003',
        nameOfTrailer: "2017 Diamond C Utility 77'' x14'",
        renter: "Brooklyn Simmons",
        startDate: "20-May-2025",
        endDate: "5-June-2025",
        status: "Pending",
    },
    {
        sin: 4,
        bookingId: '000004',
        nameOfTrailer: "2017 Diamond C Utility 77'' x14'",
        renter: "Jenny Wilson",
        startDate: "20-May-2025",
        endDate: "5-June-2025",
        status: "Completed",
    },
    {
        sin: 5,
        bookingId: '000005',
        nameOfTrailer: "2017 Diamond C Utility 77'' x14'",
        renter: "Leslie Alexander",
        startDate: "20-May-2025",
        endDate: "5-June-2025",
        status: "Completed",
    },
    {
        sin: 6,
        bookingId: '000006',
        nameOfTrailer: "2017 Diamond C Utility 77'' x14'",
        renter: "Jacob Jones",
        startDate: "20-May-2025",
        endDate: "5-June-2025",
        status: "Completed",
    },
    {
        sin: 7,
        bookingId: '000007',
        nameOfTrailer: "2017 Diamond C Utility 77'' x14'",
        renter: "Ronald Richards",
        startDate: "20-May-2025",
        endDate: "5-June-2025",
        status: "Active",
    },
    {
        sin: 8,
        bookingId: '000008',
        nameOfTrailer: "2017 Diamond C Utility 77'' x14'",
        renter: "Esther Howard",
        startDate: "20-May-2025",
        endDate: "5-June-2025",
        status: "Pending",
    },
    {
        sin: 9,
        bookingId: '000009',
        nameOfTrailer: "2017 Diamond C Utility 77'' x14'",
        renter: "Savannah Nguyen",
        startDate: "20-May-2025",
        endDate: "5-June-2025",
        status: "Pending",
    },
    {
        sin: 10,
        bookingId: '000010',
        nameOfTrailer: "2017 Diamond C Utility 77'' x14'",
        renter: "Floyd Miles",
        startDate: "20-May-2025",
        endDate: "5-June-2025",
        status: "Active",
    },
    {
        sin: 11,
        bookingId: '000011',
        nameOfTrailer: "2017 Diamond C Utility 77'' x14'",
        renter: "Wade Warren",
        startDate: "20-May-2025",
        endDate: "5-June-2025",
        status: "Completed",
    },
    {
        sin: 12,
        bookingId: '000012',
        nameOfTrailer: "2017 Diamond C Utility 77'' x14'",
        renter: "Darrell Steward",
        startDate: "20-May-2025",
        endDate: "5-June-2025",
        status: "Completed",
    },
    {
        sin: 13,
        bookingId: '000013',
        nameOfTrailer: "2017 Diamond C Utility 77'' x14'",
        renter: "Ralph Edwards",
        startDate: "20-May-2025",
        endDate: "5-June-2025",
        status: "Completed",
    },
];

const AdminBookingPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Number of items per page

    // Calculate the bookings to display on the current page
    const indexOfLastBooking = currentPage * itemsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
    const currentBookings = mockBookings.slice(indexOfFirstBooking, indexOfLastBooking);

    // Calculate total pages
    const totalPages = Math.ceil(mockBookings.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='min-h-screen bg-[#fff] p-3 rounded-md'>
            {/* Page Title */}
            <h1 className='text-3xl  text-gray-900 mb-6'>All Bookings</h1>

            {/* Bookings Table */}
            <div className='bg-white rounded-lg shadow-md overflow-x-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th scope='col' className='p-4 text-left text-xs  text-gray-500 uppercase tracking-wider'>
                                <input type='checkbox' className='h-4 w-4 text-blue-600 border-gray-300 rounded' />
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider'>
                                SIN
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider'>
                                Booking ID
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider'>
                                Name of Trailer
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider'>
                                Renter
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider'>
                                Start / End Date
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider'>
                                Status
                            </th>
                            <th scope='col' className='px-6 py-3 text-left text-xs  text-gray-500 uppercase tracking-wider'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {currentBookings.map((booking) => (
                            <tr key={booking.sin}>
                                <td className='p-4 whitespace-nowrap'>
                                    <input type='checkbox' className='h-4 w-4 text-blue-600 border-gray-300 rounded' />
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                    {booking.sin}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                    {booking.bookingId}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                    {booking.nameOfTrailer}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline'>
                                    {booking.renter}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                    {booking.startDate} - {booking.endDate}
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap'>
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 rounded-full
                    ${booking.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                    ${booking.status === 'Active' ? 'bg-blue-100 text-blue-800' : ''}
                    ${booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                  `}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap text-right text-sm '>
                                    <button className='text-gray-500 hover:text-gray-700 focus:outline-none'>
                                        {/* Eye icon for actions */}
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
                    {/* Pagination numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-1 rounded-md text-sm 
                ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}
              `}
                        >
                            {page}
                        </button>
                    ))}

                    {/* Go to page dropdown (simplified) */}
                    <div className='relative'>
                        <select className='block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-1 px-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm'>
                            <option value=''>Go to page</option>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <option key={page} value={page}>
                                    {page}
                                </option>
                            ))}
                        </select>
                        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                            <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.096 6.923 4.682 8.337l4.611 4.611z' />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBookingPage;
