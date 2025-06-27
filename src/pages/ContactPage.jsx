import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
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
    transition: { duration: 0.8 },
  },
};

const ContactPage = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message submitted:', message);
    alert('Your message has been submitted!');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <Navbar />

      <motion.div
        className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <motion.div
          className="w-full max-w-md text-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h1 className="text-4xl font-medium mb-4" variants={fadeInUp}>
            Contact us
          </motion.h1>
          <motion.p className="text-lg text-gray-700 mb-8" variants={fadeInUp}>
            If you have questions or need help, just ask!
          </motion.p>

          <form onSubmit={handleSubmit} className="w-full">
            {/* Message Textarea */}
            <motion.div className="mb-6" variants={fadeInUp}>
              <label
                htmlFor="message"
                className="block text-left text-lg font-medium text-gray-700 mb-2"
              >
                What can we help you with?
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                placeholder="Type here"
                required
              ></textarea>
            </motion.div>

            {/* OR separator */}
            <motion.div className="relative my-8" variants={fadeInUp}>
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500 text-lg">OR</span>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div className="space-y-4 mb-8" variants={fadeInUp}>
              <div className="flex items-center text-gray-700 text-lg">
                <FaPhone className="mr-3" size={20} />
                <span>+1 438 282 6718</span>
              </div>
              <div className="flex items-center text-gray-700 text-lg">
                <FaEnvelope className="mr-3" size={20} />
                <span>contact@lorepa.com</span>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              variants={fadeInUp}
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

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

export default ContactPage;
