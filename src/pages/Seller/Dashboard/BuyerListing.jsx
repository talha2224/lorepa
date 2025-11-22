import React, { useEffect, useState } from 'react';
import {
  FaPlus,
  FaPencilAlt,
  FaTrashAlt
} from 'react-icons/fa';
import CustomSwitch from '../../../components/Switch';
import axios from 'axios';
import config from '../../../config';
import AddTrailerModal from '../Modal/AddTrailerModal';
import toast from 'react-hot-toast';

const BuyerListing = () => {
  const [trailers, setTrailers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  const filteredListings = trailers.filter(l => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Inactive') return l.status === 'pending' || l.status === 'decline' || l.status === 'Pending';
    if (activeTab === 'Active') return l.status !== 'Pending' && l.status !== 'pending' && l.status !== 'decline';
    return false;
  });

  const fetchTrailers = async () => {
    try {
      const result = await axios.get(`${config.baseUrl}/trailer/seller/${localStorage.getItem("userId")}`);
      setTrailers(result.data.data);
    } catch (err) {
      toast.error("Failed to fetch trailers");
    }
  };

  const deleteTrailer = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this trailer?");
    if (!confirm) return;
    setLoadingDelete(true);
    const toastId = toast.loading("Deleting trailer...");
    try {
      await axios.delete(`${config.baseUrl}/trailer/delete/${id}`);
      toast.success("Trailer deleted", { id: toastId });
      setTrailers(prev => prev.filter(t => t._id !== id));
    } catch (err) {
      toast.error("Failed to delete trailer", { id: toastId });
    }
    setLoadingDelete(false);
  };

  useEffect(() => {
    if (!isModalOpen) fetchTrailers();
  }, [isModalOpen]);

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
              {['Trailer Details', 'Price/Day', 'Deposit', 'Location', 'Category', 'Actions'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredListings.map(l => (
              <tr key={l._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-14 w-24 rounded-lg object-cover border border-gray-200" src={l.images[0]} alt={l.title} />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{l.title}</div>
                      <span
                        className={`inline-flex px-2 text-xs font-semibold py-1 rounded-full mt-1 ${l.status === 'pending'
                          ? 'bg-blue-100 text-blue-800'
                          : l.status === 'decline'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                          }`}
                      >
                        {l.status?.charAt(0).toUpperCase() + l.status?.slice(1)}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-blue-600 font-medium">${l.dailyRate}<span className="text-gray-500 text-xs ml-1">/day</span></td>
                <td className="px-6 py-4 text-sm text-gray-800">${l.depositRate}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{[l.country, l.city].filter(i => i !== null).join(", ")}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{l.category}</td>
                <td className="px-6 py-4 text-sm">
                  <button onClick={() => {
                    setSelectedTrailer(l);
                    setIsModalOpen(true);
                  }} className="text-indigo-600 hover:text-indigo-900 p-2 rounded-md hover:bg-gray-100 transition">
                    <FaPencilAlt className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteTrailer(l._id)}
                    disabled={loadingDelete}
                    className="text-red-600 hover:text-red-900 ml-2 p-2 rounded-md hover:bg-gray-100 transition"
                  >
                    <FaTrashAlt className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddTrailerModal trailerData={selectedTrailer} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default BuyerListing;
