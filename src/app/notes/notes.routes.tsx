import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Archives = lazy(() => import("./archives/archives.component"));
const Detail = lazy(() => import("./detail/detail.component"));
const Home = lazy(() => import("./home/home.component"));
const Search = lazy(() => import("./search/search.component"));

export const noteRoutes: RouteObject[] = [
  {
    path: "notes",
    children: [
      { index: true, element: <Home /> },
      { path: ":id", element: <Detail /> },
      { path: "archives", element: <Archives /> },
      { path: "search", element: <Search /> },
    ],
  },
];
