import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { Guest } from "@/app/auth/components";

const Login = lazy(() => import("./login/login.component"));
const Register = lazy(() => import("./register/register.component"));

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: (
      <Guest>
        <Login />
      </Guest>
    ),
  },
  {
    path: "register",
    element: (
      <Guest>
        <Register />
      </Guest>
    ),
  },
];
