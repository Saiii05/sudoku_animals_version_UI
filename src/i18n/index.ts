import en from './en.json';

const translations = {
  en,
};

let currentLanguage: keyof typeof translations = 'en';

export const t = (key: keyof typeof en, replacements: Record<string, string | number> = {}) => {
  let translation = translations[currentLanguage][key] || key;
  Object.keys(replacements).forEach(placeholder => {
    translation = translation.replace(`{${placeholder}}`, String(replacements[placeholder]));
  });
  return translation;
};

export const setLanguage = (lang: keyof typeof translations) => {
  currentLanguage = lang;
};
