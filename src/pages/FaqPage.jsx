import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="border border-[#EEEEEE] rounded-md mb-3 bg-white overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left font-medium text-black"
      >
        {question}
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-4 pb-4 text-gray-700 text-sm"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FaqPage = () => {
  const [activeTab, setActiveTab] = useState('Guests');

  const guestFAQs = [
    {
      question: "Question people asked us goes here",
      answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid...",
    },
    {
      question: "How do I book a trailer?",
      answer: "Booking a trailer is simple! Browse our listings, select your desired dates...",
    },
    {
      question: "What if I need to cancel my booking?",
      answer: "You can cancel your booking for a full refund up to 24 hours before it starts...",
    },
    {
      question: "Is insurance included with the rental?",
      answer: "Optional insurance is available for an additional fee...",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept major credit cards and secure payment methods...",
    },
    {
      question: "Can I pick up the trailer at any time?",
      answer: "Pick-up times are arranged directly with the trailer owner after booking.",
    },
  ];

  const hostFAQs = [
    {
      question: "Question people asked us goes here",
      answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid...",
    },
    {
      question: "How can I list my trailer for rent?",
      answer: "Create an account, go to your dashboard, and use the 'Add listing' feature.",
    },
    {
      question: "How do I get paid for rentals?",
      answer: "Once a rental completes, funds are transferred to your bank securely.",
    },
    {
      question: "What if my trailer gets damaged?",
      answer: "Our protection plans cover a variety of damage cases—check terms for full coverage.",
    },
    {
      question: "Can I set my own rental price?",
      answer: "Yes, you have full control over your pricing.",
    },
    {
      question: "How do I communicate with renters?",
      answer: "We provide an in-app messaging system to chat with renters directly.",
    },
  ];

  const currentFAQs = activeTab === 'Guests' ? guestFAQs : hostFAQs;

  return (
    <div className="min-h-screen text-black bg-[#F9FAFB]">
      <Navbar />

      <div className="p-4">
        {/* Title */}
        <motion.h1
          className="text-3xl font-bold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          FAQ
        </motion.h1>

        {/* Tabs */}
        <div className="mb-6 text-center">
          <button
            onClick={() => setActiveTab('Guests')}
            className={`px-6 py-3 rounded-t-lg text-lg font-medium transition-colors duration-200 ${activeTab === 'Guests' && 'bg-white border-b-2 border-blue-600 text-blue-600'
              }`}
          >
            Guests
          </button>
          <button
            onClick={() => setActiveTab('Hosts')}
            className={`px-6 py-3 rounded-t-lg text-lg font-medium transition-colors duration-200 ${activeTab === 'Hosts' && 'bg-white border-b-2 border-blue-600 text-blue-600'
              }`}
          >
            Hosts
          </button>
        </div>

        {/* Accordion Content */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {currentFAQs.map((faq, i) => (
            <motion.div key={i} custom={i} variants={fadeInUp}>
              <AccordionItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 p-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-700 mb-6">Didn't find any answer to your question?</p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200 text-sm">
            Contact us
          </button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default FaqPage;
