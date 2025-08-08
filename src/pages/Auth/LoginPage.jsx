import React, { useState } from 'react';
import { IoMailOutline } from "react-icons/io5";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Logo from "../../assets/logo.svg";
import axios from 'axios';
import config from '../../config';
import toast from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const nav = useNavigate();

  const handleLogin = async (e) => {
    e?.preventDefault();
    try {
      const res = await axios.post(`${config.baseUrl}/account/login`, {
        email,
        password
      });

      if (res.data?.code === 200) {
        const userId = res.data.data._id;
        localStorage.setItem('userId', userId);
        toast.success("Login Successful");
        setTimeout(() => {
          if (localStorage.getItem("naviagte")) {
            nav(localStorage.getItem("naviagte"));
          }
          else {
            nav("/")
          }
        }, 2000);
      } else {
        toast.error(res.data?.msg || "Login failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };

  // Handle Google login
  const handleGoogleAuth = async (credentialResponse) => {
    try {
      let credentialDecode = jwtDecode(credentialResponse.credential);
      const googleEmail = credentialDecode.email;
      const googlePassword = credentialDecode.sub; // using sub as unique ID

      // Try to login first
      try {
        await axios.post(`${config.baseUrl}/account/login`, {
          email: googleEmail,
          password: googlePassword
        });
        toast.success("Login Successful");
        nav("/");
      } catch (err) {
        toast.error(err.response?.data?.msg || "Login failed");
      }
    } catch (err) {
      toast.error("Google Authentication Failed");
    }
  };

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='lg:absolute top-8 left-8'
      >
        <Link to={"/"} className="text-xl">
          <img src={Logo} alt="logo" className='h-[8rem]' />
        </Link>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className='p-6 sm:p-8 md:p-10 w-full max-w-md'
      >
        <motion.h2 variants={fadeInUp} className='text-xl text-black mb-2'>Login Or Signup</motion.h2>
        <motion.p variants={fadeInUp} className='text-sm mb-8'>Welcome to Lorepa</motion.p>

        <motion.form onSubmit={handleLogin} className='space-y-6' variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <label htmlFor='email' className='block text-sm text-gray-700 mb-1'>Email</label>
            <input
              type='text'
              id='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email Address'
              className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
            />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <label htmlFor='password' className='block text-sm text-gray-700 mb-1'>Password</label>
            <input
              type='password'
              id='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <button
              type='submit'
              className='w-full py-2 px-4 text-white bg-blue-600 rounded-md'
            >
              Login
            </button>
          </motion.div>
        </motion.form>

        <motion.div variants={fadeInUp} className='relative mt-6 mb-6'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white text-gray-500'>Or</span>
          </div>
        </motion.div>

        <GoogleLogin
          onSuccess={handleGoogleAuth}
          onError={() => toast.error("Google Login Failed")}
        />

        <motion.div variants={fadeInUp} className='mt-8 text-center text-sm'>
          <p>
            Don't have an account?{' '}
            <Link to={"/register"} className='text-blue-600 hover:text-blue-500'>
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
