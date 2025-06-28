import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { dummyTrailers, guestFAQs, hostFAQs } from '../../constants/constant';
import { motion, AnimatePresence } from 'framer-motion';

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
  const nav = useNavigate();

  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1];
    if (id) {
      const foundTrailer = dummyTrailers.find(t => t.id === id);
      if (foundTrailer) setTrailer(foundTrailer);
      else setError('Trailer not found.');
    } else setError('No trailer ID provided.');
    setLoading(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading || error || !trailer) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-inter">
        <Navbar />
        <p className={error ? 'text-red-500' : ''}>
          {loading ? 'Loading trailer details...' : error || 'Select a trailer to view details.'}
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
            src={trailer.imageUrl}
            alt={trailer.title}
            className="w-full h-96 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/800x400/F3F4F6/9CA3AF?text=Image+Not+Found";
            }}
          />
        </motion.div>

        <motion.div
          className="bg-white rounded-lg p-8"
          variants={fadeVariant}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{trailer.title}</h2>

          {/* Sections */}
          {[
            {
              title: 'Basic Info',
              content: (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Trailer ID:</p>
                    <p className="text-gray-800 font-medium">{trailer.id}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Name of owner:</p>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-800 font-medium">{trailer.basicInfo.nameOfOwner}</p>
                      <img src={'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg'} alt="Owner Avatar" className="w-8 h-8 rounded-full" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600">Category:</p>
                    <p className="text-gray-800 font-medium">{trailer.basicInfo.category}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-gray-600">Detailed description:</p>
                    <p className="text-gray-800 text-sm italic mt-1">{trailer.basicInfo.detailedDescription}</p>
                  </div>
                </div>
              ),
            },
            {
              title: 'Pricing & Rental Terms',
              content: (
                <div className="space-y-2">
                  {Object.entries(trailer.pricingRentalTerms).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <p className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
                      <p className="text-gray-800 font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              title: 'Trailer Details',
              content: (
                <div className="space-y-2">
                  {Object.entries(trailer.trailerDetails).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <p className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
                      <p className="text-gray-800 font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              ),
            },
            {
              title: 'Final Details',
              content: (
                <div className="space-y-2">
                  {Object.entries(trailer.finalDetails).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <p className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</p>
                      <p className="text-gray-800 font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              ),
            },
          ].map((section, i) => (
            <motion.section
              key={i}
              className="mb-8 pb-6 border-b border-gray-200"
              custom={i + 1}
              variants={fadeVariant}
              initial="hidden"
              whileInView="visible"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">{section.title}</h3>
              {section.content}
            </motion.section>
          ))}

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
            {guestFAQs.map((faq, index) => (
              <AccordionItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>

          <motion.div layout className="w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md mt-8 md:mt-0">
            <h2 className="text-xl font-semibold mb-4">Hosts</h2>
            {hostFAQs.map((faq, index) => (
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
