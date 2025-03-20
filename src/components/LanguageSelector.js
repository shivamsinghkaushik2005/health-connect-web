import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/LanguageSelector.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Available languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bho', name: 'भोजपुरी', flag: '🇮🇳' }
  ];

  // Set initial language from localStorage or default to 'en'
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  // Change language handler
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    setIsOpen(false);
  };

  // Get current language details
  const getCurrentLanguage = () => {
    const currentLangCode = i18n.language;
    return languages.find(lang => lang.code === currentLangCode) || languages[0];
  };

  return (
    <div className="language-selector">
      <button 
        className="language-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="language-flag">{getCurrentLanguage().flag}</span>
        <span className="language-name">{getCurrentLanguage().name}</span>
        <span className="language-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-option ${language.code === i18n.language ? 'active' : ''}`}
              onClick={() => changeLanguage(language.code)}
            >
              <span className="language-flag">{language.flag}</span>
              <span className="language-name">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 