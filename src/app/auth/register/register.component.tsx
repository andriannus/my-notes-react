import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { AppBar, Button, TextField } from "@/components";

import { AuthLayout } from "../components";

import { useRegister } from "./register.hook";

const Register: FC = () => {
  const { t } = useTranslation("translation", {
    keyPrefix: "app.auth.register",
  });

  const {
    formState,
    handleRegisterFormSubmit,
    handleSubmit,
    isLoading,
    register,
    values,
  } = useRegister();

  return (
    <>
      <Helmet>
        <title>{t("title")} - myNotes</title>
      </Helmet>

      <AppBar>
        <AppBar.Title>{t("title")}</AppBar.Title>
        <AppBar.Actions />
      </AppBar>

      <form onSubmit={handleSubmit(handleRegisterFormSubmit)}>
        <AuthLayout>
          <AuthLayout.Body>
            <TextField
              id="TxtName"
              autoCapitalize="off"
              autoComplete="name"
              className="mb-bs"
              placeholder={t<string>("form.name")}
              value={values.name}
              {...register("name", { required: true })}
            />

            <TextField
              id="TxtEmail"
              autoCapitalize="off"
              autoComplete="email"
              className="mb-bs"
              placeholder={t<string>("form.email")}
              type="email"
              value={values.email}
              {...register("email", {
                pattern: /\S+@\S+\.\S+/,
                required: true,
              })}
            />

            <TextField
              id="TxtPassword"
              autoCapitalize="off"
              autoComplete="new-password"
              className="mb-sm"
              placeholder={t<string>("form.password")}
              type="password"
              value={values.password}
              {...register("password", { minLength: 8, required: true })}
            />

            <span className="text-xs dark:text-white">
              {t("caption.text")}&nbsp;
              <Link className="Link" to="/login">
                {t("caption.link")}
              </Link>
            </span>
          </AuthLayout.Body>

          <AuthLayout.Footer>
            <Button
              id="BtnClose"
              color="primary"
              disabled={!formState.isValid || isLoading}
              fullWidth
              type="submit"
            >
              {isLoading ? t("form.button.loading") : t("form.button.text")}
            </Button>
          </AuthLayout.Footer>
        </AuthLayout>
      </form>
    </>
  );
};

export default Register;
