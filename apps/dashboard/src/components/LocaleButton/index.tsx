import { useState } from "react";

import { useTranslation } from "react-i18next";

import styles from "./styles.module.scss";

const LocaleButton = () => {
  const { i18n } = useTranslation();
  const storedLang = localStorage.getItem("language") || "en";

  const [chosenlanguage, setChosenlanguage] = useState(storedLang);

  function changeLanguage(e: React.MouseEvent<HTMLButtonElement>) {
    const language = e.currentTarget.value;
    setChosenlanguage(language);
    i18n.changeLanguage(language);
    localStorage.setItem("language", language); //saving the langauge in the local storage to be able to fetch it later
  }

  return (
    <button
      className={styles.changeLanguageButton}
      onClick={changeLanguage}
      value={chosenlanguage === "en" ? "ar" : "en"}
    >
      {chosenlanguage === "en" ? "العربية" : "English"}
    </button>
  );
};

export default LocaleButton;
