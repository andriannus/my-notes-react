import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { AppBar, Button, TextField } from "@/components";

import { AuthLayout } from "../components";

const Login: FC = () => {
  return (
    <>
      <Helmet>
        <title>Masuk - myNotes</title>
      </Helmet>

      <AppBar>
        <AppBar.Title>Masuk</AppBar.Title>
      </AppBar>

      <AuthLayout>
        <AuthLayout.Body>
          <TextField
            id="TxtEmail"
            autoCapitalize="off"
            autoComplete="email"
            className="mb-bs"
            placeholder="Email"
          />

          <TextField
            id="TxtPassword"
            autoCapitalize="off"
            autoComplete="current-password"
            className="mb-sm"
            placeholder="Password"
            type="password"
          />

          <span className="text-xs">
            Belum punya akun?{" "}
            <Link className="Link" to="/register">
              Daftar
            </Link>
          </span>
        </AuthLayout.Body>

        <AuthLayout.Footer>
          <Button id="BtnClose" color="primary" fullWidth type="button">
            Masuk
          </Button>
        </AuthLayout.Footer>
      </AuthLayout>
    </>
  );
};

export default Login;
