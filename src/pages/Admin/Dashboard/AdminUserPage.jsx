import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../../config';
import toast from 'react-hot-toast';

const AdminUserPage = () => {
  const [activeTab, setActiveTab] = useState('owner'); // 'owner' or 'renter'
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${config.baseUrl}/account/all`);
      if (res.data?.data) {
        setUsers(res.data.data);
      }
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  const handleReactivate = async (id) => {
    try {
      await axios.put(`${config.baseUrl}/account/reactivate/account/${id}`);
      toast.success("Account reactivated");
      fetchUsers();
    } catch {
      toast.error("Failed to reactivate");
    }
  };

  const handleSuspend = async (id) => {
    try {
      await axios.delete(`${config.baseUrl}/account/delete/account/${id}`);
      toast.success("Account suspended");
      fetchUsers();
    } catch {
      toast.error("Failed to suspend");
    }
  };

  const filteredUsers = users.filter(user => user.role === activeTab);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const displayedUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className='min-h-screen bg-[#fff] p-2'>
      {/* Tab Navigation */}
      <div className='flex mb-6 border-b border-gray-200'>
        <button
          onClick={() => handleTabChange('owner')}
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'owner' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Owners
        </button>
        <button
          onClick={() => handleTabChange('renter')}
          className={`py-2 px-4 text-lg font-medium ${activeTab === 'renter' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Renters
        </button>
      </div>

      {/* Users Table */}
      <div className='bg-white rounded-lg shadow-md overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs text-gray-500'>S/N</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500'>Name</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500'>Email</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500'>Phone</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500'>Status</th>
              <th className='px-6 py-3 text-left text-xs text-gray-500'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {displayedUsers.map((user, index) => (
              <tr key={user._id}>
                <td className='px-6 py-4 text-sm'>{indexOfFirstUser + index + 1}</td>
                <td className='px-6 py-4 text-sm'>{user.name}</td>
                <td className='px-6 py-4 text-sm'>{user.email}</td>
                <td className='px-6 py-4 text-sm'>{user.phone}</td>
                <td className='px-6 py-4 text-sm'>
                  {user.accountBlocked ? (
                    <span className='text-red-600'>Blocked</span>
                  ) : (
                    <span className='text-green-600'>Active</span>
                  )}
                </td>
                <td className='px-6 py-4 text-sm'>
                  <div className='flex gap-2'>
                    <Link to={`/admin/dashboard/user/${user._id}`} className='text-blue-600 hover:underline'>View</Link>
                    {user.accountBlocked ? (
                      <button
                        onClick={() => handleReactivate(user._id)}
                        className='text-green-600 hover:underline'
                      >
                        Reactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSuspend(user._id)}
                        className='text-red-600 hover:underline'
                      >
                        Suspend
                      </button>
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
        <p className='text-sm text-gray-700'>
          Page {currentPage} of {totalPages}
        </p>
        <div className='flex space-x-2'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === page ? 'bg-blue-600 text-white' : 'bg-white border text-gray-800'
              }`}
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
