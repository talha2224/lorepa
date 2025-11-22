import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaMobileAlt, FaBell, FaCheckCircle } from 'react-icons/fa';
import { IoWalletOutline } from 'react-icons/io5';
import { MdOutlineDocumentScanner } from 'react-icons/md';
import config from '../../../config';

// --- Components ---

/**
 * Custom Toggle Switch component
 */
const ToggleSwitch = ({ checked, onChange }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" className="sr-only peer" checked={checked} onChange={onChange} />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
  </label>
);

/**
 * Component for the Notification Preferences card (Left side)
 */
const NotificationPreferences = ({ preferences, onToggle }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
      <h2 className="text-lg font-bold text-gray-800 mb-6">Notification Preferences</h2>

      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <FaEnvelope className="text-xl text-[#2563EB] mt-1" />
            <div>
              <p className="font-semibold text-gray-700">Email Notifications</p>
              <p className="text-sm text-gray-500 max-w-xs">Receive updates and booking confirmations via email.</p>
            </div>
          </div>
          <ToggleSwitch
            checked={preferences.email}
            onChange={() => onToggle('email')}
          />
        </div>

        {/* SMS Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <FaMobileAlt className="text-xl text-[#2563EB] mt-1" />
            <div>
              <p className="font-semibold text-gray-700">SMS Notifications</p>
              <p className="text-sm text-gray-500 max-w-xs">Get alerts about upcoming trips or status changes.</p>
            </div>
          </div>
          <ToggleSwitch
            checked={preferences.sms}
            onChange={() => onToggle('sms')}
          />
        </div>

        {/* In-App Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-start space-x-3">
            <FaBell className="text-xl text-[#2563EB] mt-1" />
            <div>
              <p className="font-semibold text-gray-700">In-App Notifications</p>
              <p className="text-sm text-gray-500 max-w-xs">Receive messages and system alerts in the app.</p>
            </div>
          </div>
          <ToggleSwitch
            checked={preferences.inApp}
            onChange={() => onToggle('inApp')}
          />
        </div>
      </div>

      <button className="w-full mt-8 py-2.5 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-300/50">
        Save Preferences
      </button>
    </div>
  );
};

/**
 * Component for a single activity item (Right side)
 */
const ActivityItem = ({ icon, title, description, time, isNew }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
    <div className='flex items-start'>
      <div className="mr-4 mt-1">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-[#2563EB]">
          {icon}
        </div>
      </div>
      <div >
        <p className="font-medium flex-1 text-gray-800">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
    <div className="flex items-center gap-x-1 text-xs text-gray-400 font-medium ml-4">
      {isNew && <span className="min-w-2 min-h-2 bg-blue-500 rounded-full"></span>}
      <span>{time}</span>
    </div>
  </div>
);

/**
 * Component for the Recent Activity list (Right side)
 */
const RecentActivity = ({ activities }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Recent Activity</h2>
      <div className="divide-y divide-gray-100">
        {activities.map((activity, index) => (
          <ActivityItem key={index} {...activity} />
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---

const UserNotification = () => {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    inApp: true,
  });
  const [activities, setActivities] = useState([]);

  const handleToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const fetchNotifications = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      const res = await axios.get(`${config.baseUrl}/notification/user/${userId}`);
      const notifs = res.data.data.map(notif => ({
        icon: <FaBell />,
        title: notif.title,
        description: notif.description,
        time: new Date(notif.createdAt).toLocaleString(),
        isNew: !notif.isRead,
      }));
      setActivities(notifs);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);


  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Notifications</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Preferences */}
        <div className="lg:col-span-1">
          <NotificationPreferences preferences={preferences} onToggle={handleToggle} />
        </div>

        {/* Right Column: Activity */}
        <div className="lg:col-span-2">
          <RecentActivity activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default UserNotification;