import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CiGlobe } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../assets/logo.svg";

// Define your translations for the Navbar
const navBarTransaltions = {
  en: {
    becomeAHost: "Become a host",
    login: "Login",
    signup: "Signup",
    logout: "Logout",
    whoAreWe: "Who are we",
    contactUs: "Contact us",
    calculator: "Calculator"
  },
  es: {
    becomeAHost: "Conviértete en anfitrión",
    login: "Iniciar sesión",
    signup: "Registrarse",
    logout: "Cerrar sesión",
    whoAreWe: "¿Quiénes somos?",
    contactUs: "Contáctanos",
    calculator: "Calculadora"
  },
  cn: {
    becomeAHost: "成为房东",
    login: "登录",
    signup: "注册",
    logout: "注销",
    whoAreWe: "我们是谁",
    contactUs: "联系我们",
    calculator: "计算器"
  },
  fr: {
    becomeAHost: "Devenir hôte",
    login: "Se connecter",
    signup: "S'inscrire",
    logout: "Se déconnecter",
    whoAreWe: "Qui sommes-nous",
    contactUs: "Nous contacter",
    calculator: "Calculatrice"
  }
};

const Navbar = () => {
  const [showLanguages, setShowLanguages] = useState(false);
  const [showNav, setshowNav] = useState(false);
  const [language, setLanguage] = useState("en"); // Initial language state
  const isLogin = localStorage.getItem("userId");

  // Initialize translations based on stored language or default to English
  const [translations, setTranslations] = useState(() => {
    const storedLang = localStorage.getItem('lang');
    return navBarTransaltions[storedLang] || navBarTransaltions.en;
  });

  // Effect to update translations when language changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedLang = localStorage.getItem('lang');
      setTranslations(navBarTransaltions[storedLang] || navBarTransaltions.en);
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange(); // Call once on mount to set initial translations
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Effect to set the language state from localStorage on mount
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  // Handler for language change
  const handleLanguageChange = (langSymbol) => {
    setLanguage(langSymbol);
    localStorage.setItem("lang", langSymbol);
    setShowLanguages(false);
    window.location.reload(); // Reload to apply language changes
  };

  return (
    <nav className="border-b border-[#F1F1F1]">
      <div className="px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-x-2">
            <Link to={"/"} className="text-xl">
              <img src={Logo} alt="" className='h-[8rem]' />
            </Link>
          </div>

          <div className="block relative">
            <div className="ml-4 flex items-center md:ml-6 gap-x-4">
              {isLogin && (
                <Link to={"/host"}>
                  <button className='text-xs border-black border cursor-pointer p-2 rounded-md sm:block hidden'>
                    {translations.becomeAHost}
                  </button>
                </Link>
              )}
              <CiGlobe className='cursor-pointer' onClick={() => setShowLanguages(!showLanguages)} />
              <div className="flex items-center gap-x-2 bg-[#F1F1F1] rounded-md p-2">
                <RxHamburgerMenu onClick={() => setshowNav(!showNav)} className='cursor-pointer' />
                {isLogin && (<FaRegUserCircle className='cursor-pointer' />)}
              </div>
            </div>

            {showLanguages && (
              <div className='absolute z-10 right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg'>
                <div className='py-1'>
                  <p onClick={() => handleLanguageChange("en")} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>English</p>
                  <p onClick={() => handleLanguageChange("es")} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Spanish</p>
                  <p onClick={() => handleLanguageChange("cn")} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Chinese</p>
                  <p onClick={() => handleLanguageChange("fr")} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>French</p>
                </div>
              </div>
            )}

            {showNav && (
              <div className='absolute z-10 right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg'>
                <div className='py-1'>
                  {!isLogin && (<Link to="/login" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>{translations.login}</Link>)}
                  {!isLogin && (<Link to="/register" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>{translations.signup}</Link>)}
                  {isLogin && (<p onClick={() => { localStorage.removeItem("userId"); window.location.reload(); }} className='cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>{translations.logout}</p>)}
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
    </nav>
  );
};

export default Navbar;