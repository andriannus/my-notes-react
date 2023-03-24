import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ErrorToast } from "@/components";
import { HTTP_STATUS_CODES } from "@/constants";
import { useAPIInvoker } from "@/hooks";
import { Response } from "@/models";

import { RegisterForm } from "./register.model";

export function useRegister() {
  const { apiInvoker } = useAPIInvoker();
  const navigate = useNavigate();

  const { t } = useTranslation("translation", {
    keyPrefix: "app.auth.register",
  });

  const { formState, handleSubmit, register, watch } = useForm<RegisterForm>({
    mode: "onChange",
  });

  const [values, setValues] = useState({} as Partial<RegisterForm>);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleRegisterFormSubmit: SubmitHandler<RegisterForm> = useCallback(
    async (data) => {
      setIsLoading(true);

      try {
        await apiInvoker.post<Response>("/register", data);

        setIsLoading(false);
        navigate("/login");
      } catch (error) {
        setIsLoading(false);

        const { response } = error as AxiosError<Response>;

        if (response?.status === HTTP_STATUS_CODES.BAD_REQUEST) {
          ErrorToast(t("toast.error"));
        }
      }
    },
    [apiInvoker, navigate]
  );

  return {
    formState,
    handleRegisterFormSubmit,
    handleSubmit,
    isLoading,
    register,
    values,
  };
}
