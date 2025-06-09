import AvatarIcon from '../../assets/dashboard/avatar.jpg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useSidebar } from '../../context/SidebarContext';
import { IoNotificationsOutline } from "react-icons/io5";


let face = "https://images.unsplash.com/photo-1624395213043-fa2e123b2656?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D"
const Header = ({ location }) => {
    const { isNavOpen, toggleNav } = useSidebar();


    return (

        <div className='w-[100%] flex justify-between items-center p-5 px-3  bg-white'>

            <div className='flex items-center gap-x-4'>
                <GiHamburgerMenu className='lg:hidden block cursor-pointer' onClick={() => toggleNav(!isNavOpen)} />
                <h1 className='capitalize font-medium'>{location == "home" ? "Dashboard" : location}</h1>
            </div>

            <div className='flex items-center gap-x-4'>
                <IoNotificationsOutline className='text-2xl cursor-pointer'/>
                <img src={face} alt="" className='w-[2rem] h-[2rem] rounded-full bg-center cursor-pointer' />
            </div>


        </div>

    )
}

export default Header