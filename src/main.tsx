import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faArchive,
  faArrowLeft,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

import { App } from "@/app";
import { AuthProvider, NoteProvider } from "@/contexts";

import "./main.scss";

config.autoAddCss = false;
library.add(faArchive, faArrowLeft, faSearch);

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
  <StrictMode>
    <Suspense>
      <HelmetProvider>
        <AuthProvider>
          <NoteProvider>
            <App />
          </NoteProvider>
        </AuthProvider>
      </HelmetProvider>
    </Suspense>
  </StrictMode>
);
