import { Routes, Route, Navigate } from "react-router-dom";

import DeveloperLogin from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import DeveloperLayout from "../components/layout/DeveloperLayout";
import DeveloperProtectedRoute from "../components/layout/DeveloperProtectedRoute";

import Dashboard from "../pages/dashboard/Dashboard";
import MyProjects from "../pages/projects/MyProjects";
import DeveloperNotFound from "../pages/DeveloperNotFound";

export default function DeveloperRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/login" element={<DeveloperLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      {/* ================= PROTECTED ROUTES ================= */}
      <Route
        path="/"
        element={
          <DeveloperProtectedRoute>
            <DeveloperLayout />
          </DeveloperProtectedRoute>
        }
      >
        {/* ✅ DEFAULT REDIRECT */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<MyProjects />} />

        {/* ✅ DEVELOPER 404 */}
        <Route path="*" element={<DeveloperNotFound />} />
      </Route>
    </Routes>
  );
}
