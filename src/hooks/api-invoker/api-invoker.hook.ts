import axios, {
  AxiosResponse,
  CancelTokenSource,
  InternalAxiosRequestConfig,
} from "axios";
import { useState } from "react";

import { API } from "@/constants";

import { APIInvokerConfig, APIInvokerHook } from "./api-invoker.model";

export function useAPIInvoker({
  baseUrl = "",
  headers = {},
}: Partial<APIInvokerConfig>): APIInvokerHook {
  const [cancelSource, setCancelSource] = useState({} as CancelTokenSource);

  const apiInvoker = axios.create({
    baseURL: baseUrl || API.BASE_URL,
    timeout: API.TIMEOUT,
    ...headers,
  });

  apiInvoker.interceptors.request.use(interceptRequest);
  apiInvoker.interceptors.response.use(
    interceptSuccessResponse,
    interceptErrorResponse
  );

  function createCancelToken(config: InternalAxiosRequestConfig): void {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    setCancelSource(source);

    config.cancelToken = source.token;
  }

  function cancelRequest(): void {
    if (cancelSource) {
      return cancelSource.cancel();
    }
  }

  function interceptRequest(config: InternalAxiosRequestConfig) {
    cancelRequest();
    createCancelToken(config);

    return config;
  }

  function interceptSuccessResponse(res: AxiosResponse): AxiosResponse {
    return res;
  }

  function interceptErrorResponse(err: any): Promise<never> {
    return Promise.reject(err);
  }

  return { apiInvoker };
}
