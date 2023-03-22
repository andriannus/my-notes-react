import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "@/app/app.routes";
import { AuthProvider, NoteProvider } from "@/contexts";

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
              <NoteProvider>
                <AppRoutes />
              </NoteProvider>
            </AuthProvider>
          </HelmetProvider>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
