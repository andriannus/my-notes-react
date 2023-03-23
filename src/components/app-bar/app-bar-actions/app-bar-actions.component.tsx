import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, memo } from "react";
import { Link } from "react-router-dom";

import { useAuth, useTheme } from "@/contexts";

import "./app-bar-actions.component.scss";

const AppBarActions: FC = () => {
  const { accessToken, logout } = useAuth();
  const { isDarkMode, toggleMode } = useTheme();

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

export default memo(AppBarActions);
