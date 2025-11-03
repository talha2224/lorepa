import React, { useEffect, useRef } from 'react';
import { userNav } from '../../../constants/sidebarData';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '../../../context/SidebarContext';
import Logo from '../../../assets/lorepa.png'

const Sidebar = () => {

  const location = useLocation().pathname.split("/")[3];
  const { isNavOpen, toggleNav } = useSidebar();
  const sidebarRef = useRef(null);
  const nav = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleNav();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleNav]);






  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`lg:block hidden w-[15rem] h-[100vh] bg-[#2563EB] relative border-r border-r-[#E4E7EC]`}>

        <div className="p-5 border-b border-[#E9EFFD99]">
          <img src={Logo} alt="" className='h-10' />
        </div>

        <div className='mt-10 border-b border-[#E9EFFD99] pb-3'>
          <p className='text-white mb-2 px-7'>MENU</p>
          {userNav?.map((i) => (
            <Link to={`/user/dashboard/${i.link}`} key={i.id} className={`flex ${location == i.link && "bg-[#F5F6F6]"} mx-5 rounded-sm p-2  items-center gap-x-3 mb-2 cursor-pointer ${location == i.link ? "text-[#324B50]" : "text-[#8F8F8F]"}`}>
              <div className={`${location == i.link ? "text-[#2563EB]" : "text-white"}`}>{i.icon}</div>
              <p className={`${location == i.link ? "text-[#0A0F18]" : "text-white"} text-sm`}>{i.name}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {
        isNavOpen && (
          <div className={`lg:hidden block w-[14rem] z-50 h-[100vh] border-r border-r-[#E4E7EC] bg-[#2563EB] fixed top-0 left-0 transition-all duration-300 ease-in-out ${isNavOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}`} ref={sidebarRef}>

            <div className="p-5 border-b border-[#E9EFFD99]">
              <img src={Logo} alt="" className='h-10' />
            </div>

            <div className='mt-10 border-b border-[#E9EFFD99] pb-3'>
              <p className='text-white mb-2 px-7'>MENU</p>
              {userNav?.map((i) => (
                <Link to={`/user/dashboard/${i.link}`} key={i.id} className={`flex ${location == i.link && "bg-[#F5F6F6]"} mx-5 rounded-sm p-2  items-center gap-x-3 mb-2 cursor-pointer ${location == i.link ? "text-[#324B50]" : "text-[#8F8F8F]"}`}>
                  <div className={`${location == i.link ? "text-[#2563EB]" : "text-white"}`}>{i.icon}</div>
                  <p className={`${location == i.link ? "text-[#0A0F18]" : "text-white"} text-sm`}>{i.name}</p>
                </Link>
              ))}
            </div>

          </div>
        )}
    </>
  );
};

export default Sidebar;
