import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CiGlobe } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../assets/logo.svg";

const Navbar = () => {
    const [showLanguages, setShowLanguages] = useState(false);
    const [showNav, setshowNav] = useState(false);
    const [language, setLanguage] = useState("en"); // default language
    const isLogin = localStorage.getItem("userId");

    useEffect(() => {
        const storedLang = localStorage.getItem("lang");
        if (storedLang) {
            setLanguage(storedLang);
        }
    }, []);

    const handleLanguageChange = (langSymbol) => {
        setLanguage(langSymbol);
        localStorage.setItem("lang", langSymbol);
        setShowLanguages(false);
        // Optionally reload or update UI
        window.location.reload();
    };

    return (
        <nav className="border-b border-[#F1F1F1]">
            <div className="px-4 sm:px-6 lg:px-8 bg-white">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center gap-x-2">
                        <Link to={"/"} className="text-xl">
                            <img src={Logo} alt="" className='h-[8rem]' />
                        </Link>
                    </div>

                    <div className="block relative">
                        <div className="ml-4 flex items-center md:ml-6 gap-x-4">
                            <CiGlobe className='cursor-pointer' onClick={() => setShowLanguages(!showLanguages)} />

                            <div className="flex items-center gap-x-2 bg-[#F1F1F1] rounded-md p-2">
                                <RxHamburgerMenu onClick={() => setshowNav(!showNav)} className='cursor-pointer' />
                                {isLogin && (<FaRegUserCircle className='cursor-pointer' />)}
                            </div>
                        </div>

                        {showLanguages && (
                            <div className='absolute z-10 right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg'>
                                <div className='py-1'>
                                    <p onClick={() => handleLanguageChange("en")} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>English</p>
                                    <p onClick={() => handleLanguageChange("es")} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Spanish</p>
                                    <p onClick={() => handleLanguageChange("cn")} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Chinese</p>
                                    <p onClick={() => handleLanguageChange("fr")} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>French</p>
                                </div>
                            </div>
                        )}

                        {showNav && (
                            <div className='absolute z-10 right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg'>
                                <div className='py-1'>
                                    {!isLogin && (<Link to="/login" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Login</Link>)}
                                    {!isLogin && (<Link to="/register" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Signup</Link>)}
                                    {isLogin && (<p onClick={() => { localStorage.removeItem("userId"); window.location.reload(); }} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Logout</p>)}
                                    {isLogin && <Link to="/host" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Become a host</Link>}
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
};

export default Navbar;
