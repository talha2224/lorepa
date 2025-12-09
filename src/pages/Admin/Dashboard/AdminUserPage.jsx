import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import toast from 'react-hot-toast';

const AdminUserPage = () => {
  const [activeTab, setActiveTab] = useState('owner');
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalImage, setModalImage] = useState(null); // <-- NEW for modal image

  const itemsPerPage = 10;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${config.baseUrl}/account/all`);
      if (res.data?.data) {
        setUsers(res.data.data);
      }
    } catch {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => user.role === activeTab);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const displayedUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  const openImageModal = (url) => setModalImage(url);
  const closeModal = () => setModalImage(null);

  return (
    <div className='min-h-screen bg-[#fff] p-2'>
      {/* Image Modal */}
      {modalImage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <img
            src={modalImage}
            alt="License"
            className="max-w-[90%] max-height-[90%] rounded-lg shadow-xl border-4 border-white"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Tabs */}
      <div className='flex mb-6 border-b border-gray-200'>
        <button
          onClick={() => handleTabChange('owner')}
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'owner'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'}`}
        >
          Owners
        </button>
        <button
          onClick={() => handleTabChange('renter')}
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'renter'
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'}`}
        >
          Renters
        </button>
      </div>

      {/* Table */}
      <div className='bg-white rounded-lg shadow-md overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs text-gray-500 text-nowrap'>S/N</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500 text-nowrap'>Name</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500 text-nowrap'>Email</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500 text-nowrap'>Phone</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500 text-nowrap'>License</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500 text-nowrap'>Trailer Registration</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500 text-nowrap'>Trailer Insurance Policy</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500 text-nowrap'>Car Insurance Policy</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500 text-nowrap'>Status</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500 text-nowrap'>KYC</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500 text-nowrap'>Actions</th>
            </tr>
          </thead>

          <tbody className='bg-white divide-y divide-gray-200'>
            {displayedUsers.map((user, index) => (
              <tr key={user._id}>
                <td className='px-6 py-4 text-sm'>{indexOfFirstUser + index + 1}</td>
                <td className='px-6 py-4 text-sm'>{user.name}</td>
                <td className='px-6 py-4 text-sm'>{user.email}</td>
                <td className='px-6 py-4 text-sm'>{user.phone}</td>

                {/* License Images */}
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    {/* Front */}
                    {
                      user.licenseFrontImage &&
                      <img
                        src={user.licenseFrontImage}
                        alt="Front"
                        className="w-14 h-10 object-cover rounded-md border cursor-pointer hover:scale-105 transition"
                        onClick={() => openImageModal(user.licenseFrontImage)}
                      />
                    }
                    {/* Back */}
                    {
                      user.licenseBackImage && (
                        <img
                          src={user.licenseBackImage}
                          alt="Back"
                          className="w-14 h-10 object-cover rounded-md border cursor-pointer hover:scale-105 transition"
                          onClick={() => openImageModal(user.licenseBackImage)}
                        />
                      )
                    }
                  </div>
                </td>

                <td className="px-6 py-4">
                  {
                    user.trailerRegistrationImage ?
                    <img
                      src={user.trailerRegistrationImage}
                      alt="trailerRegistrationImage"
                      className="w-14 h-10 object-cover rounded-md border cursor-pointer hover:scale-105 transition"
                      onClick={() => openImageModal(user.trailerRegistrationImage)}
                    />
                    :
                    "-"
                  }
                </td>
                <td className="px-6 py-4">
                  {
                    user.trailerInsurancePolicyImage ?
                    <img
                      src={user.trailerInsurancePolicyImage}
                      alt="trailerInsurancePolicyImage"
                      className="w-14 h-10 object-cover rounded-md border cursor-pointer hover:scale-105 transition"
                      onClick={() => openImageModal(user.trailerInsurancePolicyImage)}
                    />:
                    "-"
                  }
                </td>
                <td className="px-6 py-4">
                  {
                    user.carInsurancePolicyImage ?
                    <img
                      src={user.carInsurancePolicyImage}
                      alt="carInsurancePolicyImage"
                      className="w-14 h-10 object-cover rounded-md border cursor-pointer hover:scale-105 transition"
                      onClick={() => openImageModal(user.carInsurancePolicyImage)}
                    />
                    :
                    "-"
                  }
                </td>

                {/* Account Status */}
                <td className='px-6 py-4 text-sm'>
                  {user.accountBlocked ? (
                    <span className='text-red-600'>Blocked</span>
                  ) : (
                    <span className='text-green-600'>Active</span>
                  )}
                </td>

                {/* KYC */}
                <td className='px-6 py-4 text-sm'>
                  <div className="flex flex-col gap-2">
                    <span className={`${user.kycVerified ? "text-green-600" : "text-red-600"}`}>
                      {user.kycVerified ? "Approved" : "Declined"}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className='px-6 py-4 text-sm'>
                  <div className='flex gap-3'>
                    <Link to={`/admin/dashboard/user/${user._id}`} className='text-blue-600 hover:underline'>View</Link>
                    {user.accountBlocked ? (
                      <button className='text-green-600 hover:underline'>Reactivate</button>
                    ) : (
                      <button className='text-red-600 hover:underline'>Suspend</button>
                    )}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='mt-6 flex justify-between items-center'>
        <p className='text-sm text-gray-700'>Page {currentPage} of {totalPages}</p>

        <div className='flex space-x-2'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md text-sm ${currentPage === page
                ? 'bg-blue-600 text-white'
                : 'bg-white border text-gray-800'}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminUserPage;
