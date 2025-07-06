import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Logo from "../../assets/logo.svg";
import axios from 'axios';
import config from '../../config';
import toast from 'react-hot-toast';

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

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('renter');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.baseUrl}/account/register`, {
        name,
        phone,
        email,
        password,
        role
      });

      if (res.data?.status === 200) {
        const userId = res.data.data._id;
        localStorage.setItem('userId', userId);
        toast.success("Account created successfully!");
        setTimeout(() => {
          nav("/");
        }, 2000);
      } else {
        toast.error(res.data?.msg || "Registration failed");
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className='min-h-screen bg-white flex flex-col items-center justify-center p-4 relative'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='lg:absolute -top-4 left-8'
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
        <motion.h2 variants={fadeInUp} className='text-xl text-black mb-2'>Register</motion.h2>
        <motion.p variants={fadeInUp} className='text-sm mb-8'>Welcome to Lorepa</motion.p>

        <motion.form onSubmit={handleRegister} className='space-y-6' variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <label className='block text-sm text-gray-700 mb-1'>Full Name</label>
            <input
              type='text'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='John Doe'
              className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label className='block text-sm text-gray-700 mb-1'>Phone Number</label>
            <input
              type='tel'
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder='0300-XXXXXXX'
              className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label className='block text-sm text-gray-700 mb-1'>Email</label>
            <input
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email Address'
              className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label className='block text-sm text-gray-700 mb-1'>Password</label>
            <input
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm'
            />
          </motion.div>

          <motion.div variants={fadeInUp}>
            <label className='block text-sm text-gray-700 mb-1'>Role</label>
            <select
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white'
            >
              <option value='renter'>Renter</option>
              <option value='owner'>Owner</option>
            </select>
          </motion.div>


          <motion.div variants={fadeInUp}>
            <button type='submit' className='w-full py-2 px-4 text-white bg-blue-600 rounded-md'>
              Register
            </button>
          </motion.div>
        </motion.form>

        <motion.div variants={fadeInUp} className='mt-8 text-center text-sm'>
          <p>
            Already have an account?{' '}
            <Link to={"/login"} className='text-blue-600 hover:text-blue-500'>
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
