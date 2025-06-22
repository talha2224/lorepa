import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const dummyTrailers = [
  {
    id: '1',
    title: '2017 Diamond C Utility 77" x14\'',
    owner: 'John Doe',
    contact: '000-0000-0001',
    price: '140',
    imageUrl: 'https://www.pollisum.com/wp-content/uploads/2022/08/Types-of-trailers.jpg',
    basicInfo: {
      make: 'Diamond C',
      nameOfOwner: 'Lorena Troop Rental',
      category: 'Utility Trailer',
      detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique nisl in lectus tempor vestibulum ut labore et dolore magna aliqua.',
    },
    pricingRentalTerms: {
      daily: '140 CAD',
      weekly: '800 CAD',
      monthly: '2500 CAD',
      totalAmount: '140 CAD',
      serviceFee: '15 CAD',
      taxAndDuties: '20 CAD',
      securityDeposit: '200 CAD',
      minimumRentalDays: '1 Day',
      maximumRentalDays: '30 Days',
    },
    trailerDetails: {
      hitchType: 'Ball 2"',
      axles: '2',
      weightCapacity: '5000 lbs',
      lightConnection: '7 Pin',
      trailerDimension: '14ft x 6.5ft',
      brakes: 'Yes',
      vin: 'ABCDEF1234567890',
    },
    finalDetails: {
      pickupReturn: 'Flexible',
    }
  },
  {
    id: '2',
    title: '2019 Enclosed Cargo Trailer 6x12',
    owner: 'Jane Smith',
    contact: '000-0000-0002',
    price: '120',
    imageUrl: 'https://www.pollisum.com/wp-content/uploads/2022/08/Types-of-trailers.jpg',
    basicInfo: {
      make: 'Stealth',
      nameOfOwner: 'Jane\'s Haulers',
      category: 'Enclosed Trailer',
      detailedDescription: 'Spacious and secure enclosed cargo trailer, perfect for moving furniture or equipment.',
    },
    pricingRentalTerms: {
      daily: '120 CAD',
      weekly: '700 CAD',
      monthly: '2200 CAD',
      totalAmount: '120 CAD',
      serviceFee: '10 CAD',
      taxAndDuties: '15 CAD',
      securityDeposit: '800 CAD',
      minimumRentalDays: '1 Day',
      maximumRentalDays: '20 Days',
    },
    trailerDetails: {
      hitchType: 'Ball 2 5/16"',
      axles: '2',
      weightCapacity: '6000 lbs',
      lightConnection: '7 Pin',
      trailerDimension: '12ft x 6ft',
      brakes: 'Yes',
      vin: 'XYZABC1234567890',
    },
    finalDetails: {
      pickupReturn: 'Strict',
    }
  },
  {
    id: '3',
    title: '2020 Flatbed Trailer 18ft',
    owner: 'Robert Johnson',
    contact: '000-0000-0003',
    price: '160',
    imageUrl: 'https://www.pollisum.com/wp-content/uploads/2022/08/Types-of-trailers.jpg',
    basicInfo: {
      make: 'Load Trail',
      nameOfOwner: 'Robert\'s Rentals',
      category: 'Flatbed Trailer',
      detailedDescription: 'Heavy-duty flatbed trailer suitable for hauling vehicles or large equipment.',
    },
    pricingRentalTerms: {
      daily: '160 CAD',
      weekly: '950 CAD',
      monthly: '3500 CAD',
      totalAmount: '160 CAD',
      serviceFee: '20 CAD',
      taxAndDuties: '25 CAD',
      securityDeposit: '1200 CAD',
      minimumRentalDays: '1 Day',
      maximumRentalDays: '45 Days',
    },
    trailerDetails: {
      hitchType: 'Gooseneck',
      axles: '2',
      weightCapacity: '10000 lbs',
      lightConnection: '7 Pin',
      trailerDimension: '18ft x 8ft',
      brakes: 'Yes',
      vin: 'UVWXYZ1234567890',
    },
    finalDetails: {
      pickupReturn: 'Negotiable',
    }
  },
  {
    id: '4',
    title: '2017 Diamond C Utility 77" x14\'', // Duplicate for layout
    owner: 'John Doe',
    contact: '000-0000-0001',
    price: '140',
    imageUrl: 'https://www.pollisum.com/wp-content/uploads/2022/08/Types-of-trailers.jpg',
    basicInfo: {
      make: 'Diamond C',
      nameOfOwner: 'Lorena Troop Rental',
      category: 'Utility Trailer',
      detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique nisl in lectus tempor vestibulum ut labore et dolore magna aliqua.',
    },
    pricingRentalTerms: {
      daily: '140 CAD',
      weekly: '800 CAD',
      monthly: '2500 CAD',
      totalAmount: '140 CAD',
      serviceFee: '15 CAD',
      taxAndDuties: '20 CAD',
      securityDeposit: '200 CAD',
      minimumRentalDays: '1 Day',
      maximumRentalDays: '30 Days',
    },
    trailerDetails: {
      hitchType: 'Ball 2"',
      axles: '2',
      weightCapacity: '5000 lbs',
      lightConnection: '7 Pin',
      trailerDimension: '14ft x 6.5ft',
      brakes: 'Yes',
      vin: 'ABCDEF1234567891',
    },
    finalDetails: {
      pickupReturn: 'Flexible',
    }
  },
  {
    id: '5',
    title: '2017 Diamond C Utility 77" x14\'', // Duplicate for layout
    owner: 'John Doe',
    contact: '000-0000-0001',
    price: '140',
    imageUrl: 'https://www.pollisum.com/wp-content/uploads/2022/08/Types-of-trailers.jpg',
    basicInfo: {
      make: 'Diamond C',
      nameOfOwner: 'Lorena Troop Rental',
      category: 'Utility Trailer',
      detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique nisl in lectus tempor vestibulum ut labore et dolore magna aliqua.',
    },
    pricingRentalTerms: {
      daily: '140 CAD',
      weekly: '800 CAD',
      monthly: '2500 CAD',
      totalAmount: '140 CAD',
      serviceFee: '15 CAD',
      taxAndDuties: '20 CAD',
      securityDeposit: '200 CAD',
      minimumRentalDays: '1 Day',
      maximumRentalDays: '30 Days',
    },
    trailerDetails: {
      hitchType: 'Ball 2"',
      axles: '2',
      weightCapacity: '5000 lbs',
      lightConnection: '7 Pin',
      trailerDimension: '14ft x 6.5ft',
      brakes: 'Yes',
      vin: 'ABCDEF1234567892',
    },
    finalDetails: {
      pickupReturn: 'Flexible',
    }
  },
  {
    id: '6',
    title: '2017 Diamond C Utility 77" x14\'', // Duplicate for layout
    owner: 'John Doe',
    contact: '000-0000-0001',
    price: '140',
    imageUrl: 'https://www.pollisum.com/wp-content/uploads/2022/08/Types-of-trailers.jpg',
    basicInfo: {
      make: 'Diamond C',
      nameOfOwner: 'Lorena Troop Rental',
      category: 'Utility Trailer',
      detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique nisl in lectus tempor vestibulum ut labore et dolore magna aliqua.',
    },
    pricingRentalTerms: {
      daily: '140 CAD',
      weekly: '800 CAD',
      monthly: '2500 CAD',
      totalAmount: '140 CAD',
      serviceFee: '15 CAD',
      taxAndDuties: '20 CAD',
      securityDeposit: '200 CAD',
      minimumRentalDays: '1 Day',
      maximumRentalDays: '30 Days',
    },
    trailerDetails: {
      hitchType: 'Ball 2"',
      axles: '2',
      weightCapacity: '5000 lbs',
      lightConnection: '7 Pin',
      trailerDimension: '14ft x 6.5ft',
      brakes: 'Yes',
      vin: 'ABCDEF1234567893',
    },
    finalDetails: {
      pickupReturn: 'Flexible',
    }
  },
];

const guestFAQs = [
  {
    question: "Question people asked us goes here",
    answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
  },
  {
    question: "Question people asked us goes here",
    answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
  },
  {
    question: "Question people asked us goes here",
    answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
  },
];

const hostFAQs = [
  {
    question: "Question people asked us goes here",
    answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
  },
  {
    question: "Question people asked us goes here",
    answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
  },
  {
    question: "Question people asked us goes here",
    answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
  },
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-md mb-3 bg-white">
      <button className="w-full flex justify-between items-center p-4 text-left font-medium text-black" onClick={() => setIsOpen(!isOpen)}>{question} {isOpen ? <FaAngleUp /> : <FaAngleDown />}</button>
      {isOpen && (
        <div className="p-4 border-t border-[#D1D5DB] text-gray-700">{answer}</div>
      )}
    </div>
  );
};

const SingleTrailer = () => {
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const nav = useNavigate()
  // Simulate getting ID from URL (e.g., /trailers/123 -> id = 123)
  useEffect(() => {
    const pathParts = window.location.pathname.split('/');
    const id = pathParts[pathParts.length - 1]; // Get the last part of the path as ID

    if (id) {
      const foundTrailer = dummyTrailers.find(t => t.id === id);
      if (foundTrailer) {
        setTrailer(foundTrailer);
      } else {
        setError('Trailer not found.');
      }
    } else {
      setError('No trailer ID provided.');
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center font-inter'>
        <Navbar />
        <p>Loading trailer details...</p>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center font-inter'>
        <Navbar />
        <p className="text-red-500">{error}</p>
        <Footer />
      </div>
    );
  }

  if (!trailer) {
    return (
      <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center font-inter'>
        <Navbar />
        <p>Select a trailer to view details.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col font-inter'>
      <Navbar />

      <main className="flex-1 p-6 md:p-8 lg:p-10">
        {/* Trailer Image */}
        <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
          <img
            src={trailer.imageUrl}
            alt={trailer.title}
            className="w-full h-96 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x400/F3F4F6/9CA3AF?text=Image+Not+Found"; }}
          />
        </div>

        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{trailer.title}</h2>

          {/* Basic Info */}
          <section className="mb-8 pb-6 border-b border-gray-200">
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Basic Info</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Trailer ID:</p>
                  <p className="text-gray-800 font-medium">{trailer.id}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Name of owner:</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-800 font-medium">{trailer.basicInfo.nameOfOwner}</p>
                    <img src={'https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?semt=ais_hybrid&w=740'} alt="Owner Avatar" className="w-8 h-8 rounded-full" />
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
            </div>
          </section>

          {/* Pricing & Rental Terms */}
          <section className="mb-8 pb-6 border-b border-gray-200">
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Pricing & Rental Terms</h3>
              <div className="space-y-2">
                {Object.entries(trailer.pricingRentalTerms).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <p className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</p>
                    <p className="text-gray-800 font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trailer Details */}
          <section className="mb-8 pb-6 border-b border-gray-200">
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Trailer Details</h3>
              <div className="space-y-2">
                {Object.entries(trailer.trailerDetails).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <p className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</p>
                    <p className="text-gray-800 font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Final Details */}
          <section className="">
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Final Details</h3>
              <div className="space-y-2">
                {Object.entries(trailer.finalDetails).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <p className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</p>
                    <p className="text-gray-800 font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => nav('/booking')}
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
          </div>
        </div>
      </main>

      <div className=" px-10 py-5 text-black">

        <div className="flex justify-between items-center mt-10 w-full flex-wrap text-black">
          <h1 className="text-lg sm:text-2xl font-semibold mt-2">Frequently asked questions</h1>
          <button className="px-3 py-2 mt-2 rounded-md bg-[#2563EB] text-white text-xs">See all FAQ</button>
        </div>


        <div className="flex flex-wrap justify-between gap-x-5 mt-8">
          <div className="w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Guests</h2>
            {guestFAQs.map((faq, index) => (
              <AccordionItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md mt-8 md:mt-0">
            <h2 className="text-xl font-semibold mb-4">Hosts</h2>
            {hostFAQs.map((faq, index) => (
              <AccordionItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>


      </div>

      <Footer />
    </div>
  );
}


export default SingleTrailer
