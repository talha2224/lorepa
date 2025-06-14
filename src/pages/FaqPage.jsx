import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Icons for accordion

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#EEEEEE] rounded-md mb-3 bg-white">
      <button className="w-full flex justify-between items-center p-4 text-left font-medium text-black" onClick={() => setIsOpen(!isOpen)}> {question} {isOpen ? <FaAngleUp /> : <FaAngleDown />}</button>
      {isOpen && ( <div className="p-4 border-t border-[#D1D5DB] text-gray-700 text-sm">{answer}</div> )}
    </div>
  );
};

const FaqPage = () => {
  const [activeTab, setActiveTab] = useState('Guests');

  const guestFAQs = [
    {
      question: "Question people asked us goes here",
      answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
    },
    {
      question: "How do I book a trailer?",
      answer: "Booking a trailer is simple! Browse our listings, select your desired dates, and follow the steps to confirm your rental.",
    },
    {
      question: "What if I need to cancel my booking?",
      answer: "You can cancel your booking for a full refund up to 24 hours before the rental starts. Please refer to our cancellation policy for more details.",
    },
    {
      question: "Is insurance included with the rental?",
      answer: "Optional insurance is available for an additional fee. We recommend reviewing our insurance options for comprehensive coverage.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept major credit cards and other secure payment methods. You can find a full list during the checkout process.",
    },
    {
      question: "Can I pick up the trailer at any time?",
      answer: "Pick-up times are arranged directly with the trailer owner. Please coordinate with them after your booking is confirmed.",
    },
  ];

  const hostFAQs = [
    {
      question: "Question people asked us goes here",
      answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
    },
    {
      question: "How can I list my trailer for rent?",
      answer: "To list your trailer, simply create an account, go to your dashboard, and use the 'Add/edit listing' feature. You'll provide details about your trailer, availability, and pricing.",
    },
    {
      question: "How do I get paid for rentals?",
      answer: "Payments are securely processed through our platform. Once a rental is completed, funds will be transferred to your designated bank account.",
    },
    {
      question: "What if my trailer gets damaged?",
      answer: "Our platform offers various protection plans. We recommend reviewing the terms and conditions of these plans to understand coverage for damages.",
    },
    {
      question: "Can I set my own rental price?",
      answer: "Yes, as a host, you have full control over your daily, weekly, and monthly rental rates. You can adjust them anytime from your dashboard.",
    },
    {
      question: "How do I communicate with renters?",
      answer: "Our platform provides an integrated messaging system that allows you to communicate directly and securely with potential and current renters.",
    },
  ];

  return (
    <div className='min-h-screen text-black'>
      <Navbar />

      <div className='p-4'>

        <h1 className='text-3xl font-bold text-center mb-3'>FAQ</h1>

        {/* Tab Navigation */}
        <div className=' mb-5'>
          <button onClick={() => setActiveTab('Guests')} className={`px-6 py-3 rounded-t-lg text-lg font-medium transition-colors duration-200 ${activeTab === 'Guests'&&'bg-white border-b-2 border-blue-600 text-blue-600'}`}>Guests</button>
          <button onClick={() => setActiveTab('Hosts')} className={`px-6 py-3 rounded-t-lg text-lg font-medium transition-colors duration-200 ${activeTab === 'Hosts'&&'bg-white border-b-2 border-blue-600 text-blue-600'}`}>Hosts</button>
        </div>

        {/* FAQ Content based on active tab */}
        <div className=''>
          {activeTab === 'Guests' && (
            <div className='space-y-4'>
              {guestFAQs.map((faq, index) => (<AccordionItem key={index} question={faq.question} answer={faq.answer} />))}
            </div>
          )}

          {activeTab === 'Hosts' && (
            <div className='space-y-4'>
              {hostFAQs.map((faq, index) => (<AccordionItem key={index} question={faq.question} answer={faq.answer} />))}
            </div>
          )}
        </div>

        <div className='text-center mt-12 p-4'>
          <p className='text-lg text-gray-700 mb-6'>Didn't find any answer to your question?</p>
          <button className='px-8 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-colors duration-200 text-sm'>Contact us</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FaqPage;
