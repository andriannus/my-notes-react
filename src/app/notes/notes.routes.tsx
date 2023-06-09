import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { Authenticated } from "@/app/auth/components";

const Archives = lazy(() => import("./archives/archives.component"));
const Create = lazy(() => import("./create/create.component"));
const Detail = lazy(() => import("./detail/detail.component"));
const Home = lazy(() => import("./home/home.component"));

export const noteRoutes: RouteObject[] = [
  {
    path: "notes",
    children: [
      {
        index: true,
        element: (
          <Authenticated>
            <Home />
          </Authenticated>
        ),
      },
      {
        path: ":id",
        element: (
          <Authenticated>
            <Detail />
          </Authenticated>
        ),
      },
      {
        path: "create",
        element: (
          <Authenticated>
            <Create />
          </Authenticated>
        ),
      },
      {
        path: "archives",
        element: (
          <Authenticated>
            <Archives />
          </Authenticated>
        ),
      },
    ],
  },
];
