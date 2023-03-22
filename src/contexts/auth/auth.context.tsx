import PropTypes from "prop-types";
import { createContext, FC, PropsWithChildren, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { MYN_ACCESS_TOKEN, MYN_USER } from "@/constants";
import { useLocalStorage } from "@/hooks";

import { AuthContext, UserLoggedIn } from "./auth.model";

const AuthContext = createContext<AuthContext>({
  accessToken: null,
  logout: () => null,
  user: null,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const ls = useLocalStorage();
  const navigate = useNavigate();

  const accessToken = ls.get<string>(MYN_ACCESS_TOKEN);
  const user = ls.get<UserLoggedIn>(MYN_USER);

  function logout(): void {
    ls.remove(MYN_ACCESS_TOKEN);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ accessToken, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => useContext(AuthContext);
