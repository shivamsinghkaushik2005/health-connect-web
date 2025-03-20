import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Define available languages
  const languages = [
    {
      code: 'hi',
      name: 'हिंदी',
      nativeName: 'हिंदी',
      flag: process.env.PUBLIC_URL + '/images/flags/india.png',
    },
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: process.env.PUBLIC_URL + '/images/flags/uk.png',
    },
    {
      code: 'bho',
      name: 'भोजपुरी',
      nativeName: 'भोजपुरी',
      flag: process.env.PUBLIC_URL + '/images/flags/india.png',
    }
  ];
  
  // Get current language
  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === i18n.language) || languages[0];
  };
  
  // Handle language change
  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    setIsOpen(false);
  };
  
  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== i18n.language) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);
  
  // Dropdown arrow icon
  const DownArrow = () => (
    <svg 
      className={`arrow ${isOpen ? 'open' : ''}`}
      width="12" 
      height="6" 
      viewBox="0 0 12 6" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  // Check icon
  const CheckIcon = () => (
    <svg 
      className="check-icon" 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 8.5L6 11.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  
  // Get a fallback image if flag image doesn't exist
  const handleImageError = (e) => {
    e.target.src = process.env.PUBLIC_URL + '/images/flags/placeholder.png';
  };
  
  return (
    <div className="language-selector-container" ref={dropdownRef}>
      <button className="language-selector-button" onClick={toggleDropdown}>
        <img 
          src={getCurrentLanguage().flag} 
          alt={getCurrentLanguage().code} 
          onError={handleImageError}
          className="flag-icon"
        />
        <span className="current-language">{getCurrentLanguage().nativeName}</span>
        <DownArrow />
      </button>
      
      <div className={`language-dropdown ${isOpen ? 'open' : ''}`}>
        {languages.map((language) => (
          <div
            key={language.code}
            className={`language-option ${i18n.language === language.code ? 'active' : ''}`}
            onClick={() => changeLanguage(language.code)}
          >
            <img 
              src={language.flag} 
              alt={language.code} 
              onError={handleImageError}
              className="flag-icon"
            />
            <span className="language-name">{language.nativeName}</span>
            {i18n.language === language.code && <CheckIcon />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector; 