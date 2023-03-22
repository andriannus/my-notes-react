export interface UserLoggedIn {
  email: string;
  id: string;
  name: string;
}

export interface AuthContext {
  accessToken: string | null;
  user: UserLoggedIn | null;
}
