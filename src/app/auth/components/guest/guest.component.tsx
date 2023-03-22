import PropTypes from "prop-types";
import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@/contexts";

const Guest: FC<PropsWithChildren> = ({ children }) => {
  const { accessToken } = useAuth();

  if (!!accessToken) return <Navigate replace to="/notes" />;

  return <>{children}</>;
};

Guest.propTypes = {
  children: PropTypes.node,
};

export default Guest;
