import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
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
        transition: { duration: 0.8 },
    },
};

// Translations for the ContactPage
const contactPageTranslations = {
    en: {
        contactUs: "Contact us",
        tagline: "If you have questions or need help, just ask!",
        messageLabel: "What can we help you with?",
        messagePlaceholder: "Type here",
        or: "OR",
        phoneNumber: "+1 438 282 6718",
        email: "contact@lorepa.com",
        submitButton: "Submit",
        messageSubmitted: "Your message has been submitted!"
    },
    es: {
        contactUs: "Contáctanos",
        tagline: "Si tienes preguntas o necesitas ayuda, ¡solo pregunta!",
        messageLabel: "¿En qué podemos ayudarte?",
        messagePlaceholder: "Escribe aquí",
        or: "O",
        phoneNumber: "+1 438 282 6718",
        email: "contact@lorepa.com",
        submitButton: "Enviar",
        messageSubmitted: "¡Tu mensaje ha sido enviado!"
    },
    cn: {
        contactUs: "联系我们",
        tagline: "如果您有问题或需要帮助，请尽管提问！",
        messageLabel: "我们能为您提供什么帮助？",
        messagePlaceholder: "在此输入",
        or: "或",
        phoneNumber: "+1 438 282 6718",
        email: "contact@lorepa.com",
        submitButton: "提交",
        messageSubmitted: "您的消息已提交！"
    },
    fr: {
        contactUs: "Contactez-nous",
        tagline: "Si vous avez des questions ou besoin d'aide, n'hésitez pas à demander !",
        messageLabel: "Comment pouvons-nous vous aider ?",
        messagePlaceholder: "Tapez ici",
        or: "OU",
        phoneNumber: "+1 438 282 6718",
        email: "contact@lorepa.com",
        submitButton: "Soumettre",
        messageSubmitted: "Votre message a été soumis !"
    }
};

const ContactPage = () => {
    const [message, setMessage] = useState('');
    // Initialize translations based on localStorage, default to 'en'
    const [translations, setTranslations] = useState(() => {
        const storedLang = localStorage.getItem('lang');
        return contactPageTranslations[storedLang] || contactPageTranslations.fr;
    });

    useEffect(() => {
        // Listener for changes in localStorage 'lang' key
        const handleStorageChange = () => {
            const storedLang = localStorage.getItem('lang');
            setTranslations(contactPageTranslations[storedLang] || contactPageTranslations.fr);
        };

        window.addEventListener('storage', handleStorageChange);

        // Initial check in case the lang was set before the component mounted
        handleStorageChange();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Message submitted:', message);
        alert(translations.messageSubmitted); // Use translated message
        setMessage('');
    };

    return (
        <div className="min-h-screen bg-white text-black overflow-x-hidden">
            <Navbar />

            <motion.div
                className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <motion.div
                    className="w-full max-w-md text-center"
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    viewport={{ once: false, amount: 0.3 }}
                >
                    <motion.h1 className="text-4xl font-medium mb-4" variants={fadeInUp}>
                        {translations.contactUs}
                    </motion.h1>
                    <motion.p className="text-lg text-gray-700 mb-8" variants={fadeInUp}>
                        {translations.tagline}
                    </motion.p>

                    <form onSubmit={handleSubmit} className="w-full">
                        {/* Message Textarea */}
                        <motion.div className="mb-6" variants={fadeInUp}>
                            <label
                                htmlFor="message"
                                className="block text-left text-lg font-medium text-gray-700 mb-2"
                            >
                                {translations.messageLabel}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="6"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-base"
                                placeholder={translations.messagePlaceholder}
                                required
                            ></textarea>
                        </motion.div>

                        {/* OR separator */}
                        <motion.div className="relative my-8" variants={fadeInUp}>
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500 text-lg">{translations.or}</span>
                            </div>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div className="space-y-4 mb-8" variants={fadeInUp}>
                            <div className="flex items-center text-gray-700 text-lg">
                                <FaPhone className="mr-3" size={20} />
                                <span>{translations.phoneNumber}</span>
                            </div>
                            <div className="flex items-center text-gray-700 text-lg">
                                <FaEnvelope className="mr-3" size={20} />
                                <span>{translations.email}</span>
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            variants={fadeInUp}
                        >
                            {translations.submitButton}
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>

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

export default ContactPage;