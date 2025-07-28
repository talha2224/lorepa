import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import config from '../config';
import manImage from '../assets/man.png'
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
    unknownOwner: "Unknown Owner",
    ratingsAndReviews: "Ratings and reviews",
    excellent: "Excellent",
    good: "Good",
    average: "Average",
    belowAverage: "Below average",
    poor: "Poor",
    dayAgo: "day ago",
    wasAnExcellentRenter: "was an excellent renter! They communicated clearly, picked up and returned the trailer on time, and took great care of the equipment. Everything was returned in perfect condition. Highly recommended for future rentals!",
    smoothTransactionWith: "Smooth transaction with lorepa! They were punctual, polite, and treated the trailer as if it were their own. Highly recommended.",
    isATrustworthyRenter: "is a trustworthy renter. The trailer was returned in excellent shape, and the entire process was hassle-free. 5 stars!",
    outstandingExperience: "Outstanding experience! lorepa was easy to work with, followed all instructions, and ensured the trailer stayed in great condition.",
    highlyRecommendedRenter: "Highly recommended renter. lorepa was organized, courteous, and took excellent care of the trailer during their hire.",
    readMore: "Read more"
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
    unknownOwner: "Propietario Desconocido",
    ratingsAndReviews: "Calificaciones y reseñas",
    excellent: "Excelente",
    good: "Bien",
    average: "Promedio",
    belowAverage: "Por debajo del promedio",
    poor: "Pobre",
    dayAgo: "día atrás",
    wasAnExcellentRenter: "¡fue un excelente inquilino! Se comunicaron claramente, recogieron y devolvieron el remolque a tiempo, y cuidaron muy bien el equipo. Todo fue devuelto en perfectas condiciones. ¡Muy recomendable para futuros alquileres!",
    smoothTransactionWith: "¡Transacción fluida con [Nombre]! Fueron puntuales, educados y trataron el remolque como si fuera suyo. Muy recomendable.",
    isATrustworthyRenter: "es un inquilino de confianza. El remolque fue devuelto en excelentes condiciones, y todo el proceso fue sin problemas. ¡5 estrellas!",
    outstandingExperience: "¡Experiencia sobresaliente! [Nombre] fue fácil de trabajar, siguió todas las instrucciones y se aseguró de que el remolque se mantuviera en excelentes condiciones.",
    highlyRecommendedRenter: "Inquilino muy recomendado. [Nombre] fue organizado, cortés y cuidó excelentemente el remolque durante su alquiler.",
    readMore: "Leer más"
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
    unknownOwner: "未知车主",
    ratingsAndReviews: "评分和评论",
    excellent: "优秀",
    good: "好",
    average: "一般",
    belowAverage: "低于平均水平",
    poor: "差",
    dayAgo: "天前",
    wasAnExcellentRenter: "是一位出色的租客！他们沟通清晰，准时取还拖车，并且非常爱护设备。所有东西都完好无损地归还。强烈推荐未来租赁！",
    smoothTransactionWith: "与[名字]的交易顺利！他们准时、有礼貌，对待拖车就像对待自己的。强烈推荐。",
    isATrustworthyRenter: "是一个值得信赖的租客。拖车完好无损地归还，整个过程轻松无忧。5星！",
    outstandingExperience: "出色的体验！[名字]易于合作，遵循所有指示，并确保拖车保持良好状态。",
    highlyRecommendedRenter: "强烈推荐的租客。[名字]有条理、有礼貌，并在租赁期间悉心照料拖车。",
    readMore: "阅读更多"
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
    unknownOwner: "Propriétaire inconnu",
    ratingsAndReviews: "Évaluations et avis",
    excellent: "Excellent",
    good: "Bon",
    average: "Moyenne",
    belowAverage: "En dessous de la moyenne",
    poor: "Médiocre",
    dayAgo: "jour",
    wasAnExcellentRenter: "était un excellent locataire ! Ils ont communiqué clairement, ont récupéré et rendu la remorque à temps, et ont pris grand soin de l'équipement. Tout a été rendu en parfait état. Fortement recommandé pour les locations futures !",
    smoothTransactionWith: "Transaction fluide avec [Nom] ! Ils étaient ponctuels, polis et ont traité la remorque comme si c'était la leur. Fortement recommandé.",
    isATrustworthyRenter: "est un locataire digne de confiance. La remorque a été rendue en excellent état, et tout le processus s'est déroulé sans tracas. 5 étoiles !",
    outstandingExperience: "Expérience exceptionnelle ! [Nom] était facile à travailler, a suivi toutes les instructions et s'est assuré que la remorque restait en excellent état.",
    highlyRecommendedRenter: "Locataire fortement recommandé. [Nom] était organisé, courtois et a pris un excellent soin de la remorque pendant sa location.",
    readMore: "Lire la suite"
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

const ReviewBar = ({ label, percentage }) => (
  <div className="flex items-center flex-wrap mb-1 justify-between">
    <span className="text-sm text-gray-700 w-24">{label}</span>
    <div className='flex items-center gap-x-3'>
      <div className="w-[10rem] md:min-w-[20rem] bg-[#BBCBF0] rounded-sm h-2 mx-2">
        <div className="bg-[#2563EB] h-2 rounded-sm" style={{ width: `${percentage}%` }}></div>
      </div>
      <span className="text-sm text-gray-700 w-8 text-right">{percentage}%</span>

    </div>
  </div>
);

const ReviewCard = ({ name, rating, timeAgo, reviewText, avatar }) => (
  <div className="border-b border-gray-200 pb-4 mb-4  md:w-[50%]">

    <div className='flex justify-between items-center'>

      <div className='flex items-center gap-x-2'>
        <img src={manImage} alt={name} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="font-semibold text-gray-900 mr-2">{name}</p>
          <div className="flex text-[#2563EB]">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-gray-300'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

        </div>

      </div>

      <p className="text-gray-500 text-sm mb-2">{timeAgo}</p>

    </div>
    <p className="text-[#757982] text-sm mt-2">{reviewText}</p>
  </div>
);


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


            {/* ADD REVIEW SECTION HERE WITH TRANSLATION  */}
            <div className="border border-[#C3C3C3] p-5 rounded-lg mt-4">
              <h2 className="text-[20px] font-[600] text-[#0A0F18] mb-4">{translations.ratingsAndReviews}</h2>
              <div className="flex items-center mb-4">
                <span className="text-4xl font-bold text-gray-800 mr-2">4.5</span>
                <div className="flex text-[#2563EB]">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg
                    className="w-6 h-6 text-[#2563EB]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2L12.164 6.55L17.5 7.05L13.38 10.47L14.72 15.7L10 13.05L5.28 15.7L6.62 10.47L2.5 7.05L7.836 6.55L10 2Z" />
                  </svg>
                </div>
              </div>
              <div className="mb-6">
                <ReviewBar label={translations.excellent} percentage={70} />
                <ReviewBar label={translations.good} percentage={15} />
                <ReviewBar label={translations.average} percentage={5} />
                <ReviewBar label={translations.belowAverage} percentage={5} />
                <ReviewBar label={translations.poor} percentage={5} />
              </div>

              <div className="space-y-6">
                <ReviewCard
                  name="Joan Perkins"
                  rating={5}
                  timeAgo={`1 ${translations.dayAgo}`}
                  reviewText={translations.wasAnExcellentRenter}
                  avatar="https://via.placeholder.com/40"
                />
                <ReviewCard
                  name="Bessie Cooper"
                  rating={4}
                  timeAgo={`1 ${translations.dayAgo}`}
                  reviewText={translations.smoothTransactionWith}
                  avatar="https://via.placeholder.com/40"
                />
                <ReviewCard
                  name="Jenny Wilson"
                  rating={5}
                  timeAgo={`1 ${translations.dayAgo}`}
                  reviewText={translations.isATrustworthyRenter}
                  avatar="https://via.placeholder.com/40"
                />
                <ReviewCard
                  name="Ronald Richards"
                  rating={5}
                  timeAgo={`1 ${translations.dayAgo}`}
                  reviewText={translations.outstandingExperience}
                  avatar="https://via.placeholder.com/40"
                />
                <ReviewCard
                  name="Darlene Robertson"
                  rating={4}
                  timeAgo={`1 ${translations.dayAgo}`}
                  reviewText={translations.highlyRecommendedRenter}
                  avatar="https://via.placeholder.com/40"
                />
              </div>
              <button className="mt-6 bg-[#2563EB] text-white hover:underline text-sm p-3 rounded-md">
                {translations.readMore}
              </button>
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