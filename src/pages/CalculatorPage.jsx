import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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

const CalculatorPage = () => {
  const [selectedTrailer, setSelectedTrailer] = useState('trailer-utility');
  const [daysRented, setDaysRented] = useState(1);
  const [strapsSelected, setStrapsSelected] = useState(false);
  const [dollySelected, setDollySelected] = useState(false);

  const [trailerBaseValue, setTrailerBaseValue] = useState(0);
  const [accessoriesCost, setAccessoriesCost] = useState(0);
  const [rentalIncome, setRentalIncome] = useState(0);

  const trailerOptions = [
    { id: 'trailer-utility', name: 'Utility Trailer 6x10', dailyRate: 50 },
    { id: 'trailer-enclosed', name: 'Enclosed Trailer 7x14', dailyRate: 75 },
    { id: 'trailer-car-hauler', name: 'Car Hauler 18ft', dailyRate: 100 },
    { id: 'trailer-dump', name: 'Dump Trailer', dailyRate: 120 },
  ];

  const ACCESSORY_STRAPS_COST = 10;
  const ACCESSORY_DOLLY_COST = 15;

  useEffect(() => {
    const trailer = trailerOptions.find(t => t.id === selectedTrailer);
    if (trailer) {
      setTrailerBaseValue(trailer.dailyRate);
    }
  }, [selectedTrailer]);

  useEffect(() => {
    let currentAccessoriesCost = 0;
    if (strapsSelected) currentAccessoriesCost += ACCESSORY_STRAPS_COST;
    if (dollySelected) currentAccessoriesCost += ACCESSORY_DOLLY_COST;
    setAccessoriesCost(currentAccessoriesCost);

    const calculatedIncome = (trailerBaseValue * daysRented) + currentAccessoriesCost;
    setRentalIncome(calculatedIncome);
  }, [trailerBaseValue, daysRented, strapsSelected, dollySelected]);

  return (
    <div className='min-h-screen bg-[#F1F1F1] text-black flex flex-col'>
      <Navbar />

      <motion.div
        className='p-4'
        initial='hidden'
        animate='visible'
        variants={fadeIn}
      >
        <motion.h1
          className='text-3xl font-medium text-center mb-10'
          variants={fadeInUp}
        >
          Estimate your rental income
        </motion.h1>

        {/* Calculator Inputs */}
        <motion.div
          className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-white p-3 rounded-md'
          variants={fadeInUp}
        >
          {/* Your Trailer Section */}
          <div>
            <label htmlFor='trailer-select' className='block mb-2'>
              Your Trailer
            </label>
            <select
              id='trailer-select'
              className='w-full px-4 py-3 bg-[#F1F1F1] rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500'
              value={selectedTrailer}
              onChange={(e) => setSelectedTrailer(e.target.value)}
            >
              {trailerOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.name} (${option.dailyRate}/day)
                </option>
              ))}
            </select>
          </div>

          {/* Days Rented Section */}
          <div>
            <label htmlFor='days-rented-slider' className='block mb-2'>
              Days rented
            </label>
            <div className='flex items-center space-x-4'>
              <span className='text-[#9DA0A6]'>{daysRented}</span>
              <input
                type='range'
                id='days-rented-slider'
                min='1'
                max='360'
                value={daysRented}
                onChange={(e) => setDaysRented(parseInt(e.target.value))}
                className='flex-grow h-2 bg-[#F1F1F1] rounded-lg appearance-none cursor-pointer accent-[#2563EB]'
              />
              <span className='text-sm text-gray-600'>{daysRented}</span>
            </div>
          </div>

          {/* Accessories Section */}
          <div className='col-span-1 md:col-span-2'>
            <label className='block mb-2'>Accessories</label>
            <div className='flex flex-col space-y-2'>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500'
                  checked={strapsSelected}
                  onChange={(e) => setStrapsSelected(e.target.checked)}
                />
                <span className='ml-2 text-gray-700'>Straps (${ACCESSORY_STRAPS_COST})</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  className='form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500'
                  checked={dollySelected}
                  onChange={(e) => setDollySelected(e.target.checked)}
                />
                <span className='ml-2 text-gray-700'>Dolly (${ACCESSORY_DOLLY_COST})</span>
              </label>
            </div>
          </div>
        </motion.div>

        {/* Rental Income Summary */}
        <motion.div
          className='pt-6 mt-6 space-y-4 bg-white p-3 rounded-md'
          variants={fadeInUp}
        >
          <div className='flex justify-between items-center text-lg'>
            <span>Your trailer (daily rate)</span>
            <span>${trailerBaseValue}.00</span>
          </div>
          <div className='flex justify-between items-center text-lg'>
            <span>Days rented</span>
            <span>{daysRented}</span>
          </div>
          <div className='flex justify-between items-center text-lg'>
            <span>Accessories</span>
            <span>${accessoriesCost}.00</span>
          </div>
          <div className='flex justify-between items-center text-2xl font-medium pt-4 border-t border-gray-200'>
            <span>Rental income</span>
            <span>${rentalIncome}.00</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default CalculatorPage;
