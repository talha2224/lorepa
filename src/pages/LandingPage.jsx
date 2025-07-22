import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../assets/landing/hero.png";
import Img from "../assets/landing/img.png";
import Host1 from "../assets/landing/host.svg";
import Host2 from "../assets/landing/host2.png";
import {
  FaAngleDown,
  FaAngleUp,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
  FaLongArrowAltRight,
} from "react-icons/fa";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom";

const translations = {
  en: {
    trailerRental: "Trailer rental reinvented",
    rentAnywhere: "Rent the trailer you want, wherever you want!",
    where: "Where",
    placeholder: "City, airport, hotel",
    from: "From",
    until: "Until",
    newWay: "The new way to rent a trailer 24/7!",
    discover: "Discover the premier platform for trailer sharing between individuals in Qubec.",
    needTrailer: "Whether You Need a Trailer",
    shareOne: "or Have One to Share",
    trustedBy: "Trusted by 1000 +",
    leadingPlatform: "Our company is the leading sharing platform where you can book any type of trailer from private individuals,",
    dynamicCommunity: "whatever the occasion, with a dynamic community of trusted hosts.",
    thankYou: "You are one of 1000 + people who trust us completely, Thank you!",
    popularLocations: "Popular Locations",
    carHauler: "Car Hauler Trailer",
    faq: "Frequently asked questions",
    seeAllFaq: "See all FAQ",
    guests: "Guests",
    hosts: "Hosts"
  },
  es: {
    trailerRental: "Alquiler de remolques reinventado",
    rentAnywhere: "¡Alquila el remolque que quieras, donde quieras!",
    where: "Dónde",
    placeholder: "Ciudad, aeropuerto, hotel",
    from: "Desde",
    until: "Hasta",
    newWay: "¡La nueva forma de alquilar un remolque 24/7!",
    discover: "Descubre la plataforma líder para compartir remolques entre particulares en Quebec.",
    needTrailer: "Ya sea que necesites un remolque",
    shareOne: "o tengas uno para compartir",
    trustedBy: "Confiado por más de 1000 +",
    leadingPlatform: "Nuestra empresa es la plataforma líder para compartir donde puedes reservar cualquier tipo de remolque a particulares,",
    dynamicCommunity: "cualquiera sea la ocasión, con una comunidad dinámica de anfitriones confiables.",
    thankYou: "¡Eres una de las más de 1000 personas que confían completamente en nosotros, gracias!",
    popularLocations: "Lugares populares",
    carHauler: "Remolque para autos",
    faq: "Preguntas frecuentes",
    seeAllFaq: "Ver todas las FAQ",
    guests: "Invitados",
    hosts: "Anfitriones"
  },
  cn: {
    trailerRental: "拖车租赁新体验",
    rentAnywhere: "随时随地租您想要的拖车！",
    where: "地点",
    placeholder: "城市、机场、酒店",
    from: "从",
    until: "直到",
    newWay: "全天候租拖车的新方式！",
    discover: "探索魁北克领先的个人拖车共享平台。",
    needTrailer: "无论您是否需要拖车",
    shareOne: "或愿意共享一个",
    trustedBy: "1000+ 信任用户",
    leadingPlatform: "我们公司是领先的共享平台，您可以从个人手中预订各种类型的拖车，",
    dynamicCommunity: "无论场合如何，拥有值得信赖的动态社区主机。",
    thankYou: "感谢您成为 1000+ 完全信任我们的人之一！",
    popularLocations: "热门地点",
    carHauler: "汽车托运拖车",
    faq: "常见问题",
    seeAllFaq: "查看所有 FAQ",
    guests: "客人",
    hosts: "房东"
  },
  fr: {
    trailerRental: "Location de remorque réinventée",
    rentAnywhere: "Louez la remorque que vous voulez, où vous voulez !",
    where: "Où",
    placeholder: "Ville, aéroport, hôtel",
    from: "De",
    until: "Jusqu'à",
    newWay: "La nouvelle façon de louer une remorque 24h/24 et 7j/7 !",
    discover: "Découvrez la plateforme leader de partage de remorques entre particuliers au Québec.",
    needTrailer: "Que vous ayez besoin d'une remorque",
    shareOne: "ou que vous en ayez une à partager",
    trustedBy: "Fiable par plus de 1000 +",
    leadingPlatform: "Notre entreprise est la principale plateforme de partage où vous pouvez réserver tout type de remorque auprès de particuliers,",
    dynamicCommunity: "quelle que soit l'occasion, avec une communauté dynamique d'hôtes de confiance.",
    thankYou: "Vous êtes l'une des 1000+ personnes qui nous font entièrement confiance, merci !",
    popularLocations: "Lieux populaires",
    carHauler: "Remorque pour voiture",
    faq: "Questions fréquemment posées",
    seeAllFaq: "Voir toutes les FAQ",
    guests: "Invités",
    hosts: "Hôtes"
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

const flipIn = {
  hidden: { rotateY: 90, opacity: 0 },
  visible: { rotateY: 0, opacity: 1, transition: { duration: 1 } },
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
};

const zoomBounce = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 1.2 },
  },
};

const blurIn = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2 },
  },
};

const rotateIn = {
  hidden: { rotate: -180, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-md mb-3 bg-white"
    >
      <button
        className="w-full flex justify-between items-center p-4 text-left font-medium text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question} {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-[#D1D5DB] text-gray-700">
          {answer}
        </div>
      )}
    </motion.div>
  );
};

const AnimatedText = ({ text, variant, className = "" }) => (
  <motion.h1
    variants={variant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className={`text-center ${className}`}
  >
    {text}
  </motion.h1>
);

const LandingPage = () => {
  const [trustedBy, setTrustedBy] = useState([]);
  const [locations, setLocations] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [faqGuest, setFaqGuest] = useState([]);
  const [faqHost, setFaqHost] = useState([]);
  const [translationsData, setTranslationsData] = useState(() => {
    const storedLang = localStorage.getItem('lang');
    return translations[storedLang] || translations.en; // Fallback to English if storedLang is not found
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLang = localStorage.getItem('lang');
      setTranslationsData(translations[storedLang] || translations.en);
    };

    window.addEventListener('storage', handleStorageChange);
    // Also run on mount to ensure the latest language is picked up if it changes externally
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [trustedRes, locationRes, trailerRes, faqRes] = await Promise.all([
          axios.get(`${config.baseUrl}/content/trusted`),
          axios.get(`${config.baseUrl}/content/locations`),
          axios.get(`${config.baseUrl}/content/trailers`),
          axios.get(`${config.baseUrl}/content/faq`)
        ]);

        setTrustedBy(trustedRes.data.data);
        setLocations(locationRes.data.data);
        setTrailers(trailerRes.data.data);
        setFaqGuest(faqRes.data.data.filter(item => item.type === "guest"));
        setFaqHost(faqRes.data.data.filter(item => item.type === "host"));
      } catch (error) {
        console.error("Failed to fetch landing content:", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <div className="w-screen min-h-screen bg-[#fff] flex flex-col overflow-x-hidden">
      <motion.div variants={fadeInDown} initial="hidden" animate="visible">
        {/* Assuming Navbar also needs to know the current language */}
        <Navbar currentLanguage={translationsData} />
      </motion.div>

      <div style={{ backgroundImage: `url(${Hero})` }} className="relative min-h-[110vh] w-screen bg-cover">
        <motion.div variants={zoomBounce} initial="hidden" animate="visible" className="w-full flex justify-center items-center flex-col">
          <AnimatedText text={translationsData?.trailerRental} variant={fadeInUp} className="text-white text-xl md:text-6xl mt-[3rem]" />
          <AnimatedText text={translationsData?.rentAnywhere} variant={fadeIn} className="text-white text-sm mt-2 font-medium" />
          <motion.div variants={blurIn} initial="hidden" animate="visible" className="bg-white md:bg-opacity-100 bg-opacity-80 rounded-md p-3 sm:w-[80%] w-[90%] mx-20 my-10 md:flex justify-center items-center flex-wrap">
            <div className="flex-1 border border-[#9DA0A6] mt-1 mr-3 py-1 px-6 rounded-[2rem]">
              <h1 className="text-sm">{translationsData?.where}</h1>
              <input type="text" placeholder={translationsData?.placeholder} className="border-none bg-transparent outline-none placeholder:text-[#9DA0A6] flex-1 text-sm" />
            </div>
            <div className="flex-1 border border-[#9DA0A6] mt-1 mr-3 py-1 px-6 rounded-[2rem]">
              <h1 className="text-sm">{translationsData?.from}</h1>
              <div className="flex justify-between items-center gap-x-1">
                <input type="date" className="border-none bg-transparent outline-none placeholder:text-[#9DA0A6] flex-1" />
              </div>
            </div>
            <div className="flex-1 border border-[#9DA0A6] mt-1 mr-3 py-1 px-6 rounded-[2rem]">
              <h1 className="text-sm">{translationsData?.until}</h1>
              <div className="flex justify-between items-center gap-x-1">
                <input type="date" className="border-none bg-transparent outline-none placeholder:text-[#9DA0A6] flex-1" />
              </div>
            </div>
            <div className="md:w-[3rem] md:flex-none flex-1 md:mt-0 mt-2">
              <Link to={"/trailers"} className="w-[3rem] h-[3rem] bg-[#2563EB] rounded-full flex justify-center items-center text-white">
                <FaSearch />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="flex justify-center items-center flex-col my-10 p-3">
        <AnimatedText text={translationsData.newWay} variant={flipIn} className="text-[40px] font-medium text-black" />
        <AnimatedText
          text={translationsData.discover}
          variant={fadeInUp}
          className="text-xs text-black mt-1"
        />
        <motion.img variants={scaleIn} src={Img} alt="" className="mt-6" />
      </motion.div>

      <div className="bg-[#2563EB] px-3 py-5">
        <AnimatedText
          text={translationsData.needTrailer}
          variant={fadeInDown}
          className="text-[40px] text-white font-semibold mt-10"
        />
        <AnimatedText
          text={translationsData.shareOne}
          variant={fadeInDown}
          className="text-[40px] text-white font-semibold mb-10"
        />
        <div className="flex justify-center items-center flex-wrap gap-x-5">
          {[Host1, Host2].map((src, i) => (
            <motion.div
              key={i}
              variants={flipIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Link to={i == 0 ? "/booking" : "host"}>
                <img src={src} alt="Host" className="mt-5" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div variants={flipIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="flex justify-center items-center flex-col bg-[#E9EFFD] py-[4rem] px-3">
        <AnimatedText text={translationsData.trustedBy} variant={fadeInDown} className="text-[40px] text-black font-semibold" />
        <AnimatedText text={translationsData.leadingPlatform} variant={fadeInUp} className="text-xs text-black mt-1" />
        <AnimatedText text={translationsData.dynamicCommunity} variant={fadeInUp} className="text-xs text-black mt-1" />
        <div className="flex flex-wrap justify-center gap-0 mt-6">
          {trustedBy.map((item, i) => (
            // w-[3rem] h-[3rem] object-cover rounded-full
            <img key={i} src={item.image} alt="trusted" className="" />
          ))}
        </div>

        <AnimatedText text={translationsData.thankYou} variant={blurIn} className="text-sm font-bold text-black mt-3" />
      </motion.div>

      <motion.div variants={flipIn} whileInView="visible" className="flex justify-center items-center flex-col p-3">
        <AnimatedText text={translationsData.popularLocations} variant={scaleIn} className="text-2xl text-black font-semibold mt-10" />
        <Link to={"/trailers"} className="flex overflow-x-auto gap-10 mt-6 w-[100%] px-4">
          {locations.map((loc, i) => (
            <div key={i}>
              <img
                src={loc.image}
                alt={loc.title}
                className="max-w-[15rem] min-w-[15rem] min-h-[10rem] max-h-[10rem] rounded-md"
              />
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium mt-2 text-black">{loc.title}</p>
                <FaLongArrowAltRight className="text-blue-700" />
              </div>
            </div>
          ))}
        </Link>

      </motion.div>

      <motion.div
        variants={zoomBounce}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex justify-center items-center flex-col bg-[#0A0F18] p-3 text-white"
      >
        <div className="flex justify-between items-center mt-10 w-full flex-wrap">
          <AnimatedText
            text={translationsData.carHauler}
            variant={fadeInUp}
            className="text-2xl font-semibold mt-2"
          />
          <div className="flex justify-between items-center gap-x-3 mt-2">
            {[FaAngleLeft, FaAngleRight].map((Icon, i) => (
              <div
                key={i}
                className="bg-white w-[2rem] h-[2rem] rounded-full text-black flex justify-center items-center"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
        <Link to={"/trailers"} className="flex overflow-x-auto gap-5 mt-6 w-[100%] px-4">
          {trailers.map((item, i) => (
            <div key={i} className="relative cursor-pointer">
              <img src={item.image} alt={item.title} className="rounded-md max-w-[22rem] min-w-[22rem] min-h-[16rem] max-h-[16rem] bg-contain" />
              <p className="absolute bottom-5 left-5">{item.title}</p>
            </div>
          ))}
        </Link>
      </motion.div>

      <div className="px-5 py-5 text-black">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-between items-center mt-10 w-full flex-wrap text-black"
        >
          <AnimatedText
            text={translationsData.faq}
            variant={fadeInUp}
            className="text-lg sm:text-2xl font-semibold mt-2"
          />
          <button className="px-3 py-2 mt-2 rounded-md bg-[#2563EB] text-white text-xs">
            {translationsData.seeAllFaq}
          </button>
        </motion.div>
        <div className="flex flex-wrap justify-between gap-x-5 mt-8">
          {[faqGuest, faqHost].map((data, i) => (
            <motion.div
              key={i}
              variants={flipIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md mt-8 md:mt-0"
            >
              <AnimatedText
                text={i === 0 ? translationsData.guests : translationsData.hosts}
                variant={fadeInUp}
                className="text-xl font-semibold mb-4"
              />
              {data.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

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

export default LandingPage;