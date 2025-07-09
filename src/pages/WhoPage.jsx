import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhoImage from '../assets/landing/who.png';
import Image from '../assets/landing/image.png';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { TbMoneybag } from "react-icons/tb";
import { MdOutlineCancel } from 'react-icons/md';
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
        transition: { duration: 0.8, ease: 'easeOut' },
    },
};

const zoomBounce = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: { type: 'spring', bounce: 0.4, duration: 0.8 },
    },
};

// Translations for the WhoPage
const whoPageTranslations = {
    en: {
        whoAreWe: "Who are we",
        description1: "The leading peer-to-peer trailer rental marketplace in Quebec. We connect trailer owners with individuals looking to rent trailers on a safe, secure, and user-friendly platform designed to simplify trailer rentals.",
        description2: "We are a trusted trailer rental platform. From construction entrepreneurs to landscaping professionals, farmers, and more, many people search for trailers to rent without access to a reliable platform to meet their needs...",
        description3: "That's why Lorepa was created: to bridge this gap by offering a simple, advantageous solution...",
        whyLorepa: "Why Lorepa",
        easyProfitableTitle: "Easy and Profitable: Rent your trailers to others",
        easyProfitableText: "Join us and contribute to secure a rental community.",
        freeCancellationTitle: "Free Cancellation",
        freeCancellationText: "Cancel for a full refund up to 24 hours before the rental starts.",
        earnMoneyTitle: "Earn money when not using the trailer",
        earnMoneyText: "Offer a solution to local people while increasing your revenue.",
        supportTeamTitle: "Our support team is just a message away",
        supportTeamText: "Chat with us for fast and personalized assistance.", // Corrected "fear" to "fast"
        rentTrailerButton: "Rent a trailer",
        becomeHostButton: "Become a host"
    },
    es: {
        whoAreWe: "¿Quiénes somos?",
        description1: "El principal mercado de alquiler de remolques entre particulares en Quebec. Conectamos a propietarios de remolques con personas que buscan alquilar remolques en una plataforma segura, protegida y fácil de usar, diseñada para simplificar el alquiler de remolques.",
        description2: "Somos una plataforma de alquiler de remolques de confianza. Desde empresarios de la construcción hasta profesionales del paisajismo, agricultores y más, muchas personas buscan remolques para alquilar sin acceso a una plataforma confiable que satisfaga sus necesidades...",
        description3: "Por eso se creó Lorepa: para cerrar esta brecha ofreciendo una solución sencilla y ventajosa...",
        whyLorepa: "¿Por qué Lorepa?",
        easyProfitableTitle: "Fácil y rentable: Alquila tus remolques a otros",
        easyProfitableText: "Únete a nosotros y contribuye a asegurar una comunidad de alquiler.",
        freeCancellationTitle: "Cancelación gratuita",
        freeCancellationText: "Cancela para obtener un reembolso completo hasta 24 horas antes de que comience el alquiler.",
        earnMoneyTitle: "Gana dinero cuando no uses el remolque",
        earnMoneyText: "Ofrece una solución a la gente local mientras aumentas tus ingresos.",
        supportTeamTitle: "Nuestro equipo de soporte está a solo un mensaje de distancia",
        supportTeamText: "Chatea con nosotros para obtener asistencia rápida y personalizada.",
        rentTrailerButton: "Alquilar un remolque",
        becomeHostButton: "Convertirse en anfitrión"
    },
    cn: {
        whoAreWe: "我们是谁",
        description1: "魁北克领先的P2P拖车租赁市场。我们将拖车车主与寻求租用拖车的个人连接起来，在一个安全、可靠且用户友好的平台上，旨在简化拖车租赁。",
        description2: "我们是一个值得信赖的拖车租赁平台。从建筑企业家到园林绿化专业人士，农民等等，许多人寻找拖车租赁，但没有可靠的平台来满足他们的需求...",
        description3: "这就是Lorepa创立的原因：通过提供一个简单、有利的解决方案来弥补这一差距...",
        whyLorepa: "为什么选择Lorepa",
        easyProfitableTitle: "简单且有利可图：将您的拖车租给他人",
        easyProfitableText: "加入我们，为建立安全的租赁社区做出贡献。",
        freeCancellationTitle: "免费取消",
        freeCancellationText: "在租赁开始前24小时内取消可获得全额退款。",
        earnMoneyTitle: "不使用拖车时赚钱",
        earnMoneyText: "为当地人提供解决方案，同时增加您的收入。",
        supportTeamTitle: "我们的支持团队随时待命",
        supportTeamText: "与我们聊天，获得快速和个性化的帮助。",
        rentTrailerButton: "租赁拖车",
        becomeHostButton: "成为房东"
    },
    fr: {
        whoAreWe: "Qui sommes-nous",
        description1: "La principale place de marché de location de remorques entre particuliers au Québec. Nous connectons les propriétaires de remorques avec les personnes souhaitant louer des remorques sur une plateforme sûre, sécurisée et conviviale conçue pour simplifier la location de remorques.",
        description2: "Nous sommes une plateforme de location de remorques de confiance. Des entrepreneurs en construction aux professionnels de l'aménagement paysager, aux agriculteurs, et plus encore, de nombreuses personnes recherchent des remorques à louer sans avoir accès à une plateforme fiable pour répondre à leurs besoins...",
        description3: "C'est pourquoi Lorepa a été créé : pour combler cette lacune en offrant une solution simple et avantageuse...",
        whyLorepa: "Pourquoi Lorepa",
        easyProfitableTitle: "Facile et rentable : Louez vos remorques à d'autres",
        easyProfitableText: "Rejoignez-nous et contribuez à sécuriser une communauté de location.",
        freeCancellationTitle: "Annulation gratuite",
        freeCancellationText: "Annulez pour un remboursement intégral jusqu'à 24 heures avant le début de la location.",
        earnMoneyTitle: "Gagnez de l'argent lorsque vous n'utilisez pas la remorque",
        earnMoneyText: "Offrez une solution aux habitants locaux tout en augmentant vos revenus.",
        supportTeamTitle: "Notre équipe de support est à un message de distance",
        supportTeamText: "Discutez avec nous pour une assistance rapide et personnalisée.",
        rentTrailerButton: "Louer une remorque",
        becomeHostButton: "Devenir hôte"
    }
};

const WhoPage = () => {
    // Initialize translations based on localStorage, default to 'en'
    const [translations, setTranslations] = useState(() => {
        const storedLang = localStorage.getItem('lang');
        return whoPageTranslations[storedLang] || whoPageTranslations.en;
    });

    useEffect(() => {
        window.scrollTo(0, 0);

        // Listener for changes in localStorage 'lang' key
        const handleStorageChange = () => {
            const storedLang = localStorage.getItem('lang');
            setTranslations(whoPageTranslations[storedLang] || whoPageTranslations.en);
        };

        window.addEventListener('storage', handleStorageChange);

        // Initial check in case the lang was set before the component mounted
        handleStorageChange();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

    return (
        <div className="text-black overflow-x-hidden">
            <Navbar />

            <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                viewport={{ once: false, amount: 0.3 }}
                className="flex justify-between items-start gap-x-10 flex-wrap p-5"
            >
                <div className="mt-2 flex-1">
                    <motion.h1 className="text-3xl mb-3" variants={fadeInUp}>
                        {translations.whoAreWe}
                    </motion.h1>
                    {[
                        translations.description1,
                        translations.description2,
                        translations.description3,
                    ].map((text, index) => (
                        <motion.p
                            key={index}
                            className="text-xs mt-2"
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            viewport={{ once: false, amount: 0.3 }}
                        >
                            {text}
                        </motion.p>
                    ))}
                </div>

                <motion.img
                    src={WhoImage}
                    alt="Who we are"
                    className="mt-2"
                    variants={zoomBounce}
                    initial="hidden"
                    animate="visible"
                    viewport={{ once: false, amount: 0.3 }}
                />
            </motion.div>

            <motion.h1
                className="text-3xl mb-10 text-center"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
            >
                {translations.whyLorepa}
            </motion.h1>

            <div className="flex flex-col md:flex-row items-center justify-center p-5">
                {/* Left Column */}
                <motion.div
                    className="flex-1 flex flex-col items-center md:items-start md:pl-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <div className="mb-8 max-w-sm">
                        <TbMoneybag className="text-[#2563EB] mb-2" size={24} />
                        <h2 className="text-lg font-medium mb-2">
                            {translations.easyProfitableTitle}
                        </h2>
                        <p className="text-sm text-gray-700">
                            {translations.easyProfitableText}
                        </p>
                    </div>

                    <div className="max-w-sm">
                        <MdOutlineCancel className="text-[#2563EB] mb-2" size={24} />
                        <h2 className="text-lg font-medium mb-2">{translations.freeCancellationTitle}</h2>
                        <p className="text-sm text-gray-700">
                            {translations.freeCancellationText}
                        </p>
                    </div>
                </motion.div>

                {/* Image Middle */}
                <motion.div
                    className="flex-shrink-0 mb-8 md:mb-0"
                    variants={zoomBounce}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <img
                        src={Image}
                        alt="Why Lorepa"
                        className="my-10 max-w-xs md:max-w-md lg:max-w-lg h-auto rounded-lg shadow-lg"
                    />
                </motion.div>

                {/* Right Column */}
                <motion.div
                    className="flex-1 flex flex-col items-center md:items-start text-left md:pl-10"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <div className="mb-8 max-w-sm">
                        <TbMoneybag className="text-[#2563EB] mb-2" size={24} />
                        <h2 className="text-lg font-medium mb-2">
                            {translations.earnMoneyTitle}
                        </h2>
                        <p className="text-sm text-gray-700">
                            {translations.earnMoneyText}
                        </p>
                    </div>
                    <div className="max-w-sm">
                        <FaRegQuestionCircle className="text-[#2563EB] mb-2" size={24} />
                        <h2 className="text-lg font-medium mb-2">
                            {translations.supportTeamTitle}
                        </h2>
                        <p className="text-sm text-gray-700">
                            {translations.supportTeamText}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Buttons Section */}
            <motion.div
                className="flex justify-center space-x-4 my-10"
                variants={zoomBounce}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
            >
                <button className="px-6 py-3 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100">
                    {translations.rentTrailerButton}
                </button>
                <button className="px-6 py-3 border border-gray-300 rounded-md text-gray-800 hover:bg-gray-100">
                    {translations.becomeHostButton}
                </button>
            </motion.div>

            {/* Animate Footer Safely */}
            <motion.div
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
            >
                <Footer />
            </motion.div>
        </div>
    );
};

export default WhoPage;