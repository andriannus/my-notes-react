import { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppRoutes from "@/app/app.routes";

const App: FC<Record<string, unknown>> = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
