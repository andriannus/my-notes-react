import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import { MYN_ACCESS_TOKEN } from "@/constants";
import { useAPIInvoker, useLocalStorage } from "@/hooks";

import { LoginForm, LoginResponse } from "./login.model";

export function useLogin() {
  const { apiInvoker } = useAPIInvoker();
  const ls = useLocalStorage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { formState, handleSubmit, register, watch } = useForm<LoginForm>({
    mode: "onChange",
  });

  const [values, setValues] = useState({} as Partial<LoginForm>);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  const login = useCallback(
    async (payload: LoginForm) => {
      setIsLoading(true);

      try {
        const { data: Data } = await apiInvoker.post<LoginResponse>(
          "/login",
          payload
        );

        setIsLoading(false);
        ls.set(MYN_ACCESS_TOKEN, Data.data.accessToken);

        const redirect = searchParams.get("redirect");
        navigate(redirect || "/notes", { replace: true });
      } catch (error) {
        console.error(error);
      }
    },
    [apiInvoker, ls, navigate]
  );

  const handleLoginFormSubmit: SubmitHandler<LoginForm> = useCallback(
    async (data) => {
      try {
        await login(data);
      } catch (error) {
        //
      }
    },
    [login]
  );
  return {
    formState,
    handleLoginFormSubmit,
    handleSubmit,
    isLoading,
    login,
    register,
    values,
  };
}
