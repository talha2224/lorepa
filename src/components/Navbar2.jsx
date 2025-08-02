import axios from 'axios';
import { useRef, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiGlobe } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import Logo from "../assets/logo.svg";

// Define your translations for Navbar2
const navBar2Translations = {
    en: {
        where: "Where",
        from: "From",
        until: "Until",
        login: "Login",
        signup: "Signup",
        logout: "Logout",
        becomeAHost: "Become a host",
        whoAreWe: "Who are we",
        contactUs: "Contact us",
        calculator: "Calculator",
        montrealPlaceholder: "Montreal"
    },
    es: {
        where: "¿Dónde?",
        from: "Desde",
        until: "Hasta",
        login: "Iniciar sesión",
        signup: "Registrarse",
        logout: "Cerrar sesión",
        becomeAHost: "Conviértete en anfitrión",
        whoAreWe: "¿Quiénes somos?",
        contactUs: "Contáctanos",
        calculator: "Calculadora",
        montrealPlaceholder: "Montreal"
    },
    cn: {
        where: "地点",
        from: "从",
        until: "到",
        login: "登录",
        signup: "注册",
        logout: "注销",
        becomeAHost: "成为房东",
        whoAreWe: "我们是谁",
        contactUs: "联系我们",
        calculator: "计算器",
        montrealPlaceholder: "蒙特利尔"
    },
    fr: {
        where: "Où",
        from: "Du",
        until: "Jusqu'à",
        login: "Se connecter",
        signup: "S'inscrire",
        logout: "Se déconnecter",
        becomeAHost: "Devenir hôte",
        whoAreWe: "Qui sommes-nous",
        contactUs: "Nous contacter",
        calculator: "Calculatrice",
        montrealPlaceholder: "Montréal"
    }
};

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Navbar2 = () => {
    const query = useQuery();
    const cityFromQuery = query.get('city')?.toLowerCase() || '';
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);
    const [showLanguages, setShowLanguages] = useState(false);
    const [showNav, setshowNav] = useState(false);
    const isLogin = localStorage.getItem("userId");
    const nav = useNavigate();

    // State for the new input fields
    const [location, setLocation] = useState(cityFromQuery);
    const [fromDate, setFromDate] = useState("28/04/2025");
    const [fromTime, setFromTime] = useState("12:42 AM");
    const [untilDate, setUntilDate] = useState("1/05/2025");
    const [untilTime, setUntilTime] = useState("10:42 AM");

    // State for managing current language
    const [language, setLanguage] = useState(() => {
        const storedLang = localStorage.getItem('lang');
        return storedLang || 'en';
    });

    // State for managing translations based on language
    const [translations, setTranslations] = useState(() => {
        const storedLang = localStorage.getItem('lang');
        return navBar2Translations[storedLang] || navBar2Translations.en;
    });

    // Effect to update translations when localStorage 'lang' changes
    useEffect(() => {
        const handleStorageChange = () => {
            const storedLang = localStorage.getItem('lang');
            setLanguage(storedLang || 'en');
            setTranslations(navBar2Translations[storedLang] || navBar2Translations.en);
        };

        window.addEventListener('storage', handleStorageChange);
        handleStorageChange(); // Initialize on mount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Handler for language change
    const handleLanguageChange = (langSymbol) => {
        setLanguage(langSymbol);
        localStorage.setItem("lang", langSymbol);
        setShowLanguages(false);
        window.location.reload(); // Reload to apply language changes
    };

    const fetchSuggestions = async (inputText) => {
        if (!inputText) {
            setSuggestions([]);
            return;
        }

        try {
            const res = await axios.get(`https://lorepa-backend.vercel.app/api/autocomplete`, {
                params: { input: inputText },
            });

            if (res.data.status === "OK") {
                const filtered = res.data.predictions.filter((prediction) =>
                    prediction.types.includes("locality") ||
                    prediction.types.includes("country") ||
                    prediction.types.includes("administrative_area_level_1")
                );
                setSuggestions(filtered);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    const handleSelect = (item) => {
        setLocation(item.description);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <nav className="border-b border-[#F1F1F1] bg-blue-600">
            <div className="px-4 sm:px-6 lg:px-8 bg-white">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center gap-x-2">
                        <Link to={"/"} className="text-xl"><img src={Logo} alt="" className='h-[8rem]' /></Link>
                    </div>

                    {/* New Search/Filter Section */}
                    <div className="md:flex items-center hidden gap-x-4">
                        <div className='flex items-center gap-x-2 border border-[#C3C3C3] p-2 rounded-3xl relative' ref={wrapperRef}>
                            <label htmlFor="where" className="text-xs text-[#2563EB]">{translations.where}</label>
                            <input
                                type="text"
                                id="where"
                                value={location}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setLocation(value);
                                    fetchSuggestions(value);
                                }}
                                className="block w-full text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0"
                                placeholder={translations.montrealPlaceholder}
                            />
                            {showSuggestions && suggestions.length > 0 && (
                                <ul className="absolute z-50 top-full left-0 right-0 bg-white shadow-md rounded-md mt-1 max-h-60 overflow-y-auto">
                                    {suggestions.map((item, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSelect(item)}
                                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                        >
                                            {item.description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* From Date/Time */}
                        <div className='flex items-center gap-x-2 border border-[#C3C3C3] p-2 rounded-3xl'>
                            <label htmlFor="fromDate" className="text-xs text-[#2563EB]">{translations.from}</label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    id="fromDate"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="block w-24 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0"
                                />
                                <input
                                    type="text"
                                    id="fromTime"
                                    value={fromTime}
                                    onChange={(e) => setFromTime(e.target.value)}
                                    className="block w-20 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0 ml-2"
                                />
                            </div>
                        </div>

                        {/* Until Date/Time */}
                        <div className='flex items-center gap-x-2 border border-[#C3C3C3] p-2 rounded-3xl'>
                            <label htmlFor="untilDate" className="text-xs text-[#2563EB]">{translations.until}</label>
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    id="untilDate"
                                    value={untilDate}
                                    onChange={(e) => setUntilDate(e.target.value)}
                                    className="block w-24 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0"
                                />
                                <input
                                    type="text"
                                    id="untilTime"
                                    value={untilTime}
                                    onChange={(e) => setUntilTime(e.target.value)}
                                    className="block w-20 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0 ml-2"
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <button onClick={() => nav(`/trailers?city=${location}`)} className="bg-[#2563EB] text-white p-2 rounded-full ml-2 flex items-center justify-center">
                            <CiSearch className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="block relative">
                        <div className="ml-4 flex items-center md:ml-6 gap-x-4">
                            <CiGlobe className='cursor-pointer' onClick={() => setShowLanguages(!showLanguages)} />
                            <div className="flex items-center gap-x-2 bg-[#F1F1F1] rounded-md p-2">
                                <RxHamburgerMenu onClick={() => setshowNav(!showNav)} className='cursor-pointer' />
                                <FaRegUserCircle className='cursor-pointer' />
                            </div>
                        </div>

                        {showLanguages && (
                            <div className=' absolute z-10 right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg'>
                                <div className='py-1'>
                                    <p onClick={() => handleLanguageChange("en")} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>English</p>
                                    <p onClick={() => handleLanguageChange("es")} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Spanish</p>
                                    <p onClick={() => handleLanguageChange("cn")} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Chinese</p>
                                    <p onClick={() => handleLanguageChange("fr")} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>French</p>
                                </div>
                            </div>
                        )}
                        {showNav && (
                            <div className=' absolute z-10 right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg'>
                                <div className='py-1'>
                                    {!isLogin && (<Link to="/login" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>{translations.login}</Link>)}
                                    {!isLogin && (<Link to="/register" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>{translations.signup}</Link>)}
                                    {isLogin && (<p onClick={() => { localStorage.removeItem("userId"); window.location.reload() }} className=' cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>{translations.logout}</p>)}
                                    {isLogin && <Link to="/host" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>{translations.becomeAHost}</Link>}
                                    <Link to="/who" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>{translations.whoAreWe}</Link>
                                    <Link to="/contact" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>{translations.contactUs}</Link>
                                    <Link to="/calculator" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>{translations.calculator}</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* The commented out section was already present, if you want to enable it for smaller screens, you'd apply translations there as well. */}
            {/* <div className="md:hidden items-center flex gap-x-4">
                <div className='flex items-center gap-x-2 border border-[#C3C3C3] p-2 rounded-3xl relative' ref={wrapperRef}>
                    <label htmlFor="where" className="text-xs text-[#2563EB]">{translations.where}</label>
                    <input
                        type="text"
                        id="where"
                        value={location}
                        onChange={(e) => {
                            const value = e.target.value;
                            setLocation(value);
                            fetchSuggestions(value);
                        }}
                        className="block w-full text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0"
                        placeholder={translations.montrealPlaceholder}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute z-50 top-full left-0 right-0 bg-white shadow-md rounded-md mt-1 max-h-60 overflow-y-auto">
                            {suggestions.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(item)}
                                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                                >
                                    {item.description}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className='flex items-center gap-x-2 border border-[#C3C3C3] p-2 rounded-3xl'>
                    <label htmlFor="fromDate" className="text-xs text-[#2563EB]">{translations.from}</label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            id="fromDate"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="block w-24 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0"
                        />
                        <input
                            type="text"
                            id="fromTime"
                            value={fromTime}
                            onChange={(e) => setFromTime(e.target.value)}
                            className="block w-20 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0 ml-2"
                        />
                    </div>
                </div>

                <div className='flex items-center gap-x-2 border border-[#C3C3C3] p-2 rounded-3xl'>
                    <label htmlFor="untilDate" className="text-xs text-[#2563EB]">{translations.until}</label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            id="untilDate"
                            value={untilDate}
                            onChange={(e) => setUntilDate(e.target.value)}
                            className="block w-24 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0"
                        />
                        <input
                            type="text"
                            id="untilTime"
                            value={untilTime}
                            onChange={(e) => setUntilTime(e.target.value)}
                            className="block w-20 text-sm text-gray-900 border-none focus:ring-0 focus:outline-none p-0 ml-2"
                        />
                    </div>
                </div>

                <button onClick={() => nav(`/trailers?city=${location}`)} className="bg-[#2563EB] text-white p-2 rounded-full ml-2 flex items-center justify-center">
                    <CiSearch className="h-4 w-4" />
                </button>
            </div> */}
        </nav>
    );
}

export default Navbar2;