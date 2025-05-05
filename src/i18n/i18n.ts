import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';
import itTranslation from './locales/it.json';
import esTranslation from './locales/es.json';
import ruTranslation from './locales/ru.json';
import arTranslation from './locales/ar.json';
import thTranslation from './locales/th.json';

const resources = {
  en: {
    translation: enTranslation
  },
  fr: {
    translation: frTranslation
  },
  it: {
    translation: itTranslation
  },
  es: {
    translation: esTranslation
  },
  ru: {
    translation: ruTranslation
  },
  ar: {
    translation: arTranslation
  },
  th: {
    translation: thTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;