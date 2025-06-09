
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import LoaderGif from './assets/loader.gif';
import ProfilePage from './pages/Dashboard/ProfilePage';
import HotlinePage from './pages/Dashboard/HotlinePage';
import SendPage from './pages/Dashboard/SendPage';
import SettingsPage from './pages/Dashboard/SettingsPage';
import LandingPage from './pages/LandingPage';
import WalletHistoryPage from './pages/Dashboard/WalletHistoryPage';
import LoginPage from './pages/Auth/LoginPage';
import VerifyPage from './pages/Auth/VerifyPage';
import AdminHomePage from './pages/Admin/Dashboard/AdminHomePage';
import AdminTransactionage from './pages/Admin/Dashboard/AdminTransactionage';
import AdminUserPage from './pages/Admin/Dashboard/AdminUserPage';
import AdminLogin from './pages/Admin/Auth/AdminLogin';
import AdminRegister from './pages/Admin/Auth/AdminRegister';
import AdminForget from './pages/Admin/Auth/AdminForget';
import AdminListingPage from './pages/Admin/Dashboard/AdminListingPage';
import AdminListingDetailPage from './pages/Admin/Dashboard/AdminListingDetailPage';
import AdminBookingPage from './pages/Admin/Dashboard/AdminBookingPage';
import AdminUserDetailPage from './pages/Admin/Dashboard/AdminUserDetailPage';
import AdminSettingsPage from './pages/Admin/Dashboard/AdminSettingsPage';

const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
const Layout = lazy(() => import('./components/dashboard/Layout'));
const HomePage = lazy(() => import('./pages/Dashboard/HomePage'));
const AdminLayout = lazy(() => import('./components/admin/Layout'));


function SuspenseWithDelay({ children, fallback, delay = 0, minDisplayTime = 2000 }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), minDisplayTime);
    return () => clearTimeout(timer);
  }, [minDisplayTime]);

  return isLoading ? (
    <div className="flex justify-center items-center w-screen h-screen">
      <img src={LoaderGif} alt="Loading..." className="h-[6rem]" />
    </div>
  ) : (
    <Suspense fallback={fallback}>{children}</Suspense>
  );
}

function App() {

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <SuspenseWithDelay fallback={<div className="flex justify-center items-center w-screen h-screen"><img src={LoaderGif} alt="HopOn Dashboard- Loader" className="h-[6rem]" /></div>} minDisplayTime={2000}>

          <Routes>

            <Route path='/admin/'>
              <Route path='login' element={<AdminLogin />} />
              <Route path='register' element={<AdminRegister />} />
              <Route path='forget' element={<AdminForget />} />
            </Route>

            <Route path="/admin/dashboard/" element={<AdminLayout />}>
              <Route path="home" element={<AdminHomePage />} />
              <Route path="listing" element={<AdminListingPage />} />
              <Route path="listing/:id" element={<AdminListingDetailPage />} />
              <Route path="booking" element={<AdminBookingPage />} />
              <Route path="user" element={<AdminUserPage />} />
              <Route path="user/:id" element={<AdminUserDetailPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>


            <Route path='/' element={<LandingPage />} />

            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/verify' element={<VerifyPage />} />



            <Route path="/dashboard/" element={<Layout />}>
              <Route path="home" element={<HomePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="hotline" element={<HotlinePage />} />
              <Route path="send" element={<SendPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="wallet" element={<WalletHistoryPage />} />
            </Route>


          </Routes>
        </SuspenseWithDelay>
      </BrowserRouter>
    </>
  );
}

export default App;
