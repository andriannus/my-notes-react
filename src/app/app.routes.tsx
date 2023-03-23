import { FC, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { DefaultLayout } from "@/layouts";

import { authRoutes } from "./auth";
import { noteRoutes } from "./notes";

const NotFound = lazy(() => import("./not-found/not-found.component"));

const AppRoutes: FC = () => {
  const routes = useRoutes([
    {
      path: "*",
      element: <Navigate replace to="/404" />,
    },
    
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          index: true,
          element: <Navigate replace to="/notes" />,
        },
        {
          path: "404",
          element: <NotFound />,
        },
        ...authRoutes,
        ...noteRoutes,
      ],
    },
  ]);

  return routes;
};

export default AppRoutes;
