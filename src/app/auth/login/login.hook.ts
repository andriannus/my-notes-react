import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { LoginForm } from "./login.model";

export function useLogin() {
  const { formState, register, watch } = useForm<LoginForm>({
    mode: "onChange",
  });

  const [values, setValues] = useState({} as Partial<LoginForm>);

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  return { formState, register, values };
}
