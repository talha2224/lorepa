import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';

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

const TrailersListing = () => {

    const nav = useNavigate()
    const handleCardClick = (id) => {
        nav(`/trailers/${id}`)
    };

    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />

            <main className="flex-1 p-6 md:p-8 lg:p-10 ">
                <div className="flex justify-between items-center mb-6">
                    {/* Dummy filters/search bar */}
                    <div className="flex space-x-4">
                        <select className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Price</option>
                        </select>
                        <select className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Type</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Keyword search"
                            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <select className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Popular</option>
                    </select>
                </div>

                <h2 className="text-xl font-semibold text-gray-700 mb-6">{dummyTrailers.length} trailers available</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {dummyTrailers.map(trailer => (
                        <div
                            key={trailer.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                            onClick={() => handleCardClick(trailer.id)}
                        >
                            <img
                                src={trailer.imageUrl}
                                alt={trailer.title}
                                className="w-full h-48 object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/F3F4F6/9CA3AF?text=Image+Not+Found"; }}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{trailer.title}</h3>
                                <p className="text-gray-600 text-sm mb-1">{trailer.owner}</p>
                                <p className="text-gray-500 text-xs mb-2">{trailer.contact}</p>
                                <p className=" text-black font-medium text-lg">${trailer.price}/Day</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};
export default TrailersListing
