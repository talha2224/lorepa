import Sidebar from './sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import Header from './Header'
const Layout = () => {


  return (

    <div className='flex items-start bg-[#fff] w-screen h-screen'>
      <Sidebar />

      <div className='flex-1 h-[100vh] overflow-y-scroll bg-[#F9FAFB] '>
        <Header />
        <div className='p-5 flex-1 overflow-x-auto overflow-y-hidden'>
          <Outlet />
        </div>
      </div>
    </div>

  )
}

export default Layout