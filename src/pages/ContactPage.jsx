import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Assuming Navbar component exists
import Footer from '../components/Footer'; // Assuming Footer component exists
import { FaPhone, FaEnvelope } from 'react-icons/fa'; // Importing phone and envelope icons

const ContactPage = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Message submitted:', message);
    // In a real application, you would send this message to a backend service.
    alert('Your message has been submitted!'); // Using alert for simplicity, replace with custom modal in production
    setMessage(''); // Clear the textarea after submission
  };

  return (
    <div className='min-h-screen bg-white text-black'>

        <Navbar />

      <div className='p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]'> {/* Adjust min-h to account for Navbar/Footer */}
        <div className='w-full max-w-md text-center'>
          <h1 className='text-4xl font-medium mb-4'>Contact us</h1>
          <p className='text-lg text-gray-700 mb-8'>If you have questions or need help, just ask!</p>

          <form onSubmit={handleSubmit} className='w-full'>
            {/* Message Textarea */}
            <div className='mb-6'>
              <label htmlFor='message' className='block text-left text-lg font-medium text-gray-700 mb-2'> What can we help you with?</label>
              <textarea
                id='message'
                name='message'
                rows='6'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base'
                placeholder='Type here'
                required
              ></textarea>
            </div>

            {/* OR separator */}
            <div className='relative my-8'>
              <div className='absolute inset-0 flex items-center' aria-hidden='true'>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='px-2 bg-white text-gray-500 text-lg'>OR</span>
              </div>
            </div>

            {/* Contact Information */}
            <div className='space-y-4 mb-8'>
              <div className='flex items-center text-gray-700 text-lg'>
                <FaPhone className='mr-3' size={20} />
                <span>+1 438 282 6718</span>
              </div>
              <div className='flex items-center text-gray-700 text-lg'>
                <FaEnvelope className='mr-3' size={20} />
                <span>contact@lorepa.com</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <Footer />

    </div>
  );
};

export default ContactPage;
