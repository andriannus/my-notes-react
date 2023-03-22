import { FC, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "@/app/app.routes";
import { AuthProvider, NoteProvider } from "@/contexts";

const App: FC<Record<string, unknown>> = () => {
  return (
    <Router>
      <Suspense>
        <HelmetProvider>
          <AuthProvider>
            <NoteProvider>
              <AppRoutes />
            </NoteProvider>
          </AuthProvider>
        </HelmetProvider>
      </Suspense>
    </Router>
  );
};

export default App;
