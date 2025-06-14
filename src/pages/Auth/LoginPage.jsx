import React, { useState } from 'react';
import { IoMailOutline } from "react-icons/io5";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [phone, setPhone] = useState('');
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const nav = useNavigate()
    const handleLogin = (e) => {
        e.preventDefault();
        nav("/")
    };
    return (
        <div className='min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8'>
            {/* Logo Section */}
            <div className='absolute top-8 left-8'>
                <h1 className='text-xl  text-gray-800 tracking-wider'>LOREPA</h1>
            </div>

            {/* Login Form Container */}
            <div className=' p-6 sm:p-8 md:p-10  w-full max-w-md'>
                {/* Login Title and Subtitle */}
                <h2 className='text-xl text-black mb-2'>Login Or Signup</h2>
                <p className='text-sm mb-8'>Welcome to Lorepa</p>

                {/* Login Form */}
                <form onSubmit={handleLogin} className='space-y-6'>
                    {/* Phone Number Address Input */}
                    <div>
                        <label htmlFor='phone' className='block text-sm  text-gray-700 mb-1'>
                            Phone number
                        </label>
                        <input
                            type='number'
                            id='phone'
                            name='phone'
                            autoComplete='phone'
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder='Phone number' // Placeholder as seen in the image
                            className='appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                    </div>

                    {/* Keep me signed in & Forgot password */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <input
                                id='remember-me'
                                name='remember-me'
                                type='checkbox'
                                checked={keepSignedIn}
                                onChange={(e) => setKeepSignedIn(e.target.checked)}
                                className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                            />
                            <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                                Keep me signed in
                            </label>
                        </div>

                        <div className='text-sm'>
                            <Link to={"/admin/forget"} className=' text-indigo-600 hover:text-indigo-500'>
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    {/* Login Button */}
                    <div>
                        <button
                            type='submit'
                            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                            Login
                        </button>
                    </div>
                </form>

                {/* OR separator */}
                <div className='relative mt-6 mb-6'>
                    <div className='absolute inset-0 flex items-center' aria-hidden='true'>
                        <div className='w-full border-t border-gray-300' />
                    </div>
                    <div className='relative flex justify-center text-sm'>
                        <span className='px-2 bg-white text-gray-500'>Or</span>
                    </div>
                </div>

                {/* Social Login Buttons */}
                <div className='flex justify-center space-x-4'>
                    <button
                        type='button'
                        className='inline-flex items-center justify-center p-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        aria-label='Login with Email'
                    >
                        <IoMailOutline className='h-5 w-5' />
                    </button>
                    <button
                        type='button'
                        className='inline-flex items-center justify-center p-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        aria-label='Login with Google'
                    >
                        <FaGoogle className='h-5 w-5' />
                    </button>
                    <button
                        type='button'
                        className='inline-flex items-center justify-center p-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        aria-label='Login with Facebook'
                    >
                        <FaFacebookF className='h-5 w-5' />
                    </button>
                </div>

                {/* Sign up link */}
                <div className='mt-8 text-center text-sm'>
                    <p>
                        Don't have an account?{' '}
                        <Link to={"/admin/register"} className=' text-indigo-600 hover:text-indigo-500'>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
