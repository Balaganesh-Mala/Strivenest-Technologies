import { Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import AdminLogin from "./pages/auth/AdminLogin";

function App() {
  return (
    <Routes>
      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ADMIN PANEL */}
      <Route path="/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default App;
