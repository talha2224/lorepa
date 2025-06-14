import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhoImage from '../assets/landing/who.png'
import Image from '../assets/landing/image.png'
import { FaInfoCircle, FaRegQuestionCircle, FaRegTimesCircle } from 'react-icons/fa'
import { TbMoneybag } from "react-icons/tb";
import { MdOutlineCancel } from 'react-icons/md'


const WhoPage = () => {
    return (
        <div className=' text-black'>
            <Navbar />

            <div className='flex justify-between items-start gap-x-10 flex-wrap p-5'>

                <div className='mt-2 flex-1'>
                    <h1 className='text-3xl mb-3'>Who are we</h1>
                    <p className='text-xs mt-2'>The leading peer-to-peer trailer rental marketplace in Quebec. We connect trailer owners with individuals looking to rent trailers on a safe, secure, and user-friendly platform designed to simplify trailer rentals.</p>
                    <p className='text-xs mt-2'>We are a trusted trailer rental platform From construction entrepreneurs to landscaping professionals, farmers, and more, many people search for trailers to rent without access to a reliable platform to meet their needs. Meanwhile, hundreds of unused trailers remain parked across the province. The demand for such equipment is constant, and supply is widely available, but no service efficiently connects renters with trailer owners.</p>
                    <p className='text-xs mt-2'>That's why Lorepa was created: to bridge this gap by offering a simple, advantageous solution. Our platform allows trailer owners to generate passive income by making their equipment available to businesses or individuals. Until now, many owners hesitated to rent out their trailers due to the complications it could represent. On the other hand, renters are often limited by traditional rental agencies, whose hours, high fees, and restricted inventory don't always meet their expectations.</p>
                </div>
                <img src={WhoImage} alt="Who we are" className='mt-2' />

            </div>

            <h1 className='text-3xl mb-10 text-center'>Why Lorepa</h1>

            <div className='flex flex-col md:flex-row items-center justify-center p-5'>
                <div className='flex-1 flex flex-col items-center md:items-start md:pl-10'>

                    <div className='mb-8 max-w-sm'>
                        <TbMoneybag className='text-[#2563EB] mb-2' />
                        <h2 className='text-lg font-medium mb-2'>Easy and Profitable:Rent your trailers to others</h2>
                        <p className='text-sm text-gray-700'>Join us and contribute to secure a rental community.</p>
                    </div>

                    <div className='max-w-sm'>
                        <MdOutlineCancel  className='text-[#2563EB] mb-2' />
                        <h2 className='text-lg font-medium mb-2'>Free Cancellation</h2>
                        <p className='text-sm text-gray-700'>Cancel for a full refund up to 24 hours before the rental starts. Life happens, and flexibility matters.</p>
                    </div>

                </div>

                <div className='flex-shrink-0 mb-8 md:mb-0'>
                    <img src={Image} alt="Why Lorepa" className='my-10 max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg' />
                </div>

                <div className='flex-1 flex flex-col items-center md:items-start text-left md:pl-10'>

                    <div className='mb-8 max-w-sm'>
                        <TbMoneybag className='text-[#2563EB] mb-2' />
                        <h2 className='text-lg font-medium mb-2'>Earn money when not using the trailer</h2>
                        <p className='text-sm text-gray-700'>Offer a solution to local people while increasing your revenue.</p>
                    </div>
                    <div className='max-w-sm'>
                        <FaRegQuestionCircle  className='text-[#2563EB] mb-2' />
                        <h2 className='text-lg font-medium mb-2'>Our support team is just a message away</h2>
                        <p className='text-sm text-gray-700'>Chat with us for fear and personalized assistance.</p>
                    </div>
                </div>
            </div>

            {/* Buttons Section */}
            <div className='flex justify-center space-x-4 my-10'>
                <button className='px-6 py-3 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100'>
                    Rent a trailer
                </button>
                <button className='px-6 py-3 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100'>
                    Become a host
                </button>
            </div>

            <Footer />
        </div>
    )
}

export default WhoPage;