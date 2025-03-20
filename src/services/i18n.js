import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import hiTranslation from '../locales/hi/translation.json';
import enTranslation from '../locales/en/translation.json';
import bhoTranslation from '../locales/bho/translation.json';

// Define translations
const resources = {
  en: {
    translation: enTranslation
  },
  hi: {
    translation: hiTranslation
  },
  bho: {
    translation: bhoTranslation
  }
};

// Get user's preferred language from localStorage or use default
const savedLanguage = localStorage.getItem('language');

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage || 'en', // Use saved language or default to English
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    react: {
      useSuspense: false, // Disable suspense for better behavior
    }
  });

// Save language preference whenever it changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n; 