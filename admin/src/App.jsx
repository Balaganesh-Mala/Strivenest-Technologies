import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import AdminLogin from "./pages/auth/AdminLogin";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN PANEL */}
      <Route path="/*" element={<AdminRoutes />} />
      <Route
          path="/"
          element={<Navigate to="/admin/dashboard" replace />}
        />

      {/* GLOBAL 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
