import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Login = lazy(() => import("./login/login.component"));
const Register = lazy(() => import("./register/register.component"));

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
];
