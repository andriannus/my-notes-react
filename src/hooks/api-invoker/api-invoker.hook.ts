import axios, {
  AxiosError,
  AxiosResponse,
  CancelTokenSource,
  InternalAxiosRequestConfig,
} from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { API, HTTP_STATUS_CODES, MYN_ACCESS_TOKEN } from "@/constants";
import { useLocalStorage } from "@/hooks";

import { APIInvokerConfig, APIInvokerHook } from "./api-invoker.model";

export function useAPIInvoker(
  config?: Partial<APIInvokerConfig>
): APIInvokerHook {
  const ls = useLocalStorage();
  const navigate = useNavigate();

  const [cancelSource, setCancelSource] = useState<CancelTokenSource>();

  const apiInvoker = axios.create({
    baseURL: config?.baseURL || API.BASE_URL,
    timeout: API.TIMEOUT,
    ...config?.headers,
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

  function interceptErrorResponse(err: AxiosError): Promise<never> {
    if (err.response?.status === HTTP_STATUS_CODES.UNAUTHORIZED) {
      ls.remove(MYN_ACCESS_TOKEN);
      navigate("/login");
    }

    return Promise.reject(err);
  }

  return { apiInvoker };
}
