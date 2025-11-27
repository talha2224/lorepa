import React, { useState, useEffect } from "react";

const translations = {
  en: {
    title: "👉 We value your privacy",
    message: "We use cookies to improve your experience, analyze site traffic, and personalize content. You can accept, reject, or customize your choices at any time.",
    buttons: {
      acceptAll: "Accept all",
      rejectAll: "Reject all",
      customize: "Customize",
      save: "Save my choices",
    },
    categories: {
      essential: "Essential (always active)",
      essentialDesc: "Required for security and the proper functioning of the site (login, cart, navigation).",
      performance: "Performance / Analytics",
      performanceDesc: "Helps us understand how you use the site to improve our services.",
      functional: "Functional",
      functionalDesc: "Enables certain features such as video, interactive map, or chat.",
      marketing: "Marketing / Advertising",
      marketingDesc: "Used to display relevant ads and measure campaign effectiveness.",
    }
  },
  fr: {
    title: "👉 Nous respectons votre vie privée",
    message: "Nous utilisons des cookies pour améliorer votre expérience, analyser l’audience et proposer un contenu personnalisé. Vous pouvez accepter, refuser ou personnaliser vos choix à tout moment.",
    buttons: {
      acceptAll: "Accepter tout ✅",
      rejectAll: "Refuser tout ❌",
      customize: "Personnaliser ⚙️",
      save: "Enregistrer mes choix",
    },
    categories: {
      essential: "Essentiels (toujours actifs)",
      essentialDesc: "Nécessaires pour la sécurité et le bon fonctionnement du site (connexion, panier, navigation).",
      performance: "Performance / Analytics",
      performanceDesc: "Nous aident à comprendre comment vous utilisez le site afin d’améliorer nos services.",
      functional: "Fonctionnels",
      functionalDesc: "Permettent d’activer certaines fonctionnalités comme la vidéo, la carte interactive ou le chat.",
      marketing: "Marketing / Publicité",
      marketingDesc: "Utilisés pour afficher des publicités pertinentes et mesurer nos campagnes.",
    }
  }
};

const COOKIE_KEY = "lorepa_cookie_consent";
const COOKIE_EXPIRY_DAYS = 365;

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState({
    essential: true,
    performance: false,
    functional: false,
    marketing: false,
  });
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const t = translations[lang];

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_KEY);
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      setConsent(JSON.parse(savedConsent));
    }
  }, []);

  const saveConsent = (newConsent) => {
    localStorage.setItem(COOKIE_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => saveConsent({ essential: true, performance: true, functional: true, marketing: true });
  const handleRejectAll = () => saveConsent({ essential: true, performance: false, functional: false, marketing: false });
  const toggleCategory = (category) => setConsent((prev) => ({ ...prev, [category]: !prev[category] }));
  const handleSavePreferences = () => saveConsent(consent);

  if (!showBanner && !showPreferences) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 md:inset-x-16 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-6 md:p-8">
      {!showPreferences ? (
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-4">
          <div className="md:max-w-xl">
            <h2 className="font-bold text-xl md:text-2xl mb-2">{t.title}</h2>
            <p className="text-gray-700 text-sm md:text-base">{t.message}</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
            <button onClick={handleAcceptAll} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition"> {t.buttons.acceptAll} </button>
            <button onClick={handleRejectAll} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"> {t.buttons.rejectAll} </button>
            <button onClick={() => setShowPreferences(true)} className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg font-medium transition"> {t.buttons.customize} </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {Object.keys(t.categories).filter(key => key !== 'essentialDesc').map(categoryKey => (
            <div key={categoryKey} className="flex flex-col gap-1">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={consent[categoryKey]} disabled={categoryKey === "essential"} onChange={() => toggleCategory(categoryKey)} className="w-5 h-5 text-blue-600 border-gray-300 rounded" />
                <div>
                  <span className="font-semibold">{t.categories[categoryKey]}</span>
                  <p className="text-gray-600 text-sm">{t.categories[`${categoryKey}Desc`]}</p>
                </div>
              </label>
            </div>
          ))}
          <div className="flex flex-wrap gap-3 mt-4">
            <button onClick={handleSavePreferences} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"> {t.buttons.save} </button>
            <button onClick={handleAcceptAll} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium transition"> {t.buttons.acceptAll} </button>
            <button onClick={handleRejectAll} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"> {t.buttons.rejectAll} </button>
          </div>
        </div>
      )}
      {!showBanner && !showPreferences && (
        <div className="mt-4 text-right">
          <button onClick={() => setShowPreferences(true)} className="text-sm underline text-blue-600 hover:text-blue-800 transition">Manage cookies</button>
        </div>
      )}
    </div>
  );
};

export default CookieConsent;
