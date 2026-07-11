import React, { createContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import hi from '../locales/hi.json';
import mr from '../locales/mr.json';
import kn from '../locales/kn.json';

// Static translation files dictionary
const staticTranslations = { en, hi, mr, kn };

// Supported languages list with codes and labels
export const supportedLanguages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'ml', label: 'മലയാളം' }
];

export const LangContext = createContext();

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  // Tracks active languages enabled by the administrator
  const [activeLanguages, setActiveLanguages] = useState(['en', 'hi', 'mr', 'kn']);
  // Local storage dictionary for admin-customized translation edits
  const [customTranslations, setCustomTranslations] = useState({});
  // Dynamic list of supported languages
  const [supportedLangs, setSupportedLangs] = useState(supportedLanguages);

  useEffect(() => {
    // Sync current active language from LocalStorage
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      setLang(storedLang);
    }

    // Sync admin enabled languages list
    const storedActive = localStorage.getItem('active_languages');
    if (storedActive) {
      try {
        setActiveLanguages(JSON.parse(storedActive));
      } catch (e) {
        console.error('Failed to parse active languages', e);
      }
    } else {
      localStorage.setItem('active_languages', JSON.stringify(['en', 'hi', 'mr', 'kn']));
    }

    // Sync admin supported languages list
    const storedSupported = localStorage.getItem('supported_languages');
    if (storedSupported) {
      try {
        setSupportedLangs(JSON.parse(storedSupported));
      } catch (e) {
        console.error('Failed to parse supported languages', e);
      }
    } else {
      localStorage.setItem('supported_languages', JSON.stringify(supportedLanguages));
    }

    // Sync customized translation keys
    const storedCustom = localStorage.getItem('custom_translations');
    if (storedCustom) {
      try {
        setCustomTranslations(JSON.parse(storedCustom));
      } catch (e) {
        console.error('Failed to parse custom translations', e);
      }
    }
  }, []);

  const changeLang = (newLang) => {
    // Only switch language if it is currently active/enabled
    if (activeLanguages.includes(newLang)) {
      setLang(newLang);
      localStorage.setItem('language', newLang);
    }
  };

  // Toggle enabling/disabling a language (Admin feature)
  const enableLanguage = (code) => {
    if (!activeLanguages.includes(code)) {
      const updated = [...activeLanguages, code];
      setActiveLanguages(updated);
      localStorage.setItem('active_languages', JSON.stringify(updated));
    }
  };

  const disableLanguage = (code) => {
    // Prevent disabling English to avoid breaking basic fallback layout
    if (code === 'en') return;
    if (activeLanguages.includes(code)) {
      const updated = activeLanguages.filter(c => c !== code);
      setActiveLanguages(updated);
      localStorage.setItem('active_languages', JSON.stringify(updated));
      // Fallback current selection to English if the current active language is disabled
      if (lang === code) {
        setLang('en');
        localStorage.setItem('language', 'en');
      }
    }
  };

  // Add a new language (Admin feature)
  const addLanguage = (label, code) => {
    const trimmedLabel = label.trim();
    const trimmedCode = code.trim().toLowerCase();
    if (!trimmedLabel || !trimmedCode) return false;
    
    // Check if code already exists
    if (supportedLangs.some(l => l.code === trimmedCode)) {
      return false;
    }
    
    const updated = [...supportedLangs, { code: trimmedCode, label: trimmedLabel }];
    setSupportedLangs(updated);
    localStorage.setItem('supported_languages', JSON.stringify(updated));
    return true;
  };

  // Delete an existing language (Admin feature)
  const deleteLanguage = (code) => {
    if (code === 'en') return false; // English is undeletable
    const updated = supportedLangs.filter(l => l.code !== code);
    setSupportedLangs(updated);
    localStorage.setItem('supported_languages', JSON.stringify(updated));
    
    // Also disable it if it was active
    disableLanguage(code);
    return true;
  };

  // Updates translation key values (Admin feature)
  const updateTranslation = (langCode, key, value) => {
    const updated = {
      ...customTranslations,
      [langCode]: {
        ...(customTranslations[langCode] || {}),
        [key]: value
      }
    };
    setCustomTranslations(updated);
    localStorage.setItem('custom_translations', JSON.stringify(updated));
  };

  // Helper translating key dynamically
  const t = (key) => {
    // 1. Check admin customized translation dictionary first
    if (customTranslations[lang]?.[key]) {
      return customTranslations[lang][key];
    }
    // 2. Check static locale files next
    if (staticTranslations[lang]?.[key]) {
      return staticTranslations[lang][key];
    }
    // 3. Fallback to English customized dictionary
    if (customTranslations['en']?.[key]) {
      return customTranslations['en'][key];
    }
    // 4. Fallback to English static file
    if (staticTranslations['en']?.[key]) {
      return staticTranslations['en'][key];
    }
    return key;
  };

  return (
    <LangContext.Provider value={{ 
      lang, 
      changeLang, 
      t, 
      activeLanguages, 
      supportedLanguages: supportedLangs, 
      enableLanguage, 
      disableLanguage, 
      updateTranslation,
      customTranslations,
      addLanguage,
      deleteLanguage
    }}>
      {children}
    </LangContext.Provider>
  );
};
