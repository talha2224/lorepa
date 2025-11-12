import React, { useState } from 'react'
import { FaDollarSign, FaCalendarAlt, FaDownload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'
import { IoFunnelOutline, IoShareOutline } from 'react-icons/io5'
import { FiClock } from 'react-icons/fi'

const mockTransactions = [
    { id: 1, date: 'Dec 10, 2025', transactor: 'Diamond C Utility', amount: 326.0, fee: 20.8, feeSource: 'Stripe', status: 'Paid', receipt: true },
    { id: 2, date: 'Dec 10, 2025', transactor: 'Diamond C Utility', amount: 326.0, fee: 20.8, feeSource: 'Stripe', status: 'Paid', receipt: true },
    { id: 3, date: 'Dec 10, 2025', transactor: 'Diamond C Utility', amount: 326.0, fee: 20.8, feeSource: 'Stripe', status: 'Failed', receipt: false },
    { id: 4, date: 'Dec 10, 2025', transactor: 'Diamond C Utility', amount: 326.0, fee: 20.8, feeSource: 'Stripe', status: 'Pending', receipt: true },
    { id: 5, date: 'Dec 10, 2025', transactor: 'Diamond C Utility', amount: 326.0, fee: 20.8, feeSource: 'Stripe', status: 'Paid', receipt: true },
    { id: 6, date: 'Dec 10, 2025', transactor: 'Diamond C Utility', amount: 326.0, fee: 20.8, feeSource: 'Stripe', status: 'Paid', receipt: true },
]

const STATUS_MAP = {
    Paid: { color: 'bg-green-100 text-green-700', icon: FaCheckCircle },
    Pending: { color: 'bg-yellow-100 text-yellow-700', icon: FiClock },
    Failed: { color: 'bg-red-100 text-red-700', icon: FaTimesCircle },
    Default: { color: 'bg-gray-100 text-gray-700', icon: FaCheckCircle },
}

const StatusChip = ({ status }) => {
    const { color, icon: Icon } = STATUS_MAP[status] || STATUS_MAP.Default
    return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${color}`}>
            <Icon className="mr-1 h-3 w-3" />
            {status}
        </span>
    )
}

const MetricCard = ({ icon: Icon, title, value, subtext, iconBgColor, valueColor }) => (
    <div className="flex flex-col p-6 bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl">
        <div className={`p-3 rounded-full ${iconBgColor}`}>
            <Icon className={`w-6 h-6 ${valueColor}`} />
        </div>
        <p className="mt-4 text-sm text-gray-500 font-medium">{title}</p>
        <div className="flex items-baseline mt-1">
            <h2 className="text-3xl font-bold">{value}</h2>
            {subtext && <p className="ml-2 text-xs text-green-500 font-semibold">{subtext}</p>}
        </div>
    </div>
)

const EarningsDashboard = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('This Month')

    const handleDownload = () => console.log('Download 2025 Report')
    const handleFilter = () => console.log('Open Filters')
    const handleShare = () => console.log('Share Dashboard')
    const handleRefresh = () => console.log('Refresh Data')

    return (
        <div>
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-0">Earnings & Payouts</h1>
                <button
                    onClick={handleDownload}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
                >
                    <FaDownload className="w-4 h-4 mr-2" />
                    Download 2025 Report PDF
                </button>
            </header>

            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Revenue Overview</h2>
                    <div className="flex space-x-2">
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-2 px-3 transition"
                        >
                            <option>This Month</option>
                            <option>Last Quarter</option>
                            <option>This Year (YTD)</option>
                        </select>
                        <button
                            onClick={handleFilter}
                            className="p-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                        >
                            <IoFunnelOutline className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="h-64 flex items-end justify-center relative p-4">
                    <div className="absolute top-0 left-0 w-full h-full opacity-70 bg-gradient-to-b from-blue-100 to-white" />
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute top-10 left-0 right-0 h-48 w-full">
                        <defs>
                            <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M0,80 C10,50 20,70 30,40 C40,55 50,30 60,60 C70,45 80,75 90,40 L90,100 L0,100 Z"
                            fill="url(#areaGradient)"
                        />
                        <path
                            d="M0,80 C10,50 20,70 30,40 C40,55 50,30 60,60 C70,45 80,75 90,40"
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="2"
                        />
                    </svg>
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 px-4">
                        {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                            <span key={m} className="w-10 text-center">
                                {m}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <MetricCard
                    icon={FaDollarSign}
                    title="This Month's Revenue"
                    value="$4,230"
                    subtext="vs last month +12%"
                    iconBgColor="bg-green-100"
                    valueColor="text-green-600"
                />
                <MetricCard
                    icon={FaCalendarAlt}
                    title="Pending Payouts"
                    value="$760"
                    subtext="Next payout due in 3 days"
                    iconBgColor="bg-yellow-100"
                    valueColor="text-yellow-600"
                />
                <MetricCard
                    icon={IoFunnelOutline}
                    title="Transaction Fees & Service Charges"
                    value="$480"
                    subtext="Total Fees Deducted (YTD)"
                    iconBgColor="bg-blue-100"
                    valueColor="text-blue-600"
                />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Payout Transaction History</h2>
                    <div className="flex space-x-2">
                        <button onClick={handleRefresh} className="p-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200">
                            <FaDownload className="w-4 h-4" />
                        </button>
                        <button onClick={handleShare} className="p-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200">
                            <IoShareOutline className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="w-12 px-2 py-3 text-left text-xs font-medium text-gray-500">
                                    <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                </th>
                                {['DATE', 'NAME OF TRANSACTOR', 'AMOUNT', 'FEE', 'STATUS', 'RECEIPT'].map((h) => (
                                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockTransactions.map((t) => (
                                <tr key={t.id} className="hover:bg-gray-50">
                                    <td className="px-2 py-4">
                                        <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{t.date}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{t.transactor}</td>
                                    <td className="px-6 py-4 text-sm text-right font-semibold">${t.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 text-sm text-right">
                                        -${t.fee.toFixed(2)}
                                        <span className="block text-xs text-gray-500">{t.feeSource}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusChip status={t.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        {t.receipt ? (
                                            <FaDownload className="w-4 h-4 text-indigo-500 cursor-pointer hover:text-indigo-700 mx-auto" />
                                        ) : (
                                            <span className="text-gray-400">N/A</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-4 sm:mb-0">Page 1 of 38</p>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                            <HiOutlineChevronLeft className="w-5 h-5" />
                        </button>
                        {[1, 2, 3, '...', 10, 11, 12].map((page, i) => (
                            <button
                                key={i}
                                className={`px-3 py-1 text-sm rounded-lg font-medium ${page === 1 ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                            <HiOutlineChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="hidden sm:block text-sm text-gray-600">
                        <a href="#top" className="text-indigo-600 hover:text-indigo-800">
                            Go to top
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EarningsDashboard
