import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import arabicTranslation from "@andromeda/core/locales/ar/translations.json";
import englishTranslation from "@andromeda/core/locales/en/translations.json";

const storedLang = localStorage.getItem("language") || "en";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: storedLang,
  resources: {
    en: {
      translation: englishTranslation,
    },
    ar: {
      translation: arabicTranslation,
    },
  },
});

i18n.languages = ["en", "ar"];

export default i18n;
