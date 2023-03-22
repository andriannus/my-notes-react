import { AxiosInstance, AxiosRequestConfig } from "axios";

export interface APIInvokerConfig {
  baseUrl: string;
  headers: AxiosRequestConfig;
}

export interface APIInvokerHook {
  apiInvoker: AxiosInstance;
}
