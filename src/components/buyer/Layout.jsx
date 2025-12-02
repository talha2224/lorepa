import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import CompleteProfileModal from './CompleteProfileModal';

const FIRST_VISIT_KEY = 'hasVisitedDashboard';
const USER_PROFILE_INCOMPLETE = true;

const Layout = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem(FIRST_VISIT_KEY);
    if (!hasVisited && USER_PROFILE_INCOMPLETE) {
      setShowModal(true);
      localStorage.setItem(FIRST_VISIT_KEY, 'true');
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='flex items-start bg-[#fff] w-screen h-screen'>
      <Sidebar />

      <div className='flex-1 h-[100vh] overflow-y-scroll bg-[#F9FAFB] '>
        <Header />
        <div className='p-5 flex-1 overflow-x-auto overflow-y-hidden'>
          <Outlet />
        </div>
      </div>

      <CompleteProfileModal
        isOpen={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default Layout;