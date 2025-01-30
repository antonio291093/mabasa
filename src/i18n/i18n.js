// src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones
import translationEN from './locales/en/translation.json';
import translationES from './locales/es/translation.json';

i18n
  .use(LanguageDetector) // Detectar idioma del navegador
  .use(initReactI18next) // Inicializar react-i18next
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      es: {
        translation: translationES,
      },
    },
    fallbackLng: 'es', // Idioma por defecto
    interpolation: {
      escapeValue: false, // No escapar HTML en las traducciones
    },
  });

export default i18n;