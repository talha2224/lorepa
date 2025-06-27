import React, { useState } from 'react';
import { IoMailOutline } from "react-icons/io5";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Logo from "../../assets/logo.svg";

// Animation Variants
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
  const [phone, setPhone] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const nav = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    nav("/");
  };

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative'>
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='absolute top-8 left-8'
      >
        <Link to={"/"} className="text-xl">
          <img src={Logo} alt="logo" className='h-[8rem]' />
        </Link>
      </motion.div>

      {/* Login Form Container */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className='p-6 sm:p-8 md:p-10 w-full max-w-md'
      >
        {/* Titles */}
        <motion.h2 variants={fadeInUp} className='text-xl text-black mb-2'>Login Or Signup</motion.h2>
        <motion.p variants={fadeInUp} className='text-sm mb-8'>Welcome to Lorepa</motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleLogin}
          className='space-y-6'
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Phone Input */}
          <motion.div variants={fadeInUp}>
            <label htmlFor='phone' className='block text-sm text-gray-700 mb-1'>Phone number</label>
            <input
              type='number'
              id='phone'
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='Phone number'
              className='appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
            />
          </motion.div>

          {/* Remember Me */}
          <motion.div variants={fadeInUp} className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input
                id='remember-me'
                type='checkbox'
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className='h-4 w-4 text-blue-600 border-gray-300 rounded'
              />
              <label htmlFor='remember-me' className='ml-2 text-sm text-gray-900'>
                Keep me signed in
              </label>
            </div>
            <Link to={"/admin/forget"} className='text-sm text-blue-600 hover:text-blue-500'>
              Forgot password?
            </Link>
          </motion.div>

          {/* Login Button */}
          <motion.div variants={fadeInUp}>
            <button
              type='submit'
              className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Login
            </button>
          </motion.div>
        </motion.form>

        {/* OR separator */}
        <motion.div variants={fadeInUp} className='relative mt-6 mb-6'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-gray-300' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-white text-gray-500'>Or</span>
          </div>
        </motion.div>

        {/* Social Buttons */}
        <motion.div
          className='flex justify-center space-x-4'
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {[IoMailOutline, FaGoogle, FaFacebookF].map((Icon, idx) => (
            <motion.button
              key={idx}
              type='button'
              variants={fadeInUp}
              className='p-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50'
            >
              <Icon className='h-5 w-5' />
            </motion.button>
          ))}
        </motion.div>

        {/* Sign Up Link */}
        <motion.div variants={fadeInUp} className='mt-8 text-center text-sm'>
          <p>
            Don't have an account?{' '}
            <Link to={"/admin/register"} className='text-blue-600 hover:text-blue-500'>
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
