import React, { useState } from 'react';
import {
  FaPlus,
  FaPencilAlt,
  FaTrashAlt,
  FaCloudUploadAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import trailer1 from '../../../assets/trailer.png';
import trailer2 from '../../../assets/trailer2.png';
import trailer3 from '../../../assets/trailer2.png';
import CustomSwitch from '../../../components/Switch';

const mockListings = [
  { id: 1, image: trailer1, title: '2017 Diamond C Utility 77"', status: 'Active', price: 85, revenue: 3250, rentals: 12, occupancy: 78 },
  { id: 2, image: trailer2, title: '2019 PJ Low Profile Gooseneck', status: 'Inactive', price: 85, revenue: 3250, rentals: 12, occupancy: 78 },
  { id: 3, image: trailer3, title: '2020 Sure-Trac Dump Trailer', status: 'Paid', price: 85, revenue: 3250, rentals: 12, occupancy: 78 },
  { id: 4, image: trailer1, title: '2018 Load Rite Boat Trailer', status: 'Inactive', price: 85, revenue: 3250, rentals: 12, occupancy: 78 },
  { id: 5, image: trailer2, title: '2021 Big Tex Equipment Trailer', status: 'Paid', price: 85, revenue: 3250, rentals: 12, occupancy: 78 },
  { id: 6, image: trailer3, title: '2016 Utility Flatbed Trailer', status: 'Active', price: 85, revenue: 3250, rentals: 12, occupancy: 78 }
];

const AddTrailerModal = ({ isOpen, onClose }) => {
  const [listingEnabled, setListingEnabled] = useState(true);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Utility');
  const [description, setDescription] = useState('');
  const maxDescChars = 300;

  if (!isOpen) return null;

  const daysInMonth = 30;
  const startDayOfWeek = 5;
  const availableDates = Array.from({ length: 23 }, (_, i) => i + 8);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-200 scale-95">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Trailer</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">General Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Listing Status</label>
                    <p className="text-xs text-gray-500">Publicly listed and visible for booking.</p>
                  </div>
                  <CustomSwitch enabled={listingEnabled} onChange={setListingEnabled} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g. enclosed, flatbed, utility"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="block w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {['Utility', 'Enclosed', 'Flatbed', 'Dump', 'Boat'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (max {maxDescChars} chars)
                  </label>
                  <textarea
                    rows="4"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-none"
                    placeholder="Describe your trailer's condition..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value.slice(0, maxDescChars))}
                  />
                  <p className="text-xs text-gray-500 text-right">{description.length}/{maxDescChars}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per day ($)</label>
                  <input
                    type="number"
                    defaultValue="85"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deposit (optional) ($)</label>
                  <input
                    type="number"
                    defaultValue="200"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Photos</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 cursor-pointer transition">
                <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Upload Image</p>
                <p className="text-xs text-gray-500">Recommended 3–4 high-quality photos</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Availability</h3>
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600"><FaChevronLeft /></button>
                  <span className="font-semibold text-gray-800">November 2024</span>
                  <button className="p-2 rounded-full hover:bg-gray-200 text-gray-600"><FaChevronRight /></button>
                </div>

                <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day}>{day}</div>)}
                </div>

                <div className="grid grid-cols-7 gap-1 text-sm">
                  {[...Array(startDayOfWeek)].map((_, i) => (
                    <div key={`empty-${i}`} className="p-2 text-center text-gray-400">
                      {31 - startDayOfWeek + 1 + i}
                    </div>
                  ))}
                  {[...Array(daysInMonth)].map((_, i) => {
                    const day = i + 1;
                    const isAvailable = availableDates.includes(day);
                    const isCurrentDay = day === 8;
                    return (
                      <div
                        key={day}
                        className={`p-2 text-center rounded-lg cursor-pointer transition-colors duration-150
                          ${isAvailable ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}
                          ${isCurrentDay ? 'border-2 border-blue-500 font-bold' : ''}`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  Click dates to toggle <span className="text-blue-600">Available</span> or <span className="text-gray-600">Blocked</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 mr-3 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert('Trailer Saved!');
              onClose();
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition shadow-md shadow-blue-500/30"
          >
            Save Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

const BuyerListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 30;

  const filteredListings = mockListings.filter(l =>
    activeTab === 'All' ? true : l.status === activeTab
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [1, 2, 3];
    if (totalPages > 6) pages.push('...', totalPages - 2, totalPages - 1, totalPages);
    else for (let i = 4; i <= totalPages; i++) pages.push(i);

    return pages.map((num, i) => (
      <button
        key={i}
        onClick={() => typeof num === 'number' && handlePageChange(num)}
        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium transition-colors
          ${typeof num === 'number'
            ? num === currentPage
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:bg-gray-100'
            : 'text-gray-500 cursor-default'}`}
        disabled={typeof num !== 'number'}
      >
        {num}
      </button>
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-gray-900">My Listings</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          <FaPlus className="w-4 h-4 mr-2" /> Add Trailer
        </button>
      </div>

      <div className="flex border-b border-gray-200 mb-6 -mt-2">
        {['All', 'Active', 'Inactive'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3 px-6 text-base font-medium transition-colors
              ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Trailer Details', 'Price/Day', 'Revenue', 'Rentals', 'Occupancy', 'Actions'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredListings.map(l => (
              <tr key={l.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-14 w-24 rounded-lg object-cover border border-gray-200" src={l.image} alt={l.title} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{l.title}</div>
                      <span
                        className={`inline-flex px-2 text-xs font-semibold rounded-full mt-1
                          ${l.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : l.status === 'Inactive'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'}`}
                      >
                        {l.status}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-blue-600 font-medium">${l.price}<span className="text-gray-500 text-xs ml-1">/day</span></td>
                <td className="px-6 py-4 text-sm text-gray-800">${l.revenue}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{l.rentals}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{l.occupancy}%</td>
                <td className="px-6 py-4 text-right text-sm">
                  <button className="text-indigo-600 hover:text-indigo-900 p-2 rounded-md hover:bg-gray-100 transition">
                    <FaPencilAlt className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 ml-2 p-2 rounded-md hover:bg-gray-100 transition">
                    <FaTrashAlt className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 py-4 border-t border-gray-200">
        <p className="text-sm text-gray-700 mb-4 sm:mb-0">
          Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
        </p>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FaChevronLeft className="w-3 h-3" />
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <FaChevronRight className="w-3 h-3" />
          </button>
          <span className="text-gray-500 text-sm ml-4">Go to page</span>
          <select
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="w-16 h-8 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500 py-0 pl-2 pr-7 text-gray-700"
          >
            {[...Array(totalPages)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>

      <AddTrailerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BuyerListing;
