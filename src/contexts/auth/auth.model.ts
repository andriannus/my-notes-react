import { AxiosRequestConfig } from "axios";

export interface UserLoggedIn {
  email: string;
  id: string;
  name: string;
}

export interface AuthContextProps {
  accessToken: string | null;
  authHeaders: AxiosRequestConfig;
  logout(): void;
  user: UserLoggedIn | null;
}
