import { AxiosInstance, AxiosRequestConfig } from "axios";

export interface APIInvokerConfig {
  baseURL: string;
  headers: AxiosRequestConfig;
}

export interface APIInvokerHook {
  apiInvoker: AxiosInstance;
}
