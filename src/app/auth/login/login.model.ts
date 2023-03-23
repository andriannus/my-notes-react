import { ResponseWithData } from "@/models";

export interface LoginForm {
  email: string;
  password: string;
}

export type LoginResponse = ResponseWithData<{ accessToken: string }>;
