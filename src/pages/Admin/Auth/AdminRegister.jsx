import React, { useState } from 'react';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { IoMailOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const AdminRegister = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log('Sign Up attempt with:', {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            confirmPassword,
        });
        if (password !== confirmPassword) {
            console.error("Passwords do not match!");
            return;
        }
    };

    return (

        <div className='min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8'>

            <div className='absolute top-8 left-8'>
                <h1 className='text-xl  text-gray-800 tracking-wider'>LOREPA</h1>
            </div>

            <div className='bg-white p-6 sm:p-8 md:p-10 w-full max-w-md'>

                <h2 className='text-3xl  text-gray-900 text-center mb-2'>Sign up</h2>
                <p className='text-gray-500 text-center mb-8'>Welcome back, provide your details</p>

                <form onSubmit={handleSignUp} className='space-y-6'>

                    <div>
                        <label htmlFor='firstName' className='block text-sm  text-gray-700 mb-1'>
                            First name
                        </label>
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            autoComplete='given-name'
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder='First name'
                            className='appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                    </div>

                    {/* Last Name Input */}
                    <div>
                        <label htmlFor='lastName' className='block text-sm  text-gray-700 mb-1'>
                            Last name
                        </label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            autoComplete='family-name'
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Last name'
                            className='appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                    </div>

                    {/* Email Address Input */}
                    <div>
                        <label htmlFor='email' className='block text-sm  text-gray-700 mb-1'>
                            Email address
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            autoComplete='email'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email address'
                            className='appearance-none block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                        />
                    </div>

                    {/* Phone Number Input (Simplified for UI purposes) */}
                    <div>
                        <label htmlFor='phoneNumber' className='block text-sm  text-gray-700 mb-1'>
                            Phone number
                        </label>
                        <div className='mt-1 flex rounded-md shadow-sm'>
                            {/* This could be a more complex dropdown for country codes in a real app */}
                            <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm'>
                                NG (+234)
                            </span>
                            <input
                                type='tel'
                                id='phoneNumber'
                                name='phoneNumber'
                                autoComplete='tel'
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder='000-000-000'
                                className='flex-1 block w-full rounded-none rounded-r-md px-4 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor='password' className='block text-sm  text-gray-700 mb-1'>
                            Password
                        </label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id='password'
                                name='password'
                                autoComplete='new-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                className='appearance-none block w-full pr-10 px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            />
                            <div
                                className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5 text-gray-400' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-2.665m0 0L22 22M2.923 2.923L2.923 2.923M5.118 5.118A9.955 9.955 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.707 5.923M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5 text-gray-400' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label htmlFor='confirmPassword' className='block text-sm  text-gray-700 mb-1'>
                            Confirm password
                        </label>
                        <div className='mt-1 relative rounded-md shadow-sm'>
                            <input
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                id='confirmPassword'
                                name='confirmPassword'
                                autoComplete='new-password'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Password'
                                className='appearance-none block w-full pr-10 px-4 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                            />
                            <div
                                className='absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer'
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {confirmPasswordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5 text-gray-400' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-2.665m0 0L22 22M2.923 2.923L2.923 2.923M5.118 5.118A9.955 9.955 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.707 5.923M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5 text-gray-400' fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <div>
                        <button
                            type='submit'
                            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm  text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                            Sign up
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

                {/* Social Sign Up Buttons */}
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

                {/* Login link */}
                <div className='mt-8 text-center text-sm'>
                    <p>
                        Already have an account?{' '}
                        <Link to={"/admin/login"} className=' text-blue-600 hover:text-blue-500'>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminRegister;
