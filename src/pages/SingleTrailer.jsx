import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import config from '../config';

const fadeVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div layout className="rounded-md mb-3 bg-white shadow-sm overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 text-left font-medium text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-4 border-t border-gray-300 text-gray-700"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SingleTrailer = () => {
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [faqGuest, setFaqGuest] = useState([]);
  const [faqHost, setFaqHost] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchTrailer = async () => {
      const id = window.location.pathname.split('/').pop();
      try {
        const res = await axios.get(`${config.baseUrl}/trailer/single/${id}`);
        setTrailer(res.data.data);
      } catch (err) {
        setError("Failed to fetch trailer details");
      } finally {
        setLoading(false);
      }
    };
    fetchTrailer();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(`${config.baseUrl}/content/faq`);
        setFaqGuest(data.data.filter(item => item.type === "guest"));
        setFaqHost(data.data.filter(item => item.type === "host"));
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };
    fetchContent();
  }, []);

  if (loading || error || !trailer) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-inter">
        <Navbar />
        <p className={error ? 'text-red-500' : ''}>
          {loading ? 'Loading trailer details...' : error || 'Trailer not found.'}
        </p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-inter">
      <Navbar />

      <main className="flex-1 p-6 md:p-8 lg:p-10">
        <motion.div
          className="mb-8 rounded-lg overflow-hidden shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={trailer.images?.[0] || 'https://placehold.co/800x400/F3F4F6/9CA3AF?text=No+Image'}
            alt={trailer.title}
            className="w-full h-96 object-cover"
          />
        </motion.div>

        <motion.div
          className="bg-white rounded-lg p-8"
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{trailer.title}</h2>

          {/* Trailer Info */}
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-600">Category:</p>
              <p className="text-gray-800">{trailer.category}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Make | Model:</p>
              <p className="text-gray-800">{trailer.make} | {trailer.model}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Year | Sleeps | Length:</p>
              <p className="text-gray-800">{trailer.year} | {trailer.sleeps} | {trailer.length} ft</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Description:</p>
              <p className="text-gray-700">{trailer.description}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Location:</p>
              <p className="text-gray-800">{trailer.city}, {trailer.state}, {trailer.zip}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Owner:</p>
              <p className="text-gray-800">{trailer.userId?.email || "N/A"}</p>
            </div>
          </div>

          {/* Pricing Section */}
          <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">Pricing & Rental Terms</h3>
          <div>
            <p className='mb-2'><strong>Daily:</strong> ${trailer.dailyRate}</p>
            <p className='mb-2'><strong>Weekly:</strong> ${trailer.weeklyRate}</p>
            <p className='mb-2'><strong>Monthly:</strong> ${trailer.monthlyRate}</p>
            <p className='mb-2'><strong>Cleaning Fee:</strong> ${trailer.cleaningRate}</p>
            <p className='mb-2'><strong>Security Deposit:</strong> ${trailer.securityRate}</p>
            <p className='mb-2'><strong>Insurance Deductible:</strong> ${trailer.insuranceDeductible}</p>
          </div>

          <motion.div
            className="mt-8 flex justify-end space-x-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <button
              onClick={() => nav('/compare')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-md shadow-lg transition duration-200"
            >
              Chat with owner
            </button>
            <button
              onClick={() => nav('/booking')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md shadow-lg transition duration-200"
            >
              Rent this trailer
            </button>
          </motion.div>
        </motion.div>
      </main>

      {/* FAQs */}
      <motion.div
        className="px-10 py-5 text-black"
        variants={fadeVariant}
        initial="hidden"
        whileInView="visible">
        <div className="flex justify-between items-center mt-10 w-full flex-wrap text-black">
          <h1 className="text-lg sm:text-2xl font-semibold mt-2">Frequently asked questions</h1>
          <button className="px-3 py-2 mt-2 rounded-md bg-[#2563EB] text-white text-xs">See all FAQ</button>
        </div>

        <div className="flex flex-wrap justify-between gap-x-5 mt-8">
          <motion.div layout className="w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Guests</h2>
            {faqGuest.map((faq, index) => (
              <AccordionItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>

          <motion.div layout className="w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md mt-8 md:mt-0">
            <h2 className="text-xl font-semibold mb-4">Hosts</h2>
            {faqHost.map((faq, index) => (
              <AccordionItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default SingleTrailer;
