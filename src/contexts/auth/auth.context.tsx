import PropTypes from "prop-types";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";

import { MYN_ACCESS_TOKEN, MYN_USER } from "@/constants";
import { useLocalStorage } from "@/hooks";

import { AuthContext, UserLoggedIn } from "./auth.model";

const AuthContext = createContext<AuthContext>({
  accessToken: null,
  user: null,
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const ls = useLocalStorage();

  const accessToken = useMemo(() => {
    return ls.get<string>(MYN_ACCESS_TOKEN);
  }, [ls]);

  const user = useMemo(() => {
    return ls.get<UserLoggedIn>(MYN_USER);
  }, [ls]);

  return (
    <AuthContext.Provider value={{ accessToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => useContext(AuthContext);
