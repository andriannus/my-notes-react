import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faArchive,
  faArrowLeft,
  faMoon,
  faSignOut,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

import { App } from "@/app";

import "./i18n";
import "./main.scss";

config.autoAddCss = false;
library.add(faArchive, faArrowLeft, faMoon, faSignOut, faSun);

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
