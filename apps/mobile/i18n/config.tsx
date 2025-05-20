import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
import RNRestart from "react-native-restart"; // Import package from node modules

import arabicTranslation from "@andromeda/core/locales/ar/translations.json";
import englishTranslation from "@andromeda/core/locales/en/translations.json";

export const initI18n = async () => {
  const storedLang = (await AsyncStorage.getItem("language")) || "en";
  const isRTL = storedLang === "ar";

  // Set the RTL layout direction if needed
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.forceRTL(isRTL);
    I18nManager.allowRTL(isRTL);
    RNRestart.Restart();
    // It's common to reload the app to apply direction
    // Optional: RNRestart.Restart() if you're using react-native-restart
  }

  await i18n.use(initReactI18next).init({
    fallbackLng: "en",
    lng: storedLang,
    resources: {
      en: { translation: englishTranslation },
      ar: { translation: arabicTranslation },
    },
    compatibilityJSON: "v4",
    interpolation: {
      escapeValue: false,
    },
  });

  i18n.languages = ["en", "ar"];
};

export default i18n;
