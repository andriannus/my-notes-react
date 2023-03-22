import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faArchive,
  faArrowLeft,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import { App } from "@/app";

import "./main.scss";

config.autoAddCss = false;
library.add(faArchive, faArrowLeft, faSignOut);

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
