import PropTypes from "prop-types";
import { FC, PropsWithChildren } from "react";

const AuthLayoutFooter: FC<PropsWithChildren> = ({ children }) => {
  return <div className="AuthLayout-footer">{children}</div>;
};

AuthLayoutFooter.propTypes = {
  children: PropTypes.node,
};

export default AuthLayoutFooter;
