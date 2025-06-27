import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhoImage from '../assets/landing/who.png';
import Image from '../assets/landing/image.png';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { TbMoneybag } from "react-icons/tb";
import { MdOutlineCancel } from 'react-icons/md';
import { motion } from 'framer-motion';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const zoomBounce = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', bounce: 0.4, duration: 0.8 },
  },
};

const WhoPage = () => {
  return (
    <div className="text-black overflow-x-hidden">
      <Navbar />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        viewport={{ once: false, amount: 0.3 }}
        className="flex justify-between items-start gap-x-10 flex-wrap p-5"
      >
        <div className="mt-2 flex-1">
          <motion.h1 className="text-3xl mb-3" variants={fadeInUp}>
            Who are we
          </motion.h1>
          {[
            "The leading peer-to-peer trailer rental marketplace in Quebec. We connect trailer owners with individuals looking to rent trailers on a safe, secure, and user-friendly platform designed to simplify trailer rentals.",
            "We are a trusted trailer rental platform. From construction entrepreneurs to landscaping professionals, farmers, and more, many people search for trailers to rent without access to a reliable platform to meet their needs...",
            "That's why Lorepa was created: to bridge this gap by offering a simple, advantageous solution...",
          ].map((text, index) => (
            <motion.p
              key={index}
              className="text-xs mt-2"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        <motion.img
          src={WhoImage}
          alt="Who we are"
          className="mt-2"
          variants={zoomBounce}
          initial="hidden"
          animate="visible"
          viewport={{ once: false, amount: 0.3 }}
        />
      </motion.div>

      <motion.h1
        className="text-3xl mb-10 text-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        Why Lorepa
      </motion.h1>

      <div className="flex flex-col md:flex-row items-center justify-center p-5">
        {/* Left Column */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start md:pl-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="mb-8 max-w-sm">
            <TbMoneybag className="text-[#2563EB] mb-2" size={24} />
            <h2 className="text-lg font-medium mb-2">
              Easy and Profitable: Rent your trailers to others
            </h2>
            <p className="text-sm text-gray-700">
              Join us and contribute to secure a rental community.
            </p>
          </div>

          <div className="max-w-sm">
            <MdOutlineCancel className="text-[#2563EB] mb-2" size={24} />
            <h2 className="text-lg font-medium mb-2">Free Cancellation</h2>
            <p className="text-sm text-gray-700">
              Cancel for a full refund up to 24 hours before the rental starts.
            </p>
          </div>
        </motion.div>

        {/* Image Middle */}
        <motion.div
          className="flex-shrink-0 mb-8 md:mb-0"
          variants={zoomBounce}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <img
            src={Image}
            alt="Why Lorepa"
            className="my-10 max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Right Column */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-left md:pl-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="mb-8 max-w-sm">
            <TbMoneybag className="text-[#2563EB] mb-2" size={24} />
            <h2 className="text-lg font-medium mb-2">
              Earn money when not using the trailer
            </h2>
            <p className="text-sm text-gray-700">
              Offer a solution to local people while increasing your revenue.
            </p>
          </div>
          <div className="max-w-sm">
            <FaRegQuestionCircle className="text-[#2563EB] mb-2" size={24} />
            <h2 className="text-lg font-medium mb-2">
              Our support team is just a message away
            </h2>
            <p className="text-sm text-gray-700">
              Chat with us for fear and personalized assistance.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Buttons Section */}
      <motion.div
        className="flex justify-center space-x-4 my-10"
        variants={zoomBounce}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <button className="px-6 py-3 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100">
          Rent a trailer
        </button>
        <button className="px-6 py-3 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100">
          Become a host
        </button>
      </motion.div>

      {/* Animate Footer Safely */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default WhoPage;
