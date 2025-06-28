import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiGlobe } from "react-icons/ci";
import { FaUserTie } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci"; // Import the search icon
import Logo from "../assets/logo.svg";


const Navbar2 = () => {

    const [showLanguages, setShowLanguages] = useState(false);
    const [showNav, setshowNav] = useState(false);

    // State for the new input fields
    const [location,setLocation] = useState("Montreal");
    const [fromDate, setFromDate] = useState("28/04/2025");
    const [fromTime, setFromTime] = useState("12:42 AM");
    const [untilDate, setUntilDate] = useState("1/05/2025");
    const [untilTime, setUntilTime] = useState("10:42 AM");


    return (
        <nav className="border-b border-[#F1F1F1] bg-blue-600"> {/* Changed background to blue-600 as per image */}
            <div className="px-4 sm:px-6 lg:px-8 bg-white">

                <div className="flex items-center justify-between h-16">


                    <div className="flex-shrink-0 flex items-center gap-x-2">
                        <Link to={"/"} className="text-xl"><img src={Logo} alt="" className='h-[8rem]' /></Link>
                    </div>

                    {/* New Search/Filter Section */}
                    <div className="md:flex items-center hidden gap-x-4">
                        {/* Where Input */}
                        <div className='flex items-center gap-x-2 border border-[#C3C3C3] p-2 rounded-3xl'>
                            <label htmlFor="where" className="text-xs text-[#2563EB]">Where</label>
                            <input type="text" id="where" value={location}onChange={(e) => setLocation(e.target.value)}className="block w-full text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0"placeholder="Montreal"/>
                        </div>

                        {/* From Date/Time */}
                        <div className='flex items-center gap-x-2 border border-[#C3C3C3] p-2 rounded-3xl'>
                            <label htmlFor="fromDate" className="text-xs text-[#2563EB]">From</label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    id="fromDate"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="block w-24 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0"
                                />
                                <input
                                    type="text"
                                    id="fromTime"
                                    value={fromTime}
                                    onChange={(e) => setFromTime(e.target.value)}
                                    className="block w-20 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0 ml-2"
                                />
                            </div>
                        </div>

                        {/* Until Date/Time */}
                        <div className='flex items-center gap-x-2 border border-[#C3C3C3] p-2 rounded-3xl'>
                            <label htmlFor="untilDate" className="text-xs text-[#2563EB]">Until</label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    id="untilDate"
                                    value={untilDate}
                                    onChange={(e) => setUntilDate(e.target.value)}
                                    className="block w-24 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0"
                                />
                                <input
                                    type="text"
                                    id="untilTime"
                                    value={untilTime}
                                    onChange={(e) => setUntilTime(e.target.value)}
                                    className="block w-20 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0 ml-2"
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <button className="bg-[#2563EB] text-white p-2 rounded-full ml-2 flex items-center justify-center">
                            <CiSearch className="h-4 w-4" />
                        </button>
                    </div>


                    <div className="block relative">
                        <div className="ml-4 flex items-center md:ml-6 gap-x-4">
                            <CiGlobe className='cursor-pointer' onClick={() => setShowLanguages(!showLanguages)} />
                            <RxHamburgerMenu onClick={() => setshowNav(!showNav)} className='cursor-pointer' />
                            <FaUserTie className='cursor-pointer' />
                        </div>

                        {showLanguages && (
                            <div className=' absolute z-10 right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg'>
                                <div className='py-1'>
                                    <Link to="#" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>English</Link>
                                    <Link to="#" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Spanish</Link>
                                    <Link to="#" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Chinese</Link>
                                    <Link to="#" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>French</Link>
                                </div>
                            </div>
                        )}
                        {showNav && (
                            <div className=' absolute z-10 right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg'>
                                <div className='py-1'>
                                    <Link to="/login" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Login</Link>
                                    <Link to="/login" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Signup</Link>
                                    <Link to="/host" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Become a host</Link>
                                    <Link to="/who" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Who are we</Link>
                                    <Link to="/contact" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Contact us</Link>
                                    <Link to="/calculator" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Calculator</Link>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

        </nav>
    );
}

export default Navbar2;