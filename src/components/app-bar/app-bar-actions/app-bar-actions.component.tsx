import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, memo } from "react";
import { Link } from "react-router-dom";

import "./app-bar-actions.component.scss";

const AppBarActions: FC = () => {
  return (
    <div className="AppBarActions">
      <Link
        id="LnkSearch"
        aria-label="Search"
        className="AppBarActions-button"
        role="button"
        to="/notes/search"
      >
        <FontAwesomeIcon icon="search" />
      </Link>

      <Link
        id="LnkArchives"
        aria-label="Archives"
        className="AppBarActions-button"
        role="button"
        to="/notes/archives"
      >
        <FontAwesomeIcon icon="archive" />
      </Link>
    </div>
  );
};

export default memo(AppBarActions);
