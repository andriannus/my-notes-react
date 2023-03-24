import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { FC, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./app-bar-back-button.component.scss";

interface AppBarBackButtonProps {
  disabled: boolean;
  href: string;
  replace: boolean;
}

const AppBarBackButton: FC<Partial<AppBarBackButtonProps>> = ({
  disabled = false,
  href = "",
  replace = false,
}) => {
  const navigate = useNavigate();

  const hasURL = useMemo(() => !!href, [href]);

  return (
    <>
      {hasURL && (
        <Link
          id="BtnAppBarBack"
          aria-label="Back"
          className="AppBar-backButton"
          replace={replace}
          role="button"
          to={href}
        >
          <FontAwesomeIcon icon="arrow-left" />
        </Link>
      )}

      {!hasURL && (
        <button
          id="BtnAppBarBack"
          aria-label="Back"
          className="AppBar-backButton"
          disabled={disabled}
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon="arrow-left" />
        </button>
      )}
    </>
  );
};

AppBarBackButton.propTypes = {
  disabled: PropTypes.bool,
  href: PropTypes.string,
  replace: PropTypes.bool,
};

export default AppBarBackButton;
