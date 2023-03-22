import PropTypes from "prop-types";
import { FC, PropsWithChildren } from "react";

const AuthLayoutBody: FC<PropsWithChildren> = ({ children }) => {
  return <div className="AuthLayout-body">{children}</div>;
};

AuthLayoutBody.propTypes = {
  children: PropTypes.node,
};

export default AuthLayoutBody;
