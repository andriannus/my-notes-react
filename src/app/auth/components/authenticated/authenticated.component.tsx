import PropTypes from "prop-types";
import { FC, PropsWithChildren } from "react";
import { createSearchParams, Navigate, useLocation } from "react-router-dom";

import { useAuth } from "@/contexts";

const Authenticated: FC<PropsWithChildren> = ({ children }) => {
  const { accessToken } = useAuth();
  const location = useLocation();

  if (!accessToken)
    return (
      <Navigate
        replace
        to={{
          pathname: "/notes",
          search: createSearchParams({
            redirect: location.pathname,
          }).toString(),
        }}
      />
    );

  return <>{children}</>;
};

Authenticated.propTypes = {
  children: PropTypes.node,
};

export default Authenticated;
