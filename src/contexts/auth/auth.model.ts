export interface UserLoggedIn {
  email: string;
  id: string;
  name: string;
}

export interface AuthContext {
  accessToken: string | null;
  logout(): void;
  user: UserLoggedIn | null;
}
