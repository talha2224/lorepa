import React, { useState } from 'react'
// Importing icons from the react-icons package (Fa: Font Awesome, Io: Ionicons)
import { FaDollarSign, FaCalendarAlt, FaRedo, FaDownload } from 'react-icons/fa'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoFunnelOutline, IoShareOutline } from 'react-icons/io5'

// --- Mock Data ---
const mockTransactions = [
    { id: 1, date: 'Dec 10, 2025', name: 'Diamond C Utility 77"', amount: -320.00, status: 'Paid', receipt: true },
    { id: 2, date: 'Nov 22, 2025', name: 'Enclosed Cargo 6x12', amount: -400.00, status: 'Refunded', receipt: true },
    { id: 3, date: 'Oct 05, 2025', name: 'Flatbed 8x20', amount: 520.00, status: 'Paid', receipt: true },
    { id: 4, date: 'Aug 18, 2025', name: 'Big Tex Dump Trailer', amount: 450.00, status: 'Paid', receipt: true },
    { id: 5, date: 'Jul 01, 2025', name: '2017 Diamond C Utility 77" x14\'', amount: 650.00, status: 'Paid', receipt: true },
    { id: 6, date: 'Dec 10, 2025', name: 'Diamond C Utility 77"', amount: -320.00, status: 'Paid', receipt: true },
];

// Helper function for transaction status styling
const getStatusClasses = (status) => {
    switch (status) {
        case 'Paid':
            return 'text-green-700 bg-green-100';
        case 'Refunded':
            return 'text-red-700 bg-red-100';
        default:
            return 'text-gray-700 bg-gray-100';
    }
};

// Helper function for amount styling
const getAmountClasses = (amount) => {
    return amount < 0 ? 'text-red-500 font-semibold' : 'text-green-600 font-semibold';
};


const UserPayment = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 12;

    const renderPagination = () => {
        const pages = [];
        const maxPagesToShow = 5;

        // Always show page 1
        pages.push(1);

        // Add ellipses or middle pages
        if (totalPages > maxPagesToShow) {
            if (currentPage > maxPagesToShow - 2) {
                pages.push('...');
            }

            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= maxPagesToShow - 2) {
                end = maxPagesToShow - 1;
                if (end < totalPages - 1) pages.push(2, 3, 4);
            } else if (currentPage > totalPages - (maxPagesToShow - 2)) {
                start = totalPages - (maxPagesToShow - 2)
                end = totalPages - 1;
            }

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push('...');
            }
        } else {
            for (let i = 2; i < totalPages; i++) pages.push(i);
        }

        if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);


        return (
            <div className="flex items-center space-x-1">
                {pages.map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && setCurrentPage(page)}
                        className={`
              w-8 h-8 flex items-center justify-center text-sm font-medium rounded-lg transition duration-150
              ${typeof page === 'number'
                                ? (page === currentPage
                                    ? 'bg-blue-600 text-white shadow-md'
                                    : 'text-gray-700 hover:bg-gray-100')
                                : 'text-gray-400 cursor-default'
                            }
            `}
                        disabled={typeof page !== 'number'}
                    >
                        {page}
                    </button>
                ))}
            </div>
        );
    };


    return (
        <div className=''>

            {/* Header and Actions */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-800">Payments & Receipts</h1>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-150 shadow-sm">
                        <IoFunnelOutline className="w-4 h-4" />
                        <span>Filter by date range</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-150 shadow-sm">
                        <IoShareOutline className="w-4 h-4" />
                        <span>Export All</span>
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                {/* Card: Total Spent */}
                <div className="bg-white p-5 h-[170px] rounded-xl shadow-md border border-gray-100 flex flex-col">
                    <div className="flex items-center justify-between space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FaDollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-semibold text-[#9DA0A6] ml-auto">+5.2% MoM</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 mb-4">Total Spent</span>
                    <p className="text-4xl font-extrabold text-gray-900 leading-none">$1240.00</p>
                </div>

                {/* Card: This Month */}
                <div className="bg-white p-5 h-[170px] rounded-xl shadow-md border border-gray-100 flex flex-col">
                    <div className="flex items-center justify-between space-x-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FaCalendarAlt className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-semibold text-green-600 ml-auto">+5.2% MoM</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 mb-4">This Month</span>
                    <p className="text-4xl font-extrabold text-gray-900 leading-none">$320.00</p>
                </div>

                {/* Card: Refunds */}
                <div className="bg-white p-5 h-[170px] rounded-xl shadow-md border border-gray-100 flex flex-col">
                    <div className="flex items-center justify-between space-x-3 mb-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <FaRedo className="w-5 h-5 text-red-600" />
                        </div>
                        <span className="text-sm font-semibold text-[#9DA0A6] ml-auto">+5.2% MoM</span>
                    </div>
                    <span className="text-sm font-medium text-[#EA4335] mb-4">Refunds</span>
                    <p className="text-4xl font-extrabold text-[#EA4335] leading-none">$320.00</p>
                </div>

            </div>

            {/* Transaction History Table */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200">
                <div className="p-5 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">Transaction History</h2>
                    <p className="text-sm text-gray-500">Review all payments and download your official receipts.</p>
                </div>

                {/* Table Head */}
                <div className="grid grid-cols-6 text-xs sm:text-sm font-medium text-gray-500 uppercase px-5 py-3 border-b border-gray-200">
                    <div className='col-span-1 flex items-center space-x-2'>
                        <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                        <span>Date</span>
                    </div>
                    <span className='col-span-2'>Name of Trailer</span>
                    <span className='col-span-1'>Amount</span>
                    <span className='col-span-1'>Status</span>
                    <span className='col-span-1'>Receipt</span>
                </div>

                {/* Table Body */}
                {mockTransactions.map((transaction) => (
                    <div key={transaction.id} className="grid grid-cols-6 text-sm text-gray-900 items-center px-5 py-3 border-b border-gray-100 hover:bg-gray-50 transition duration-100">

                        {/* Checkbox and Date */}
                        <div className='col-span-1 flex items-center space-x-2'>
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <span className='font-medium'>{transaction.date}</span>
                        </div>

                        {/* Name */}
                        <span className='col-span-2'>{transaction.name}</span>

                        {/* Amount */}
                        <span className={`col-span-1 ${getAmountClasses(transaction.amount)}`}>
                            {transaction.amount < 0 ? `-$${Math.abs(transaction.amount).toFixed(2)}` : `$${transaction.amount.toFixed(2)}`}
                        </span>

                        {/* Status */}
                        <div className='col-span-1'>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusClasses(transaction.status)}`}>
                                {transaction.status}
                            </span>
                        </div>

                        {/* Receipt */}
                        <div className='col-span-1'>
                            {transaction.receipt && (
                                <button className="text-blue-600 hover:text-blue-800 p-1">
                                    <FaDownload className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {/* Pagination */}
                <div className="flex justify-between items-center px-5 py-4 text-sm">
                    <p className="text-gray-500">Page 1 of 30</p>

                    <div className='flex items-center space-x-4'>
                        {/* Page Buttons */}
                        {renderPagination()}

                        {/* Go to Page Dropdown (Simplified) */}
                        <div className='flex items-center space-x-2'>
                            <span className='text-gray-700'>Go to page</span>
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 py-1.5 px-3">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UserPayment
