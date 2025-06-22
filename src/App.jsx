
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import LoaderGif from './assets/loader.gif';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Auth/LoginPage';
import VerifyPage from './pages/Auth/VerifyPage';
import AdminHomePage from './pages/Admin/Dashboard/AdminHomePage';
import AdminUserPage from './pages/Admin/Dashboard/AdminUserPage';
import AdminLogin from './pages/Admin/Auth/AdminLogin';
import AdminRegister from './pages/Admin/Auth/AdminRegister';
import AdminForget from './pages/Admin/Auth/AdminForget';
import AdminListingPage from './pages/Admin/Dashboard/AdminListingPage';
import AdminListingDetailPage from './pages/Admin/Dashboard/AdminListingDetailPage';
import AdminBookingPage from './pages/Admin/Dashboard/AdminBookingPage';
import AdminUserDetailPage from './pages/Admin/Dashboard/AdminUserDetailPage';
import AdminSettingsPage from './pages/Admin/Dashboard/AdminSettingsPage';
import WhoPage from './pages/WhoPage';
import FaqPage from './pages/FaqPage';
import CalculatorPage from './pages/CalculatorPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import BecomeHostPage from './pages/BecomeHostPage';
import BookingPage from './pages/BookingPage';
import ListTrailer from './pages/ListTrailer';
import TrailersLisitng from './pages/TrailersLisitng';
import SingleTrailer from './pages/SingleTrailer';
import AOS from 'aos';
import 'aos/dist/aos.css';
const RegisterPage = lazy(() => import('./pages/Auth/RegisterPage'));
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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay:2000,
      once: false,
    });
    AOS.refresh(); // <-- IMPORTANT
  }, []);
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
            <Route path='/who' element={<WhoPage />} />
            <Route path='/faq' element={<FaqPage />} />
            <Route path='/calculator' element={<CalculatorPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/privacy' element={<PrivacyPage />} />
            <Route path='/terms' element={<TermsPage />} />
            <Route path='/host' element={<BecomeHostPage />} />
            <Route path='/list' element={<ListTrailer />} />
            <Route path='/booking' element={<BookingPage />} />
            <Route path='/trailers' element={<TrailersLisitng />} />
            <Route path='/trailers/:id' element={<SingleTrailer />} />

            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/verify' element={<VerifyPage />} />




          </Routes>
        </SuspenseWithDelay>
      </BrowserRouter>
    </>
  );
}

export default App;
