import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg'
import { CiGlobe } from "react-icons/ci";
import { FaUserTie } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {

    const [showLanguages, setShowLanguages] = useState(false);
    const [showNav, setshowNav] = useState(false);

    return (
        <nav className="border-b border-[#F1F1F1]">
            <div className="px-4 sm:px-6 lg:px-8 bg-white">

                <div className="flex items-center justify-between h-16">


                    <div className="flex-shrink-0 flex items-center gap-x-2">
                        <Link to={"/"} className="text-xl">LOREPA</Link>
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
                                    <Link to="#" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Become a host</Link>
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

export default Navbar;