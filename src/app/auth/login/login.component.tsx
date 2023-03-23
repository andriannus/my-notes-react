import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { AppBar, Button, TextField } from "@/components";

import { AuthLayout } from "../components";

import { useLogin } from "./login.hook";

const Login: FC = () => {
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
        <title>Masuk - myNotes</title>
      </Helmet>

      <AppBar>
        <AppBar.Title>Masuk</AppBar.Title>
        <AppBar.Actions />
      </AppBar>

      <form onSubmit={handleSubmit(handleLoginFormSubmit)}>
        <AuthLayout>
          <AuthLayout.Body>
            <TextField
              id="TxtEmail"
              autoCapitalize="off"
              autoComplete="email"
              className="mb-bs"
              placeholder="Email"
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
              placeholder="Password"
              type="password"
              value={values.password}
              {...register("password", { required: true })}
            />

            <span className="text-xs dark:text-white">
              Belum punya akun?{" "}
              <Link className="Link" to="/register">
                Daftar
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
              {isLoading ? "Sedang memuat..." : "Masuk"}
            </Button>
          </AuthLayout.Footer>
        </AuthLayout>
      </form>
    </>
  );
};

export default Login;
