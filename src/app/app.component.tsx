import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "@/contexts";

import AppRoutes from "./app.routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: FC<Record<string, unknown>> = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense>
          <HelmetProvider>
            <AuthProvider>
              <AppRoutes />
            </AuthProvider>
          </HelmetProvider>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
