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

// Translations for the SingleTrailer page
const singleTrailerTranslations = {
  en: {
    loading: "Loading trailer details...",
    trailerNotFound: "Trailer not found.",
    failedToFetch: "Failed to fetch trailer details",
    noImage: "No Image",
    category: "Category:",
    makeModel: "Make | Model:",
    yearSleepsLength: "Year | Sleeps | Length:",
    description: "Description:",
    location: "Location:",
    owner: "Owner:",
    pricingRentalTerms: "Pricing & Rental Terms",
    daily: "Daily:",
    weekly: "Weekly:",
    monthly: "Monthly:",
    cleaningFee: "Cleaning Fee:",
    securityDeposit: "Security Deposit:",
    insuranceDeductible: "Insurance Deductible:",
    chatWithOwner: "Chat with owner",
    rentThisTrailer: "Rent this trailer",
    faqTitle: "Frequently asked questions",
    seeAllFaq: "See all FAQ",
    guests: "Guests",
    hosts: "Hosts",
    unknownOwner: "Unknown Owner"
  },
  es: {
    loading: "Cargando detalles del remolque...",
    trailerNotFound: "Remolque no encontrado.",
    failedToFetch: "Error al obtener los detalles del remolque",
    noImage: "Sin imagen",
    category: "Categoría:",
    makeModel: "Marca | Modelo:",
    yearSleepsLength: "Año | Plazas | Longitud:",
    description: "Descripción:",
    location: "Ubicación:",
    owner: "Propietario:",
    pricingRentalTerms: "Precios y Términos de Alquiler",
    daily: "Diario:",
    weekly: "Semanal:",
    monthly: "Mensual:",
    cleaningFee: "Tarifa de Limpieza:",
    securityDeposit: "Depósito de Seguridad:",
    insuranceDeductible: "Deducible de Seguro:",
    chatWithOwner: "Chatear con el propietario",
    rentThisTrailer: "Alquilar este remolque",
    faqTitle: "Preguntas frecuentes",
    seeAllFaq: "Ver todas las preguntas frecuentes",
    guests: "Invitados",
    hosts: "Anfitriones",
    unknownOwner: "Propietario Desconocido"
  },
  cn: {
    loading: "正在加载拖车详情...",
    trailerNotFound: "未找到拖车。",
    failedToFetch: "获取拖车详情失败",
    noImage: "无图片",
    category: "类别：",
    makeModel: "品牌 | 型号：",
    yearSleepsLength: "年份 | 铺位 | 长度：",
    description: "描述：",
    location: "地点：",
    owner: "车主：",
    pricingRentalTerms: "定价与租赁条款",
    daily: "每日：",
    weekly: "每周：",
    monthly: "每月：",
    cleaningFee: "清洁费：",
    securityDeposit: "保证金：",
    insuranceDeductible: "保险免赔额：",
    chatWithOwner: "与车主聊天",
    rentThisTrailer: "租用此拖车",
    faqTitle: "常见问题",
    seeAllFaq: "查看所有常见问题",
    guests: "租客",
    hosts: "车主",
    unknownOwner: "未知车主"
  },
  fr: {
    loading: "Chargement des détails de la remorque...",
    trailerNotFound: "Remorque introuvable.",
    failedToFetch: "Échec du chargement des détails de la remorque",
    noImage: "Pas d'image",
    category: "Catégorie :",
    makeModel: "Marque | Modèle :",
    yearSleepsLength: "Année | Couchages | Longueur :",
    description: "Description :",
    location: "Lieu :",
    owner: "Propriétaire :",
    pricingRentalTerms: "Tarifs et conditions de location",
    daily: "Journalier :",
    weekly: "Hebdomadaire :",
    monthly: "Mensuel :",
    cleaningFee: "Frais de nettoyage :",
    securityDeposit: "Dépôt de garantie :",
    insuranceDeductible: "Franchise d'assurance :",
    chatWithOwner: "Discuter avec le propriétaire",
    rentThisTrailer: "Louer cette remorque",
    faqTitle: "Foire aux questions",
    seeAllFaq: "Voir toutes les FAQ",
    guests: "Invités",
    hosts: "Hôtes",
    unknownOwner: "Propriétaire inconnu"
  }
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

  // State for translations
  const [translations, setTranslations] = useState(() => {
    const storedLang = localStorage.getItem('lang');
    return singleTrailerTranslations[storedLang] || singleTrailerTranslations.en;
  });

  useEffect(() => {
    // Listener for changes in localStorage 'lang' key
    const handleStorageChange = () => {
      const storedLang = localStorage.getItem('lang');
      setTranslations(singleTrailerTranslations[storedLang] || singleTrailerTranslations.en);
    };

    window.addEventListener('storage', handleStorageChange);

    // Initial check in case the lang was set before the component mounted
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchTrailer = async () => {
      const id = window.location.pathname.split('/').pop();
      try {
        const res = await axios.get(`${config.baseUrl}/trailer/single/${id}`);
        setTrailer(res.data.data);
      } catch (err) {
        setError(translations.failedToFetch); // Use translated message
      } finally {
        setLoading(false);
      }
    };
    fetchTrailer();
    window.scrollTo(0, 0);
  }, [translations]); // Re-fetch trailer when lang changes to potentially get localized data if your API supports it

  useEffect(() => {
    const fetchContent = async () => {
      try {
        // Assuming your FAQ API can return translated content based on a parameter or request headers.
        // For this example, we'll just re-fetch, assuming the backend handles translation or
        // the `faq.question` and `faq.answer` are already keys that can be translated locally.
        const { data } = await axios.get(`${config.baseUrl}/content/faq`);
        setFaqGuest(data.data.filter(item => item.type === "guest"));
        setFaqHost(data.data.filter(item => item.type === "host"));
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };
    fetchContent();
  }, [translations]); // Re-fetch FAQs when translations change

  if (loading || error || !trailer) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-inter">
        <Navbar />
        <p className={error ? 'text-red-500' : ''}>
          {loading ? translations.loading : error || translations.trailerNotFound}
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
            src={trailer.images?.[0] || `https://placehold.co/800x400/F3F4F6/9CA3AF?text=${encodeURIComponent(translations.noImage)}`}
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
              <p className="text-gray-600">{translations.category}</p>
              <p className="text-gray-800">{trailer.category}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">{translations.makeModel}</p>
              <p className="text-gray-800">{trailer.make} | {trailer.model}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">{translations.yearSleepsLength}</p>
              <p className="text-gray-800">{trailer.year} | {trailer.sleeps} | {trailer.length} ft</p>
            </div>
            <div>
              <p className="text-gray-600 mb-1">{translations.description}</p>
              <p className="text-gray-700">{trailer.description}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">{translations.location}</p>
              <p className="text-gray-800">{trailer.city}, {trailer.state}, {trailer.zip}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">{translations.owner}</p>
              <p className="text-gray-800">{trailer.userId?.email || translations.unknownOwner}</p>
            </div>
          </div>

          {/* Pricing Section */}
          <h3 className="text-xl font-semibold text-gray-700 mt-8 mb-4">{translations.pricingRentalTerms}</h3>
          <div>
            <p className='mb-2'><strong>{translations.daily}</strong> ${trailer.dailyRate}</p>
            <p className='mb-2'><strong>{translations.weekly}</strong> ${trailer.weeklyRate}</p>
            <p className='mb-2'><strong>{translations.monthly}</strong> ${trailer.monthlyRate}</p>
            <p className='mb-2'><strong>{translations.cleaningFee}</strong> ${trailer.cleaningRate}</p>
            <p className='mb-2'><strong>{translations.securityDeposit}</strong> ${trailer.securityRate}</p>
            <p className='mb-2'><strong>{translations.insuranceDeductible}</strong> ${trailer.insuranceDeductible}</p>
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
              {translations.chatWithOwner}
            </button>
            <button
              onClick={() => nav('/booking')}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md shadow-lg transition duration-200"
            >
              {translations.rentThisTrailer}
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
          <h1 className="text-lg sm:text-2xl font-semibold mt-2">{translations.faqTitle}</h1>
          <button className="px-3 py-2 mt-2 rounded-md bg-[#2563EB] text-white text-xs">
            {translations.seeAllFaq}
          </button>
        </div>

        <div className="flex flex-wrap justify-between gap-x-5 mt-8">
          <motion.div layout className="w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md">
            <h2 className="text-xl font-semibold mb-4">{translations.guests}</h2>
            {faqGuest.map((faq, index) => (
              <AccordionItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>

          <motion.div layout className="w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md mt-8 md:mt-0">
            <h2 className="text-xl font-semibold mb-4">{translations.hosts}</h2>
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