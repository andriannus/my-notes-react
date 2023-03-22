import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { AppBar, Button, TextField } from "@/components";

import { AuthLayout } from "../components";

const Register: FC = () => {
  return (
    <>
      <Helmet>
        <title>Daftar - myNotes</title>
      </Helmet>

      <AppBar>
        <AppBar.Title>Daftar</AppBar.Title>
      </AppBar>

      <AuthLayout>
        <AuthLayout.Body>
          <TextField
            id="TxtName"
            autoCapitalize="off"
            autoComplete="name"
            className="mb-bs"
            placeholder="Nama"
          />

          <TextField
            id="TxtEmail"
            autoCapitalize="off"
            autoComplete="email"
            className="mb-bs"
            placeholder="Email"
            type="email"
          />

          <TextField
            id="TxtPassword"
            autoCapitalize="off"
            autoComplete="new-password"
            className="mb-sm"
            placeholder="Password"
            type="password"
          />

          <span className="text-xs">
            Sudah punya akun?{" "}
            <Link className="Link" to="/login">
              Masuk
            </Link>
          </span>
        </AuthLayout.Body>

        <AuthLayout.Footer>
          <Button id="BtnClose" color="primary" fullWidth type="button">
            Daftar
          </Button>
        </AuthLayout.Footer>
      </AuthLayout>
    </>
  );
};

export default Register;
