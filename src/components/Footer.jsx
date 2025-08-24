import React, { useEffect, useState } from 'react';
import { FaFacebook, FaGooglePlay, FaInstagram, FaLinkedinIn, FaTiktok, FaTwitter } from 'react-icons/fa';
import { IoLogoAppleAppstore } from 'react-icons/io5';
import { MdLanguage } from 'react-icons/md';
import { Link } from 'react-router-dom';

const footerTranslations = {
    en: {
        lorepa: "Lorepa",
        about: "About",
        faq: "FAQ",
        getStarted: "Get Started",
        createAccount: "Create account",
        findTrailer: "Find a Trailer",
        becomeHost: "Become a Host",
        locations: "Locations",
        montreal: "Montreal",
        quebecCity: "Quebec city",
        gatineau: "Gatineau",
        sherbrooke: "Sherbrooke",
        levis: "Lévis",
        support: "Support",
        helpCenter: "Help center",
        contactUs: "Contact us",
        downloadAppStore: "Download on the App Store",
        downloadGooglePlay: "Download on the Google Play",
        english: "English",
        address: "3910 Rue de Bellechasse, Montréal, Québec, H1X 1J4",
        allRightsReserved: "© 2025 Lorepa. All rights reserved.",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        cookiePolicy: "Cookie Policy",
        legalNotice: "Legal Notice"
    },
    es: {
        lorepa: "Lorepa",
        about: "Acerca de",
        faq: "Preguntas frecuentes",
        getStarted: "Empezar",
        createAccount: "Crear cuenta",
        findTrailer: "Encontrar un remolque",
        becomeHost: "Conviértete en anfitrión",
        locations: "Ubicaciones",
        montreal: "Montreal",
        quebecCity: "Ciudad de Quebec",
        gatineau: "Gatineau",
        sherbrooke: "Sherbrooke",
        levis: "Lévis",
        support: "Soporte",
        helpCenter: "Centro de ayuda",
        contactUs: "Contáctanos",
        downloadAppStore: "Descargar en la App Store",
        downloadGooglePlay: "Descargar en Google Play",
        english: "Español",
        address: "3910 Rue de Bellechasse, Montréal, Québec, H1X 1J4",
        allRightsReserved: "© 2025 Lorepa. Todos los derechos reservados.",
        privacyPolicy: "Política de privacidad",
        termsOfService: "Términos de servicio",
        cookiePolicy: "Política de cookies",
        legalNotice: "Aviso legal"
    },
    cn: {
        lorepa: "Lorepa",
        about: "关于",
        faq: "常见问题",
        getStarted: "开始使用",
        createAccount: "创建账户",
        findTrailer: "查找拖车",
        becomeHost: "成为房东",
        locations: "地点",
        montreal: "蒙特利尔",
        quebecCity: "魁北克市",
        gatineau: "加蒂诺",
        sherbrooke: "舍布鲁克",
        levis: "莱维",
        support: "支持",
        helpCenter: "帮助中心",
        contactUs: "联系我们",
        downloadAppStore: "在App Store下载",
        downloadGooglePlay: "在Google Play下载",
        english: "中文",
        address: "3910 Rue de Bellechasse, Montréal, Québec, H1X 1J4",
        allRightsReserved: "© 2025 Lorepa. 版权所有。",
        privacyPolicy: "隐私政策",
        termsOfService: "服务条款",
        cookiePolicy: "Cookie政策",
        legalNotice: "法律声明"
    },
    fr: {
        lorepa: "Lorepa",
        about: "À propos",
        faq: "FAQ",
        getStarted: "Commencer",
        createAccount: "Créer un compte",
        findTrailer: "Trouver une remorque",
        becomeHost: "Devenir hôte",
        locations: "Lieux",
        montreal: "Montréal",
        quebecCity: "Ville de Québec",
        gatineau: "Gatineau",
        sherbrooke: "Sherbrooke",
        levis: "Lévis",
        support: "Soutien",
        helpCenter: "Centre d'aide",
        contactUs: "Nous contacter",
        downloadAppStore: "Télécharger sur l'App Store",
        downloadGooglePlay: "Télécharger sur Google Play",
        english: "Français",
        address: "3910 Rue de Bellechasse, Montréal, Québec, H1X 1J4",
        allRightsReserved: "© 2025 Lorepa. Tous droits réservés.",
        privacyPolicy: "Politique de confidentialité",
        termsOfService: "Conditions d'utilisation",
        cookiePolicy: "Politique de cookies",
        legalNotice: "Mentions légales"
    }
};


const Footer = () => {
    const isLogin = localStorage.getItem("userId");
    const [translations, setTranslations] = useState(() => {
        const storedLang = localStorage.getItem('lang');
        return footerTranslations[storedLang] || footerTranslations.en; // Default to English
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const storedLang = localStorage.getItem('lang');
            setTranslations(footerTranslations[storedLang] || footerTranslations.en);
        };

        window.addEventListener('storage', handleStorageChange);
        // Also run on mount to ensure the latest lang is picked up if it changes externally
        handleStorageChange();

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <footer className="bg-[#F1F1F1] text-black p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {/* Section 1: Lorepa */}
                <div>
                    <h3 className="text-lg font-medium mb-4">{translations.lorepa}</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/who" className="hover:underline">{translations.about}</Link></li>
                        <li><Link to="/faq" className="hover:underline">{translations.faq}</Link></li>
                    </ul>
                </div>

                {/* Section 2: Get Started */}
                <div>
                    <h3 className="text-lg font-medium mb-4">{translations.getStarted}</h3>
                    <ul className="space-y-2 text-sm">
                        {!isLogin && <li><Link to="/login" className="hover:underline">{translations.createAccount}</Link></li>}
                        {!isLogin && <li><Link to="/trailers" className="hover:underline">{translations.findTrailer}</Link></li>}
                        {isLogin && <li><Link to="/host" className="hover:underline">{translations.becomeHost}</Link></li>}
                    </ul>
                </div>

                {/* Section 3: Locations */}
                <div>
                    <h3 className="text-lg font-medium mb-4">{translations.locations}</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to={`/trailers?city=Montreal`} className="hover:underline">{translations.montreal}</Link></li>
                        <li><Link to={`/trailers?city=Quebec`} className="hover:underline">{translations.quebecCity}</Link></li>
                        <li><Link to={`/trailers?city=Gatineau`} className="hover:underline">{translations.gatineau}</Link></li>
                        <li><Link to={`/trailers?city=Sherbrooke`} className="hover:underline">{translations.sherbrooke}</Link></li>
                        <li><Link to={`/trailers?city=Lévis`} className="hover:underline">{translations.levis}</Link></li>
                    </ul>
                </div>

                {/* Section 4: Support */}
                <div>
                    <h3 className="text-lg font-medium mb-4">{translations.support}</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/contact" className="hover:underline">{translations.helpCenter}</Link></li>
                        <li><Link to="/contact" className="hover:underline">{translations.contactUs}</Link></li>
                    </ul>
                </div>

                {/* Section 5: Social Media and App Downloads */}
                <div className="lg:col-span-1 flex flex-col items-center md:items-end">
                    <div className="flex space-x-4 mb-6">
                        <a target='_black' href="https://www.tiktok.com/@lorepa.ca" aria-label="Tiktok" className="text-black"><FaTiktok size={24} /></a>
                        <a target='_black' href="https://www.instagram.com/lorepa.ca?igsh=MWk0NGo5dmFrZXR4YQ==" aria-label="Instagram" className="text-black"><FaInstagram size={24} /></a>
                        <a target='_black' href="https://www.linkedin.com/company/location-de-remorque-entre-particuliers/" aria-label="LinkedIn" className="text-black"><FaLinkedinIn size={24} /></a>
                        <a target='_black' href="https://www.facebook.com/share/15qZy6cEuV/" aria-label="Facebook" className="text-black"><FaFacebook size={24} /></a>
                    </div>

                    <div className="flex items-center gap-x-4 bg-slate-50">
                        <div className="w-[10rem] flex bg-black rounded-md text-white px-3 py-2">
                            <IoLogoAppleAppstore className="mr-2" size={24} />
                            <p className="text-xs text-nowrap truncate">Download on the <br /> {translations.downloadAppStore}</p>
                        </div>
                        <div className="w-[10rem] flex bg-black rounded-md text-white px-3 py-2">
                            <FaGooglePlay className="mr-2" size={24} />
                            <p className="text-xs text-nowrap truncate">Download on <br /> {translations.downloadGooglePlay}</p>
                        </div>
                    </div>
                    <div className="flex items-center mt-6 text-gray-400 cursor-pointer">
                        <MdLanguage className="mr-2" size={20} />
                        <span className="text-sm">{translations.english}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-black space-y-4 md:space-y-0">
                <p className="text-center md:text-left">{translations.address}</p>
                <p className="text-center md:text-left">{translations.allRightsReserved}</p>
                <div className="flex space-x-4">
                    <Link to="/privacy" className="hover:underline">{translations.privacyPolicy}</Link>
                    <Link to="/terms" className="hover:underline">{translations.termsOfService}</Link>
                    <Link to="/cookie" className="hover:underline">{translations.cookiePolicy}</Link>
                    <Link to="/legal" className="hover:underline">{translations.legalNotice}</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;