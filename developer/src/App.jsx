import { Routes, Route, Navigate } from "react-router-dom";
import { DeveloperAuthProvider } from "./context/DeveloperAuthContext";

import DeveloperRoutes from "./routes/DeveloperRoutes";
import NotFound from "./pages/Notfound";

export default function App() {
  return (
    <DeveloperAuthProvider>
      <Routes>
        {/* Redirect root to developer login */}
        <Route
          path="/"
          element={<Navigate to="/developer/dashboard" replace />}
        />

        {/* Developer Routes */}
        <Route path="/developer/*" element={<DeveloperRoutes />} />

        {/* ✅ GLOBAL NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </DeveloperAuthProvider>
  );
}
