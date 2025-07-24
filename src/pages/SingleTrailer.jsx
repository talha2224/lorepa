import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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

const singleTrailerTranslations = {
  en: {
    loading: "Loading trailer details...",
    trailerNotFound: "Trailer not found.",
    failedToFetch: "Failed to fetch trailer details",
    noImage: "No Image",
    basicInfo: "Basic Info",
    trailerId: "Trailer ID",
    nameOfOwner: "Name of owner",
    category: "Category",
    trailerTitleStatus: "Trailer title status",
    detailedDescription: "Detailed description",
    pricingRentalTerms: "Pricing & Rental Terms",
    daily: "Daily:",
    weekly: "Weekly:",
    monthly: "Monthly:",
    cleaningFee: "Cleaning Fee:",
    securityDeposit: "Security Deposit:",
    insuranceDeductible: "Insurance Deductible:",
    trailerDetails: "Trailer Details",
    hitchType: "Hitch type",
    ballSize: "Ball size",
    weightCapacity: "Weight Capacity",
    lightPlugConfiguration: "Light plug configuration",
    trailerDimension: "Trailer dimension",
    year: "Year",
    make: "Make",
    model: "Model",
    vin: "VIN",
    finalSetup: "Final Setup",
    trailerValue: "Trailer Value:",
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
    basicInfo: "Información básica",
    trailerId: "ID del remolque",
    nameOfOwner: "Nombre del propietario",
    category: "Categoría",
    trailerTitleStatus: "Estado del título del remolque",
    detailedDescription: "Descripción detallada",
    pricingRentalTerms: "Precios y Términos de Alquiler",
    daily: "Diario:",
    weekly: "Semanal:",
    monthly: "Mensual:",
    cleaningFee: "Tarifa de Limpieza:",
    securityDeposit: "Depósito de Seguridad:",
    insuranceDeductible: "Deducible de Seguro:",
    trailerDetails: "Detalles del remolque",
    hitchType: "Tipo de enganche",
    ballSize: "Tamaño de la bola",
    weightCapacity: "Capacidad de peso",
    lightPlugConfiguration: "Configuración del enchufe de luz",
    trailerDimension: "Dimensión del remolque",
    year: "Año",
    make: "Marca",
    model: "Modelo",
    vin: "VIN",
    finalSetup: "Configuración final",
    trailerValue: "Valor del remolque:",
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
    basicInfo: "基本信息",
    trailerId: "拖车ID",
    nameOfOwner: "车主姓名",
    category: "类别",
    trailerTitleStatus: "拖车标题状态",
    detailedDescription: "详细描述",
    pricingRentalTerms: "定价与租赁条款",
    daily: "每日：",
    weekly: "每周：",
    monthly: "每月：",
    cleaningFee: "清洁费：",
    securityDeposit: "保证金：",
    insuranceDeductible: "保险免赔额：",
    trailerDetails: "拖车详情",
    hitchType: "挂钩类型",
    ballSize: "球尺寸",
    weightCapacity: "承载能力",
    lightPlugConfiguration: "灯插头配置",
    trailerDimension: "拖车尺寸",
    year: "年份",
    make: "品牌",
    model: "型号",
    vin: "车辆识别码",
    finalSetup: "最终设置",
    trailerValue: "拖车价值：",
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
    basicInfo: "Informations de base",
    trailerId: "ID de la remorque",
    nameOfOwner: "Nom du propriétaire",
    category: "Catégorie",
    trailerTitleStatus: "Statut du titre de la remorque",
    detailedDescription: "Description détaillée",
    pricingRentalTerms: "Tarifs et conditions de location",
    daily: "Journalier :",
    weekly: "Hebdomadaire :",
    monthly: "Mensuel :",
    cleaningFee: "Frais de nettoyage :",
    securityDeposit: "Dépôt de garantie :",
    insuranceDeductible: "Franchise d'assurance :",
    trailerDetails: "Détails de la remorque",
    hitchType: "Type d'attelage",
    ballSize: "Taille de la boule",
    weightCapacity: "Capacité de poids",
    lightPlugConfiguration: "Configuration de la prise d'éclairage",
    trailerDimension: "Dimension de la remorque",
    year: "Année",
    make: "Marque",
    model: "Modèle",
    vin: "NIV",
    finalSetup: "Configuration finale",
    trailerValue: "Valeur de la remorque :",
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nav = useNavigate();

  const [translations, setTranslations] = useState(() => {
    const storedLang = localStorage.getItem('lang');
    return singleTrailerTranslations[storedLang] || singleTrailerTranslations.en;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLang = localStorage.getItem('lang');
      setTranslations(singleTrailerTranslations[storedLang] || singleTrailerTranslations.en);
    };

    window.addEventListener('storage', handleStorageChange);

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
        setError(translations.failedToFetch);
      } finally {
        setLoading(false);
      }
    };
    fetchTrailer();
    window.scrollTo(0, 0);
  }, [translations]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data } = await axios.get(`${config.baseUrl}/content/faq`);
        setFaqGuest(data.data.filter(item => item.type === "guest"));
        setFaqHost(data.data.filter(item => item.type === "host"));
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
      }
    };
    fetchContent();
  }, [translations]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === trailer.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? trailer.images.length - 1 : prevIndex - 1
    );
  };

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
    <div className="min-h-screen bg-white flex flex-col font-inter">
      <Navbar />

      <main className="flex-1 p-6 md:p-8 lg:p-10">
        <motion.div
          className="mb-8 rounded-lg overflow-hidden shadow-lg relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={trailer.images?.[currentImageIndex] || `https://placehold.co/800x400/F3F4F6/9CA3AF?text=${encodeURIComponent(translations.noImage)}`}
            alt={trailer.title}
            className="w-full h-96 object-cover"
          />
          {trailer.images && trailer.images.length > 1 && (
            <>
              <button
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-[#2563EB] text-white p-3 rounded-full hover:bg-opacity-75 transition-colors"
                onClick={handlePrevImage}
              >
                <FaChevronLeft />
              </button>
              <button
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-[#2563EB] text-white p-3 rounded-full hover:bg-opacity-75 transition-colors"
                onClick={handleNextImage}
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </motion.div>

        <motion.div className="bg-white rounded-lg" variants={fadeVariant} initial="hidden" animate="visible">
          <div>
            <div className="border border-[#C3C3C3] p-5 rounded-lg mb-4">
              <h2 className="text-[20px] font-[600] text-[#0A0F18] mb-4">{translations.basicInfo}</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-600">{translations.trailerId}</p>
                <p className="text-gray-800 text-right">{trailer._id}</p>

                <p className="text-gray-600">{translations.nameOfOwner}</p>
                <p className="text-gray-800 text-right">{trailer.userId?.name || translations.unknownOwner}</p>

                <p className="text-gray-600">{translations.category}</p>
                <p className="text-gray-800 text-right">{trailer.category}</p>

                <p className="text-gray-600">{translations.trailerTitleStatus}</p>
                <p className="text-gray-800 text-right">{trailer.title}</p>

                <p className="text-gray-600">{translations.detailedDescription}</p>
                <p className="text-gray-800 text-right">{trailer.description}</p>
              </div>
            </div>

            <div className='border border-[#C3C3C3] p-5 rounded-lg mb-4'>
              <h3 className="text-[20px] font-[600] text-[#0A0F18] mb-4">{translations.pricingRentalTerms}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className='text-gray-600'>{translations.daily}</p>
                <p className='text-gray-800 text-right'>${trailer.dailyRate}</p>

                <p className='text-gray-600'>{translations.weekly}</p>
                <p className='text-gray-800 text-right'>${trailer.weeklyRate}</p>

                <p className='text-gray-600'>{translations.monthly}</p>
                <p className='text-gray-800 text-right'>${trailer.monthlyRate}</p>

                <p className='text-gray-600'>{translations.cleaningFee}</p>
                <p className='text-gray-800 text-right'>${trailer.cleaningRate}</p>

                <p className='text-gray-600'>{translations.securityDeposit}</p>
                <p className='text-gray-800 text-right'>${trailer.securityRate}</p>

                <p className='text-gray-600'>{translations.insuranceDeductible}</p>
                <p className='text-gray-800 text-right'>${trailer.insuranceDeductible}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="border border-[#C3C3C3] p-5 rounded-lg mb-4">
              <h2 className="text-[20px] font-[600] text-[#0A0F18] mb-4">{translations.trailerDetails}</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-600">{translations.hitchType}</p>
                <p className="text-gray-800 text-right">{trailer.hitchType || 'Bumper pull'}</p>

                <p className="text-gray-600">{translations.ballSize}</p>
                <p className="text-gray-800 text-right">{trailer.ballSize || '3 inch'}</p>

                <p className="text-gray-600">{translations.weightCapacity}</p>
                <p className="text-gray-800 text-right">{trailer.bearingCapacity || '50kg'}</p>

                <p className="text-gray-600">{translations.lightPlugConfiguration}</p>
                <p className="text-gray-800 text-right">{trailer.lightPlugConfiguration || '000'}</p>

                <p className="text-gray-600">{translations.trailerDimension}</p>
                <p className="text-gray-800 text-right">{trailer.axleDimension || '00000'}</p>

                <p className="text-gray-600">{translations.year}</p>
                <p className="text-gray-800 text-right">{trailer.year}</p>

                <p className="text-gray-600">{translations.make}</p>
                <p className="text-gray-800 text-right">{trailer.make}</p>

                <p className="text-gray-600">{translations.model}</p>
                <p className="text-gray-800 text-right">{trailer.model}</p>

                <p className="text-gray-600">{translations.vin}</p>
                <p className="text-gray-800 text-right">{trailer.vin || '-'}</p>
              </div>
            </div>

            <div className="border border-[#C3C3C3] p-5 rounded-lg">
              <h3 className="text-[20px] font-[600] text-[#0A0F18] mb-4">{translations.finalSetup}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className='text-gray-600'>{translations.trailerValue}</p>
                <p className='text-gray-800 text-right'>${Number(trailer?.dailyRate) + Number(trailer?.monthlyRate) + Number(trailer?.cleaningRate) + Number(trailer?.securityRate) + Number(trailer?.insuranceDeductible)}</p>
              </div>
            </div>
          </div>
        </motion.div>

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
      </main>

      <motion.div
        className="px-6 md:px-10 py-5 text-black"
        variants={fadeVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex justify-between items-center mt-10 w-full flex-wrap text-black">
          <h1 className="text-lg sm:text-2xl font-semibold mt-2">{translations.faqTitle}</h1>
          <button className="px-3 py-2 mt-2 rounded-md bg-[#2563EB] text-white text-xs">
            <Link to={"/faq"}>{translations.seeAllFaq}</Link>
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-5 mt-8">
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