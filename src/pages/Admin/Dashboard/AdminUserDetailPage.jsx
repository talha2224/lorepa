import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../../config";
import toast from "react-hot-toast";

const placeholderAvatar = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoVxP6BSWt_Th-gPE1VK6416lx09HTdfHs0w&s";

const AdminUserDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const fetchSingleUser = async () => {
    try {
      const res = await axios.get(`${config.baseUrl}/account/single/${id}`);
      setUser(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch user details");
    }
  };

  useEffect(() => {
    fetchSingleUser();
  }, [id]);

  if (!user) return <p className="p-6">Loading user details...</p>;

  const personalInfo = user.personalInfo || {};

  const getValue = (value) => value || "-";

  return (
    <div className="min-h-screen bg-[#fff] p-4 rounded-md">
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Owner detail</h1>

      {/* Main content area */}
      <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8">
        {/* Left column: Profile Section */}
        <div className="flex flex-col items-center md:items-start md:w-1/4">
          <img
            src={user.avatar || placeholderAvatar}
            alt="User Avatar"
            className="w-28 h-28 rounded-full object-cover mb-4"
          />
          <h2 className="text-xl font-bold text-gray-900 mb-2">{getValue(user.name)}</h2>
          <div className="flex items-center mb-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                user.accountBlocked
                  ? "bg-gray-200 text-gray-700"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {user.accountBlocked ? "Blocked" : "Active"}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Joined date:</span> {getValue(user.createdAt?.slice(0, 10))}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Last login:</span> NA
          </p>
        </div>

        {/* Right column: Personal Information */}
        <div className="flex-1 md:w-3/4 border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0 md:pl-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700">
            <div>
              <p className="font-medium text-sm">First Name</p>
              <p className="text-base">{getValue(user.name)}</p>
            </div>
            <div>
              <p className="font-medium text-sm">Last Name</p>
              <p className="text-base">{getValue(user.name)}</p>
            </div>
            <div>
              <p className="font-medium text-sm">Email address</p>
              <p className="text-base">{getValue(user.email)}</p>
            </div>
            <div>
              <p className="font-medium text-sm">Phone number</p>
              <p className="text-base">{getValue(user.phone)}</p>
            </div>
            <div>
              <p className="font-medium text-sm">Date of birth</p>
              <p className="text-base">{getValue(personalInfo.dateOfBirth)}</p>
            </div>
            <div>
              <p className="font-medium text-sm">Region</p>
              <p className="text-base">{getValue(personalInfo.region)}</p>
            </div>
            <div>
              <p className="font-medium text-sm">Province</p>
              <p className="text-base">{getValue(personalInfo.province)}</p>
            </div>
            <div>
              <p className="font-medium text-sm">City</p>
              <p className="text-base">{getValue(personalInfo.city)}</p>
            </div>
            <div>
              <p className="font-medium text-sm">Zip</p>
              <p className="text-base">{getValue(personalInfo.zip)}</p>
            </div>
            <div>
              <p className="font-medium text-sm">Address 1</p>
              <p className="text-base">{getValue(personalInfo.address1)}</p>
            </div>
            <div>
              <p className="font-medium text-sm">Address 2</p>
              <p className="text-base">{getValue(personalInfo.address2)}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="font-medium text-sm">About owner</p>
              <p className="text-base">{getValue(personalInfo.aboutOwner)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetailPage;
