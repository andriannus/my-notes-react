import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { AppBar, Button, Scaffold, TextField } from "@/components";

import { useLogin } from "./login.hook";

const Login: FC = () => {
  const { t } = useTranslation("translation", { keyPrefix: "app.auth.login" });

  const {
    formState,
    handleLoginFormSubmit,
    handleSubmit,
    isLoading,
    register,
    values,
  } = useLogin();

  return (
    <>
      <Helmet>
        <title>{t("title")} - myNotes</title>
      </Helmet>

      <AppBar>
        <AppBar.Title>{t("title")}</AppBar.Title>
        <AppBar.Actions />
      </AppBar>

      <form onSubmit={handleSubmit(handleLoginFormSubmit)}>
        <Scaffold>
          <Scaffold.Body>
            <TextField
              id="TxtEmail"
              autoCapitalize="off"
              autoComplete="email"
              className="mb-bs"
              placeholder={t<string>("form.email")}
              value={values.email}
              {...register("email", {
                pattern: /\S+@\S+\.\S+/,
                required: true,
              })}
            />

            <TextField
              id="TxtPassword"
              autoCapitalize="off"
              autoComplete="current-password"
              className="mb-sm"
              placeholder={t<string>("form.password")}
              type="password"
              value={values.password}
              {...register("password", { required: true })}
            />

            <span className="text-xs dark:text-white">
              {t("caption.text")}&nbsp;
              <Link className="Link" to="/register">
                {t("caption.link")}
              </Link>
            </span>
          </Scaffold.Body>

          <Scaffold.Footer>
            <Button
              id="BtnClose"
              color="primary"
              disabled={!formState.isValid || isLoading}
              fullWidth
              type="submit"
            >
              {isLoading ? t("form.button.loading") : t("form.button.text")}
            </Button>
          </Scaffold.Footer>
        </Scaffold>
      </form>
    </>
  );
};

export default Login;
