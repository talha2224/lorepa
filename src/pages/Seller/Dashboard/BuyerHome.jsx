import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaTruck, FaUserCircle, FaStar, FaPlus, FaChevronDown, FaEllipsisV } from 'react-icons/fa';
import { IoWalletOutline } from 'react-icons/io5';
import axios from 'axios';
import config from '../../../config'
import { Link, useNavigate } from 'react-router-dom';

const KpiCard = ({ title, value, detail, icon: Icon, iconColor, iconBg }) => (
  <div className="bg-white p-6 rounded-xl shadow-md flex items-start space-x-4 transition duration-300 hover:shadow-lg">
    {/* Icon */}
    <div className={`p-3 rounded-full ${iconBg} flex-shrink-0`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    {/* Content */}
    <div>
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</p>
      <h2 className="text-2xl font-bold text-gray-900 mt-1">{value}</h2>
      {detail && <p className={`text-sm mt-1 ${detail.includes('+') ? 'text-green-600' : 'text-gray-500'}`}>{detail}</p>}
    </div>
  </div>
);

const ReservationItem = ({ image, title, date, renter, status, details ,handleRoute}) => (
  <div className="flex space-x-3 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition duration-150 rounded-lg p-2 -mx-2">
    {/* Trailer Image */}
    <img
      src={image}
      alt={title}
      className="w-20 h-14 object-cover rounded-lg flex-shrink-0 border border-gray-200"
      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/80x56/A3A3A3/FFFFFF?text=Trailer"; }}
    />
    {/* Details */}
    <div className="flex-grow min-w-0">
      <p className="text-sm font-semibold text-gray-800 line-clamp-1" title={title}>{title}</p>
      <p className="text-xs text-gray-600 my-0.5">{date}</p>
      <div className='flex items-center text-xs text-gray-500'>
        <FaUserCircle className="w-3 h-3 mr-1 text-blue-500" />
        <span className="truncate">{renter}</span>
      </div>
      {/* Status Badge */}
      {status && (
        <span className={`inline-flex items-center px-2 py-[2px] mt-1 rounded-full text-xs font-medium ${status === 'accepted' ? 'bg-blue-100 text-blue-800' :
          status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )}
    </div>
    {/* Actions */}
    <div className="flex flex-col justify-between items-end">
      <button onClick={handleRoute} className="text-blue-600 hover:text-blue-800 text-xs font-medium flex-shrink-0">
        {details}
      </button>
    </div>
  </div>
);

const RevenueChart = () => (
  <div className="w-full h-64 p-4">
    {/* Simplified SVG Chart to match the design's shape */}
    <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="none">
      {/* Grid Lines */}
      <g className="text-gray-200" stroke="currentColor" strokeWidth="1">
        <line x1="0" y1="20" x2="500" y2="20" />
        <line x1="0" y1="70" x2="500" y2="70" />
        <line x1="0" y1="120" x2="500" y2="120" />
        <line x1="0" y1="170" x2="500" y2="170" />
      </g>

      {/* Labels (Simplified) */}
      <text x="0" y="195" className="text-sm fill-gray-500">Apr</text>
      <text x="100" y="195" className="text-sm fill-gray-500">May</text>
      <text x="200" y="195" className="text-sm fill-gray-500">Jun</text>
      <text x="300" y="195" className="text-sm fill-gray-500">Jul</text>
      <text x="400" y="195" className="text-sm fill-gray-500">Aug</text>
      <text x="490" y="195" className="text-sm fill-gray-500" textAnchor="end">Sep</text>

      {/* Data Line 1: Revenue (Blue) - Mock Data Points */}
      <polyline
        fill="none"
        stroke="#3B82F6"
        strokeWidth="3"
        points="0,170 80,100 160,130 240,80 320,150 400,50 480,140"
      />
      {/* Data Line 2: Target (Orange) - Mock Data Points */}
      <polyline
        fill="none"
        stroke="#F97316"
        strokeWidth="3"
        points="0,120 80,150 160,110 240,130 320,100 400,90 480,110"
      />
    </svg>

    {/* Legend */}
    <div className="flex justify-center space-x-6 text-sm mt-4">
      <div className="flex items-center">
        <span className="w-3 h-3 bg-blue-500 rounded-full mr-2 shadow-sm"></span>
        Revenue
      </div>
      <div className="flex items-center">
        <span className="w-3 h-3 bg-orange-500 rounded-full mr-2 shadow-sm"></span>
        Target
      </div>
    </div>
  </div>
);

// Main Component
export default function App() {
  const [data, setData] = useState(null)
  const nav = useNavigate()
  const fetchData = async () => {
    let result = await axios.get(`${config.baseUrl}/account/details/${localStorage.getItem("userId")}`)
    setData(result?.data?.data);
  }

  useEffect(() => {
    fetchData()
  }, [])
  let amount = data?.booking?.filter(i => i?.status == "completed").reduce((a, c) => (a + c?.price), 0)
  const handleRoute =()=>{
    nav("/seller/dashboard/reservation")
  }
  return (
    <div className=''>
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome to your dashboard</h1>

      {/* Top KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <KpiCard
          title="Total Earnings"
          value={`$${amount}`}
          detail="vs last month"
          icon={IoWalletOutline}
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <KpiCard
          title="Year-to-Date (YTD)"
          value={`$${amount}`}
          detail="Target $30,000"
          icon={FaCalendarAlt}
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
        />
        <KpiCard
          title="Active Trailers"
          value={`${data?.trailer?.length || 0} Units`}
          detail="All listings live"
          icon={FaTruck}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* Main Content: Revenue Overview (Left) and Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column (Large - 2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Revenue Overview Card */}
          <div className="bg-white p-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
              <h2 className="text-xl font-semibold text-gray-900">Revenue Overview</h2>
              <button className="text-gray-600 text-sm flex items-center hover:text-gray-800 px-3 py-1 rounded-full border border-gray-300 transition">
                Monthly <FaChevronDown className="w-3 h-3 ml-1" />
              </button>
            </div>
            <RevenueChart />
          </div>
        </div>

        {/* Right Column (Sidebar - 1/3 width on large screens) */}
        <div className="lg:col-span-1 space-y-6">

          {/* Upcoming Reservations Card */}
          <div className="bg-white p-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
              <h2 className="text-xl font-semibold text-gray-900">Reservations</h2>
              <Link to={"/seller/dashboard/reservation"} className="text-blue-600 text-sm font-medium hover:text-blue-800 transition duration-150">View all</Link>
            </div>
            <div className="divide-y divide-gray-100">
              {
                data?.booking?.map((i)=>(
                  <ReservationItem
                    image={i?.trailerId?.images[0]}
                    title={i?.trailerId?.title}
                    date={i?.startDate + " - " + i?.endDate}
                    renter={i?.user_id?.name}
                    status={i?.status}
                    details="View Details"
                    handleRoute={handleRoute}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-3">
        {/* Trailer Views */}
        {/* <div className="bg-white p-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <FaUserCircle className="w-5 h-5 text-blue-500" />
            <p className="text-gray-500 text-sm">Trailer Views</p>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">1,240</h3>
          <p className="text-sm text-green-600 mt-1 font-medium">+12%</p>
        </div> */}

        {/* Average Rating */}
        {/* <div className="bg-white p-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
          <div className="flex items-center space-x-2 mb-2">
            <FaStar className="w-5 h-5 text-yellow-500" />
            <p className="text-gray-500 text-sm">Average Rating</p>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-1 flex items-baseline">
            4.8 <span className="text-xl text-yellow-500 ml-2">★★★★☆</span>
          </h3>
          <p className="text-sm text-gray-500 mt-1">from 58 reviews</p>
        </div> */}

        {/* Occupancy Rate */}
        {/* <div className="bg-white p-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
          <p className="text-gray-500 text-sm mb-2">Occupancy Rate</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">82%</h3>
          <p className="text-sm text-gray-500 mt-1">vs 75% last Q</p>
        </div> */}
      </div>

      {/* <h2 className="text-xl font-semibold text-gray-900 mb-4 mt-3">Quick Actions</h2>
      <div className="flex space-x-3">
        <button className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg shadow-blue-500/50 hover:bg-blue-700 transition duration-150 transform hover:scale-[1.01]">
          <FaPlus className="w-4 h-4 mr-2" /> Add Trailer
        </button>
        <button className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 text-gray-800 border border-gray-300 font-medium rounded-lg hover:bg-gray-200 transition duration-150">
          View Calendar
        </button>
        <button className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 text-gray-800 border border-gray-300 font-medium rounded-lg hover:bg-gray-200 transition duration-150">
          Manage Payouts
        </button>
      </div> */}
    </div>
  );
}