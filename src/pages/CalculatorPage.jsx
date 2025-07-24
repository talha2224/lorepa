import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

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

const calculatorPageTranslations = {
    en: {
        estimateIncome: "Estimate your rental income",
        yourTrailer: "Your Trailer",
        selectTrailer: "Select a trailer",
        trailerUtility: "Utility Trailer 6x10",
        trailerEnclosed: "Enclosed Trailer 7x14",
        trailerCarHauler: "Car Hauler 18ft",
        trailerDump: "Dump Trailer",
        enclosed5x8x72: "Enclosed 5' x 8' x 72\" ramp",
        enclosed5x10x72: "Enclosed 5' x 10' x 72\" ramp",
        enclosed6x12x72: "Enclosed 6' x 12' x 72\" ramp",
        enclosed6x12dualAxle: "Enclosed 6' x 12' dual axle",
        enclosed7x14x78: "Enclosed 7' x 14' x 78\"",
        enclosed7x14x84: "Enclosed 7' x 14' x 84\" ramp",
        enclosed7x16x78: "Enclosed 7' x 16' x 78\" ramp",
        enclosed7x16x84: "Enclosed 7' x 16' x 84\" ramp",
        enclosed8x20x78: "Enclosed 8' x 20' x 78\" ramp",
        enclosed8x20x88: "Enclosed 8' x 20' x 88\" ramp",
        enclosed8x24x78: "Enclosed 8' x 24' x 78\" ramp",
        enclosed8x24x84: "Enclosed 8' x 24' x 84\" ramp",
        perDay: "/day",
        daysRented: "Days rented",
        accessories: "Accessories",
        straps: "Straps",
        dolly: "Dolly",
        rentalIncome: "Rental income"
    },
    es: {
        estimateIncome: "Estima tus ingresos por alquiler",
        yourTrailer: "Tu Remolque",
        selectTrailer: "Selecciona un remolque",
        trailerUtility: "Remolque Utilitario 6x10",
        trailerEnclosed: "Remolque Cerrado 7x14",
        trailerCarHauler: "Remolque para Coches 18ft",
        trailerDump: "Remolque de Volteo",
        enclosed5x8x72: "Remolque Cerrado 5' x 8' x 72\" rampa",
        enclosed5x10x72: "Remolque Cerrado 5' x 10' x 72\" rampa",
        enclosed6x12x72: "Remolque Cerrado 6' x 12' x 72\" rampa",
        enclosed6x12dualAxle: "Remolque Cerrado 6' x 12' doble eje",
        enclosed7x14x78: "Remolque Cerrado 7' x 14' x 78\"",
        enclosed7x14x84: "Remolque Cerrado 7' x 14' x 84\" rampa",
        enclosed7x16x78: "Remolque Cerrado 7' x 16' x 78\" rampa",
        enclosed7x16x84: "Remolque Cerrado 7' x 16' x 84\" rampa",
        enclosed8x20x78: "Remolque Cerrado 8' x 20' x 78\" rampa",
        enclosed8x20x88: "Remolque Cerrado 8' x 20' x 88\" rampa",
        enclosed8x24x78: "Remolque Cerrado 8' x 24' x 78\" rampa",
        enclosed8x24x84: "Remolque Cerrado 8' x 24' x 84\" rampa",
        perDay: "/día",
        daysRented: "Días alquilados",
        accessories: "Accesorios",
        straps: "Correas",
        dolly: "Plataforma rodante",
        rentalIncome: "Ingresos por alquiler"
    },
    cn: {
        estimateIncome: "估算您的租赁收入",
        yourTrailer: "您的拖车",
        selectTrailer: "选择拖车",
        trailerUtility: "多功能拖车 6x10",
        trailerEnclosed: "封闭式拖车 7x14",
        trailerCarHauler: "运车拖车 18英尺",
        trailerDump: "自卸拖车",
        enclosed5x8x72: "封闭式 5' x 8' x 72\" 坡道",
        enclosed5x10x72: "封闭式 5' x 10' x 72\" 坡道",
        enclosed6x12x72: "封闭式 6' x 12' x 72\" 坡道",
        enclosed6x12dualAxle: "封闭式 6' x 12' 双轴",
        enclosed7x14x78: "封闭式 7' x 14' x 78\"",
        enclosed7x14x84: "封闭式 7' x 14' x 84\" 坡道",
        enclosed7x16x78: "封闭式 7' x 16' x 78\" 坡道",
        enclosed7x16x84: "封闭式 7' x 16' x 84\" 坡道",
        enclosed8x20x78: "封闭式 8' x 20' x 78\" 坡道",
        enclosed8x20x88: "封闭式 8' x 20' x 88\" 坡道",
        enclosed8x24x78: "封闭式 8' x 24' x 78\" 坡道",
        enclosed8x24x84: "封闭式 8' x 24' x 84\" 坡道",
        perDay: "/天",
        daysRented: "租赁天数",
        accessories: "配件",
        straps: "绑带",
        dolly: "手推车",
        rentalIncome: "租赁收入"
    },
    fr: {
        estimateIncome: "Estimez vos revenus de location",
        yourTrailer: "Votre Remorque",
        selectTrailer: "Sélectionnez une remorque",
        trailerUtility: "Remorque Utilitaire 6x10",
        trailerEnclosed: "Remorque Fermée 7x14",
        trailerCarHauler: "Remorque Porte-Voiture 18ft",
        trailerDump: "Remorque Benne",
        enclosed5x8x72: "Remorque fermée 5' x 8' x 72\" rampe",
        enclosed5x10x72: "Remorque fermée 5' x 10' x 72\" rampe",
        enclosed6x12x72: "Remorque fermée 6' x 12' x 72\" rampe",
        enclosed6x12dualAxle: "Remorque fermée 6' x 12' double essieu",
        enclosed7x14x78: "Remorque fermée 7' x 14' x 78\"",
        enclosed7x14x84: "Remorque fermée 7' x 14' x 84\" rampe",
        enclosed7x16x78: "Remorque fermée 7' x 16' x 78\" rampe",
        enclosed7x16x84: "Remorque fermée 7' x 16' x 84\" rampe",
        enclosed8x20x78: "Remorque fermée 8' x 20' x 78\" rampe",
        enclosed8x20x88: "Remolque fermée 8' x 20' x 88\" rampe",
        enclosed8x24x78: "Remorque fermée 8' x 24' x 78\" rampe",
        enclosed8x24x84: "Remorque fermée 8' x 24' x 84\" rampe",
        perDay: "/jour",
        daysRented: "Jours loués",
        accessories: "Accessoires",
        straps: "Sangles",
        dolly: "Diable",
        rentalIncome: "Revenus de location"
    }
};

const CalculatorPage = () => {
    const [selectedTrailer, setSelectedTrailer] = useState('');
    const [daysRented, setDaysRented] = useState(1);
    const [strapsSelected, setStrapsSelected] = useState(false);
    const [dollySelected, setDollySelected] = useState(false);

    const [trailerBaseValue, setTrailerBaseValue] = useState(0);
    const [accessoriesCost, setAccessoriesCost] = useState(0);
    const [rentalIncome, setRentalIncome] = useState(0);

    const [translations, setTranslations] = useState(() => {
        const storedLang = localStorage.getItem('lang');
        return calculatorPageTranslations[storedLang] || calculatorPageTranslations.en;
    });

    // State and ref for custom select dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedLang = localStorage.getItem('lang');
            setTranslations(calculatorPageTranslations[storedLang] || calculatorPageTranslations.en);
        };

        window.addEventListener('storage', handleStorageChange);

        handleStorageChange();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const trailerOptions = [
        { id: '', nameKey: 'selectTrailer', dailyRate: 0, isDisabled: true },
        { id: 'enclosed-5x8x72', nameKey: 'enclosed5x8x72', dailyRate: 60 },
        { id: 'enclosed-5x10x72', nameKey: 'enclosed5x10x72', dailyRate: 65 },
        { id: 'enclosed-6x12x72', nameKey: 'enclosed6x12x72', dailyRate: 70 },
        { id: 'enclosed-6x12-dual-axle', nameKey: 'enclosed6x12dualAxle', dailyRate: 80 },
        { id: 'enclosed-7x14x78', nameKey: 'enclosed7x14x78', dailyRate: 90 },
        { id: 'enclosed-7x14x84', nameKey: 'enclosed7x14x84', dailyRate: 95 },
        { id: 'enclosed-7x16x78', nameKey: 'enclosed7x16x78', dailyRate: 100 },
        { id: 'enclosed-7x16x84', nameKey: 'enclosed7x16x84', dailyRate: 105 },
        { id: 'enclosed-8x20x78', nameKey: 'enclosed8x20x78', dailyRate: 110 },
        { id: 'enclosed-8x20x88', nameKey: 'enclosed8x20x88', dailyRate: 115 },
        { id: 'enclosed-8x24x78', nameKey: 'enclosed8x24x78', dailyRate: 125 },
        { id: 'enclosed-8x24x84', nameKey: 'enclosed8x24x84', dailyRate: 130 },
        { id: 'trailer-utility', nameKey: 'trailerUtility', dailyRate: 50 },
        { id: 'trailer-enclosed', nameKey: 'trailerEnclosed', dailyRate: 75 },
        { id: 'trailer-car-hauler', nameKey: 'trailerCarHauler', dailyRate: 100 },
        { id: 'trailer-dump', nameKey: 'trailerDump', dailyRate: 120 },
    ];

    const ACCESSORY_STRAPS_COST = 10;
    const ACCESSORY_DOLLY_COST = 15;

    useEffect(() => {
        const trailer = trailerOptions.find(t => t.id === selectedTrailer);
        if (trailer) {
            setTrailerBaseValue(trailer.dailyRate);
        } else {
            setTrailerBaseValue(0);
        }
    }, [selectedTrailer, trailerOptions]);

    useEffect(() => {
        let currentAccessoriesCost = 0;
        if (strapsSelected) currentAccessoriesCost += ACCESSORY_STRAPS_COST;
        if (dollySelected) currentAccessoriesCost += ACCESSORY_DOLLY_COST;
        setAccessoriesCost(currentAccessoriesCost);

        const calculatedIncome = (trailerBaseValue * daysRented) + currentAccessoriesCost;
        setRentalIncome(calculatedIncome);
    }, [trailerBaseValue, daysRented, strapsSelected, dollySelected]);

    const handleSelectOption = (optionId) => {
        setSelectedTrailer(optionId);
        setIsDropdownOpen(false);
    };

    const selectedOptionText = selectedTrailer
        ? translations[trailerOptions.find(t => t.id === selectedTrailer)?.nameKey] || translations.selectTrailer
        : translations.selectTrailer;

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
                    {translations.estimateIncome}
                </motion.h1>

                <motion.div
                    className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-white p-3 rounded-md'
                    variants={fadeInUp}
                >
                    <div>
                        <label htmlFor='trailer-select' className='block mb-2'>
                            {translations.yourTrailer}
                        </label>
                        <div className='relative' ref={dropdownRef}>
                            <div
                                className='w-full px-4 py-3 bg-[#F1F1F1] rounded-md cursor-pointer flex justify-between items-center'
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span>{selectedOptionText}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M19 9l-7 7-7-7'
                                    ></path>
                                </svg>
                            </div>
                            {isDropdownOpen && (
                                <div className='absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto'>
                                    {trailerOptions.map(option => (
                                        <div
                                            key={option.id}
                                            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${option.isDisabled ? 'text-gray-400 cursor-not-allowed' : ''} ${selectedTrailer === option.id ? 'bg-blue-100' : ''}`}
                                            onClick={() => !option.isDisabled && handleSelectOption(option.id)}
                                        >
                                            {translations[option.nameKey]} {option.dailyRate > 0 ? `($${option.dailyRate}${translations.perDay})` : ''}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor='days-rented-slider' className='block mb-2'>
                            {translations.daysRented}
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

                    <div className='col-span-1 md:col-span-2'>
                        <label className='block mb-2'>{translations.accessories}</label>
                        <div className='flex flex-col space-y-2'>
                            <label className='inline-flex items-center'>
                                <input
                                    type='checkbox'
                                    className='form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500'
                                    checked={strapsSelected}
                                    onChange={(e) => setStrapsSelected(e.target.checked)}
                                />
                                <span className='ml-2 text-gray-700'>{translations.straps} (${ACCESSORY_STRAPS_COST})</span>
                            </label>
                            <label className='inline-flex items-center'>
                                <input
                                    type='checkbox'
                                    className='form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500'
                                    checked={dollySelected}
                                    onChange={(e) => setDollySelected(e.target.checked)}
                                />
                                <span className='ml-2 text-gray-700'>{translations.dolly} (${ACCESSORY_DOLLY_COST})</span>
                            </label>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className='pt-6 mt-6 space-y-4 bg-white p-3 rounded-md'
                    variants={fadeInUp}
                >
                    <div className='flex justify-between items-center text-lg'>
                        <span>{translations.yourTrailer} ({translations.perDay} rate)</span>
                        <span>${trailerBaseValue}.00</span>
                    </div>
                    <div className='flex justify-between items-center text-lg'>
                        <span>{translations.daysRented}</span>
                        <span>{daysRented}</span>
                    </div>
                    <div className='flex justify-between items-center text-lg'>
                        <span>{translations.accessories}</span>
                        <span>${accessoriesCost}.00</span>
                    </div>
                    <div className='flex justify-between items-center text-2xl font-medium pt-4 border-t border-gray-200'>
                        <span>{translations.rentalIncome}</span>
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