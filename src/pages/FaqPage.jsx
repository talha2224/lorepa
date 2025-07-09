import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import config from '../config';

// Animation Variants
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5 },
    }),
};

// Translations for the FAQ Page
const faqPageTranslations = {
    en: {
        faqTitle: "FAQ",
        guestsTab: "Guests",
        hostsTab: "Hosts",
        noAnswer: "Didn't find any answer to your question?",
        contactUsButton: "Contact us"
    },
    es: {
        faqTitle: "Preguntas frecuentes",
        guestsTab: "Invitados",
        hostsTab: "Anfitriones",
        noAnswer: "¿No encontraste respuesta a tu pregunta?",
        contactUsButton: "Contáctanos"
    },
    cn: {
        faqTitle: "常见问题",
        guestsTab: "访客",
        hostsTab: "房东",
        noAnswer: "没有找到您问题的答案？",
        contactUsButton: "联系我们"
    },
    fr: {
        faqTitle: "FAQ",
        guestsTab: "Invités",
        hostsTab: "Hôtes",
        noAnswer: "Vous n'avez pas trouvé de réponse à votre question ?",
        contactUsButton: "Contactez-nous"
    }
};

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border border-[#EEEEEE] rounded-md mb-3 bg-white overflow-hidden"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left font-medium text-black"
            >
                {question}
                {isOpen ? <FaAngleUp /> : <FaAngleDown />}
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="answer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 pb-4 text-gray-700 text-sm"
                    >
                        {answer}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FaqPage = () => {
    const [activeTab, setActiveTab] = useState('Guests');
    const [faqGuest, setFaqGuest] = useState([]);
    const [faqHost, setFaqHost] = useState([]);
    const currentFAQs = activeTab === 'Guests' ? faqGuest : faqHost;

    // State for translations
    const [translations, setTranslations] = useState(() => {
        const storedLang = localStorage.getItem('lang');
        return faqPageTranslations[storedLang] || faqPageTranslations.en;
    });

    useEffect(() => {
        window.scrollTo(0, 0);

        // Listener for changes in localStorage 'lang' key
        const handleStorageChange = () => {
            const storedLang = localStorage.getItem('lang');
            setTranslations(faqPageTranslations[storedLang] || faqPageTranslations.en);
        };

        window.addEventListener('storage', handleStorageChange);

        // Initial check in case the lang was set before the component mounted
        handleStorageChange();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                // You would need to update your backend or API to serve translated FAQ content
                // For demonstration, let's assume `faqRes.data.data` contains objects
                // with `question` and `answer` properties that are already translated
                // based on a lang parameter sent with the request, or the backend
                // detects lang from headers/cookies.
                // For simplicity here, we're still fetching all and filtering by type.
                // In a real scenario, you might fetch:
                // axios.get(`${config.baseUrl}/content/faq?lang=${localStorage.getItem('lang') || 'en'}`)

                const [faqRes] = await Promise.all([
                    axios.get(`${config.baseUrl}/content/faq`)
                ]);

                // Assuming the fetched FAQ items' question and answer properties
                // are already in the correct lang or can be mapped using a translation key
                setFaqGuest(faqRes.data.data.filter(item => item.type === "guest"));
                setFaqHost(faqRes.data.data.filter(item => item.type === "host"));
            } catch (error) {
                console.error("Failed to fetch landing content:", error);
            }
        };

        fetchContent();
    }, [translations]); // Rerun fetchContent when translations change to potentially get localized FAQ content

    return (
        <div className="min-h-screen text-black bg-[#F9FAFB]">
            <Navbar />

            <div className="p-4">
                {/* Title */}
                <motion.h1
                    className="text-3xl font-bold text-center mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {translations.faqTitle}
                </motion.h1>

                {/* Tabs */}
                <div className="mb-6 ">
                    <button
                        onClick={() => setActiveTab('Guests')}
                        className={`px-6 py-3 rounded-t-lg text-lg font-medium transition-colors duration-200 ${activeTab === 'Guests' && 'bg-white border-b-2 border-blue-600 text-blue-600'
                            }`}
                    >
                        {translations.guestsTab}
                    </button>
                    <button
                        onClick={() => setActiveTab('Hosts')}
                        className={`px-6 py-3 rounded-t-lg text-lg font-medium transition-colors duration-200 ${activeTab === 'Hosts' && 'bg-white border-b-2 border-blue-600 text-blue-600'
                            }`}
                    >
                        {translations.hostsTab}
                    </button>
                </div>

                {/* Accordion Content */}
                <motion.div
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                >
                    {currentFAQs.map((faq, i) => (
                        <motion.div key={i} custom={i} variants={fadeInUp}>
                            <AccordionItem question={faq.question} answer={faq.answer} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-12 p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <p className="text-lg text-gray-700 mb-6">{translations.noAnswer}</p>
                    <button className="px-8 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200 text-sm">
                        {translations.contactUsButton}
                    </button>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default FaqPage;