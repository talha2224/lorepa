import AvatarIcon from '../../assets/dashboard/avatar.jpg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSidebar } from '../../context/SidebarContext';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { IoChevronForwardSharp } from "react-icons/io5";
import { BiSearchAlt } from 'react-icons/bi';
import avatar from '../../assets/avatar.png'
const Header = () => {
    const location = useLocation().pathname.split("/")[3]
    const { isNavOpen, toggleNav } = useSidebar();
    const [data, setData] = useState(null)
    const [currentDate, setCurrentDate] = useState('');



    return (

        <div className='w-[100%] flex justify-between items-center p-3  bg-white border-b border-b-[#E8E8E8]'>

            <div className='flex items-center gap-x-4'>
                <GiHamburgerMenu className='lg:hidden block cursor-pointer' onClick={() => toggleNav(!isNavOpen)} />
                <div className='flex items-center gap-x-2'>
                    <GoHome />
                    <IoChevronForwardSharp className='text-[#9DA0A6]' />
                    <p className=' text'>{location.charAt(0).toUpperCase() + location.slice(1)}</p>
                </div>
            </div>


            <div className='hidden sm:flex justify-between items-center gap-x-4'>
                <div className='flex items-center gap-x-2 border border-[#C3C3C3] rounded-[10px] px-3 py-2 w-[20rem]'>
                    <BiSearchAlt className='text-[#9DA0A6]' />
                    <input type="text" name="" id="" placeholder='Search here' className='text-[#9DA0A6] outline-none border-none flex-1' />
                </div>
                <Link to={"/user/dashboard/notification"}>
                    <IoMdNotificationsOutline className='w-[25px] h-[25px]' />
                </Link>
                <img src={avatar} alt="" className='w-[30px] h-[30px]' />
            </div>

        </div>

    )
}

export default Header