import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider, ThemeProvider } from "@/contexts";

import AppRoutes from "./app.routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Suspense>
            <HelmetProvider>
              <AuthProvider>
                <AppRoutes />
              </AuthProvider>
            </HelmetProvider>
          </Suspense>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
