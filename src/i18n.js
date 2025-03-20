import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en/translation.json';
import hiTranslation from './locales/hi/translation.json';
import bhoTranslation from './locales/bho/translation.json';
import bnTranslation from './locales/bn/translation.json';
import teTranslation from './locales/te/translation.json';
import taTranslation from './locales/ta/translation.json';
import mrTranslation from './locales/mr/translation.json';
import guTranslation from './locales/gu/translation.json';
import knTranslation from './locales/kn/translation.json';
import mlTranslation from './locales/ml/translation.json';
import paTranslation from './locales/pa/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  hi: {
    translation: hiTranslation
  },
  bho: {
    translation: bhoTranslation
  },
  bn: {
    translation: bnTranslation
  },
  te: {
    translation: teTranslation
  },
  ta: {
    translation: taTranslation
  },
  mr: {
    translation: mrTranslation
  },
  gu: {
    translation: guTranslation
  },
  kn: {
    translation: knTranslation
  },
  ml: {
    translation: mlTranslation
  },
  pa: {
    translation: paTranslation
  }
};

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n; 