import React, { useState } from 'react';
import { mockOwners } from '../../../constants/listing';
import { Link } from 'react-router-dom';


const mockRenters = [...mockOwners].reverse();


const AdminUserPage = () => {
  const [activeTab, setActiveTab] = useState('Owners'); // 'Owners' or 'Renters'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Determine which data set to use based on the active tab
  const currentUsers = activeTab === 'Owners' ? mockOwners : mockRenters;

  // Calculate the users to display on the current page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const displayedUsers = currentUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages for the current tab
  const totalPages = Math.ceil(currentUsers.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle tab change
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  return (
    <div className='min-h-screen bg-[#fff] p-2'>
      {/* Tab Navigation */}
      <div className='flex mb-6 border-b border-gray-200'>
        <button
          onClick={() => handleTabChange('Owners')}
          className={`py-2 px-4 text-lg -medium ${
            activeTab === 'Owners' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Owners
        </button>
        <button
          onClick={() => handleTabChange('Renters')}
          className={`py-2 px-4 text-lg -medium ${
            activeTab === 'Renters' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Renters
        </button>
      </div>

      {/* Users Table */}
      <div className='bg-white rounded-lg shadow-md overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th scope='col' className='p-4 text-left text-xs -medium text-gray-500 uppercase tracking-wider'>
                <input type='checkbox' className='h-4 w-4 text-blue-600 border-gray-300 rounded' />
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs -medium text-gray-500 uppercase tracking-wider'>
                S/N
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs -medium text-gray-500 uppercase tracking-wider'>
                Name of {activeTab === 'Owners' ? 'Owner' : 'Renter'}
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs -medium text-gray-500 uppercase tracking-wider'>
                ID
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs -medium text-gray-500 uppercase tracking-wider'>
                Email Address
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs -medium text-gray-500 uppercase tracking-wider'>
                Phone Number
              </th>
              <th scope='col' className='px-6 py-3 text-left text-xs -medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {displayedUsers.map((user) => (
              <tr key={user.sin}>
                <td className='p-4 whitespace-nowrap'>
                  <input type='checkbox' className='h-4 w-4 text-blue-600 border-gray-300 rounded' />
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {user.sin}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {user.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {user.id}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {user.email}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {user.phone}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm'>
                  <div className='flex items-center space-x-2'>
                    <Link to={`${user.id}`} className='text-green-600 hover:text-green-800 -medium'>
                      View
                    </Link>
                    <button className='text-red-600 hover:text-red-800 -medium'>
                      Suspend
                    </button>
                    <button className='text-blue-600 hover:text-blue-800 -medium'>
                      Reactivate
                    </button>
                  </div>
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
              className={`px-3 py-1 rounded-md text-sm -medium
                ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}
              `}
            >
              {page}
            </button>
          ))}

          {/* Go to page dropdown (simplified) */}
          <div className='relative'>
            <select
              className='block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-1 px-3 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm'
              onChange={(e) => handlePageChange(Number(e.target.value))}
              value={currentPage}
            >
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

export default AdminUserPage;
