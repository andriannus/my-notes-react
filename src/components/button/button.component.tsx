import classNames from "classnames";
import PropTypes from "prop-types";
import { FC, memo, MouseEventHandler, PropsWithChildren, useMemo } from "react";
import { Link } from "react-router-dom";

import "./button.component.scss";

interface ButtonProps {
  color: "" | "primary" | "success";
  disabled: boolean;
  fullWidth: boolean;
  id: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  outlined: boolean;
  rounded: boolean;
  small: boolean;
  to: string;
  type: "button" | "submit" | "reset";
}

const Button: FC<PropsWithChildren<Partial<ButtonProps>>> = ({
  children,
  color = "",
  disabled = false,
  fullWidth = false,
  id = "",
  onClick = () => {},
  outlined = false,
  rounded = false,
  small = false,
  to = "",
  type = "button",
}) => {
  const hasURL = useMemo(() => !!to, [to]);

  const buttonClasses = classNames([
    {
      [`Button--${color}`]: !!color,
      ["Button--fullWidth"]: fullWidth,
      ["Button--outlined"]: outlined,
      ["Button--rounded"]: rounded,
      ["Button--small"]: small,
    },
    "Button",
  ]);

  return (
    <>
      {hasURL && (
        <Link className={buttonClasses} to={to}>
          {children}
        </Link>
      )}

      {!hasURL && (
        <button
          id={id}
          className={buttonClasses}
          disabled={disabled}
          type={type}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(["", "primary", "success"]),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  id: PropTypes.string,
  onClick: PropTypes.func,
  outlined: PropTypes.bool,
  rounded: PropTypes.bool,
  small: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default memo(Button);
