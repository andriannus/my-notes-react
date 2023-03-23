import { AxiosRequestConfig } from "axios";
import PropTypes from "prop-types";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";

import { MYN_ACCESS_TOKEN, MYN_USER } from "@/constants";
import { useLocalStorage } from "@/hooks";

import { AuthContextProps, UserLoggedIn } from "./auth.model";

const AuthContext = createContext<AuthContextProps>({
  accessToken: null,
  authHeaders: {},
  logout: () => null,
  user: null,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const ls = useLocalStorage();
  const navigate = useNavigate();

  const accessToken = ls.get<string>(MYN_ACCESS_TOKEN);
  const user = ls.get<UserLoggedIn>(MYN_USER);

  const authHeaders = useMemo<AxiosRequestConfig>(() => {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }, [accessToken]);

  function logout(): void {
    ls.remove(MYN_ACCESS_TOKEN);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ accessToken, authHeaders, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => useContext(AuthContext);
