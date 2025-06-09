import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg'
import { CiGlobe } from "react-icons/ci";
import { FaUserTie } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {

    return (
        <nav className="">
            <div className="px-4 sm:px-6 lg:px-8">

                <div className="flex items-center justify-between h-16">


                    <div className="flex-shrink-0 flex items-center gap-x-2">
                        {/* <img src={Logo} alt="" className='h-10'/> */}
                        <span className="text-xl">LOREPA</span>
                    </div>

                    <div className="block">
                        <div className="ml-4 flex items-center md:ml-6 gap-x-4">
                            <button className='border border-[#000] bg-transparent rounded-md px-3 py-2 text-sm'>Become a host</button>
                            <CiGlobe/>
                            <RxHamburgerMenu/>
                            <FaUserTie/>
                        </div>
                    </div>

                </div>
            </div>

        </nav>
    );
}

export default Navbar;