import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { RegisterForm } from "./register.model";

export function useRegister() {
  const { formState, register, watch } = useForm<RegisterForm>({
    mode: "onChange",
  });

  const [values, setValues] = useState({} as Partial<RegisterForm>);

  useEffect(() => {
    const subscription = watch(setValues);
    return () => subscription.unsubscribe();
  }, [watch]);

  return { formState, register, values };
}
