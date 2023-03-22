import { Response } from "@/models";

export interface LoginForm {
  email: string;
  password: string;
}

export type LoginResponse = Response<{ accessToken: string }>;
