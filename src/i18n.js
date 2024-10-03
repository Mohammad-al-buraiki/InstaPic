import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';

i18n
  .use(LanguageDetector) // Detect the user's language
  .use(initReactI18next) // Initialize React integration with i18next
  .init({
    resources: {
      en: {
        translation: enTranslation // English translations
      },
      ar: {
        translation: arTranslation // Arabic translations
      }
    },
    fallbackLng: 'en', // Default to English if the user's language is not available
    detection: {
      order: ['localStorage', 'navigator'], // Language detection order
      caches: ['localStorage'] // Save language preference to local storage
    },
    interpolation: {
      escapeValue: false // React already handles XSS protection
    }
  });

export default i18n;

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// i18n
//   .use(LanguageDetector) // Detect the browser language
//   .use(initReactI18next) // Passes i18n down to React
//   .init({
//     resources: {
//       en: {
//         translation: require('./locales/en/translation.json')
//       },
//       ar: {
//         translation: require('./locales/ar/translation.json')
//       }
//     },
//     fallbackLng: 'en', // Default language
//     detection: {
//       order: ['localStorage', 'navigator'], // Language detection options
//       caches: ['localStorage']
//     },
//     interpolation: {
//       escapeValue: false // React already escapes content
//     }
//   });

// export default i18n;
