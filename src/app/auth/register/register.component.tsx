import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { AppBar, Button, TextField } from "@/components";

import { AuthLayout } from "../components";

import { useRegister } from "./register.hook";

const Register: FC = () => {
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
        <title>Daftar - myNotes</title>
      </Helmet>

      <AppBar>
        <AppBar.Title>Daftar</AppBar.Title>
      </AppBar>

      <form onSubmit={handleSubmit(handleRegisterFormSubmit)}>
        <AuthLayout>
          <AuthLayout.Body>
            <TextField
              id="TxtName"
              autoCapitalize="off"
              autoComplete="name"
              className="mb-bs"
              placeholder="Nama"
              value={values.name}
              {...register("name", { required: true })}
            />

            <TextField
              id="TxtEmail"
              autoCapitalize="off"
              autoComplete="email"
              className="mb-bs"
              placeholder="Email"
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
              placeholder="Password"
              type="password"
              value={values.password}
              {...register("password", { minLength: 8, required: true })}
            />

            <span className="text-xs">
              Sudah punya akun?{" "}
              <Link className="Link" to="/login">
                Masuk
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
              {isLoading ? "Sedang memuat..." : "Daftar"}
            </Button>
          </AuthLayout.Footer>
        </AuthLayout>
      </form>
    </>
  );
};

export default Register;
