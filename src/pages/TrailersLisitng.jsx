import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar2 from '../components/Navbar2';
import axios from 'axios';
import config from '../config';
import toast from 'react-hot-toast';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: 'spring',
    },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const selectStyle = "bg-[#F1F1F1] p-2 rounded-md";

// Translations for the TrailersListing page
const trailersListingTranslations = {
  en: {
    price: "Price",
    type: "Type",
    keywordSearch: "Keyword search",
    trailersAvailable: "trailers available",
    popular: "Popular",
    perDay: "/Day",
    noImage: "No Image"
  },
  es: {
    price: "Precio",
    type: "Tipo",
    keywordSearch: "Búsqueda por palabra clave",
    trailersAvailable: "remolques disponibles",
    popular: "Popular",
    perDay: "/Día",
    noImage: "Sin imagen"
  },
  cn: {
    price: "价格",
    type: "类型",
    keywordSearch: "关键词搜索",
    trailersAvailable: "辆拖车可用",
    popular: "热门",
    perDay: "/天",
    noImage: "无图片"
  },
  fr: {
    price: "Prix",
    type: "Type",
    keywordSearch: "Recherche par mot-clé",
    trailersAvailable: "remorques disponibles",
    popular: "Populaire",
    perDay: "/Jour",
    noImage: "Pas d'image"
  }
};

const TrailersListing = () => {
  const nav = useNavigate();
  const [trailers, setTrailers] = useState([]);
  const [translations, setTranslations] = useState(() => {
    const storedLang = localStorage.getItem('lang');
    return trailersListingTranslations[storedLang] || trailersListingTranslations.en;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLang = localStorage.getItem('lang');
      setTranslations(trailersListingTranslations[storedLang] || trailersListingTranslations.en);
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleCardClick = (id) => {
    nav(`/trailers/${id}`);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTrailers();
  }, []);

  const fetchTrailers = async () => {
    try {
      const res = await axios.get(`${config.baseUrl}/trailer/all`);
      setTrailers(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch trailers");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar2 />

      <main className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex flex-wrap gap-4">
            <select className={selectStyle}>
              <option>{translations.price}</option>
            </select>
            <select className={selectStyle}>
              <option>{translations.type}</option>
            </select>
            <select className={selectStyle}>
              <option>{translations.keywordSearch}</option>
            </select>
          </div>
        </div>

        <div className='flex justify-between items-center mb-6'>
          <h2 className="text-xl font-semibold text-gray-700">
            {trailers.length} {translations.trailersAvailable}
          </h2>
          <select className={selectStyle}>
            <option>{translations.popular}</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trailers.map((trailer, i) => (
            <motion.div
              key={trailer._id}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => handleCardClick(trailer._id)}
            >
              <img
                src={trailer.images?.[0] || `https://placehold.co/400x300/F3F4F6/9CA3AF?text=${encodeURIComponent(translations.noImage)}`}
                alt={trailer.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {trailer.title}
                </h3>
                <p className="text-gray-600 text-sm mb-1">
                  {trailer.userId?.email || 'Unknown Owner'}
                </p>
                <p className="text-gray-500 text-xs mb-2">
                  {trailer.city}, {trailer.state}
                </p>
                <p className="text-black font-medium text-lg">
                  ${trailer.dailyRate}{translations.perDay}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

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

export default TrailersListing;