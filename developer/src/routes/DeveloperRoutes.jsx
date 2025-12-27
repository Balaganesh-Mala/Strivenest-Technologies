import { Routes, Route } from "react-router-dom";
import DeveloperLogin from "../pages/auth/Login";
import DeveloperLayout from "../components/layout/DeveloperLayout";
import DeveloperProtectedRoute from "../components/layout/DeveloperProtectedRoute";

import Dashboard from "../pages/dashboard/Dashboard";
import MyProjects from "../pages/projects/MyProjects";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

export default function DeveloperRoutes() {
  return (
    <Routes>
      <Route path="/developer/login" element={<DeveloperLogin />} />

      {/* ✅ PUBLIC RESET ROUTES */}
      <Route path="/developer/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/developer/reset-password/:token"
        element={<ResetPassword />}
      />

      <Route
        path="/developer"
        element={
          <DeveloperProtectedRoute>
            <DeveloperLayout />
          </DeveloperProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<MyProjects />} />
      </Route>
    </Routes>
  );
}

