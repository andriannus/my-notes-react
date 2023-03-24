import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAuth, useTheme } from "@/contexts";

import "./app-bar-actions.component.scss";
import { useLocalStorage } from "@/hooks";
import { MYN_LANGUAGE } from "@/constants";
import { Language } from "@/enums";

const AppBarActions: FC = () => {
  const ls = useLocalStorage();
  const { accessToken, logout } = useAuth();
  const { isDarkMode, toggleMode } = useTheme();
  const { i18n } = useTranslation();

  const [language, setLanguage] = useState(
    ls.get(MYN_LANGUAGE) || Language.Indonesia
  );

  useEffect(() => {
    const language = ls.get<Language>(MYN_LANGUAGE);

    if (!language) {
      ls.set(MYN_LANGUAGE, Language.Indonesia);
    }
  }, [ls]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const isIndonesia = useMemo(() => {
    return language === Language.Indonesia;
  }, [language]);

  function handleLanguageToggle(): void {
    const newLanguage = isIndonesia ? Language.English : Language.Indonesia;

    setLanguage(newLanguage);
    ls.set(MYN_LANGUAGE, newLanguage);
  }

  return (
    <div className="AppBarActions">
      {!!accessToken && (
        <Link
          id="LnkArchives"
          aria-label="Archives"
          className="AppBarActions-button"
          role="button"
          to="/notes/archives"
        >
          <FontAwesomeIcon icon="archive" />
        </Link>
      )}

      <button
        id="BtnLanguage"
        aria-label="Language"
        className="AppBarActions-button"
        type="button"
        onClick={handleLanguageToggle}
      >
        {isIndonesia ? "ID" : "EN"}
      </button>

      <button
        id="BtnTheme"
        aria-label="Theme"
        className="AppBarActions-button"
        type="button"
        onClick={toggleMode}
      >
        <FontAwesomeIcon icon={isDarkMode ? "sun" : "moon"} />
      </button>

      {!!accessToken && (
        <button
          id="BtnLogout"
          aria-label="Logout"
          className="AppBarActions-button"
          type="button"
          onClick={logout}
        >
          <FontAwesomeIcon icon="sign-out" />
        </button>
      )}
    </div>
  );
};

export default AppBarActions;
