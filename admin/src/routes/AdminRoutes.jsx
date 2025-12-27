import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ClientRequests from "../pages/requests/ClientRequests";
import Developers from "../pages/developers/Developers";
import Projects from "../pages/projects/Projects";
import NotFound from "../pages/Notfound";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* /admin */}
        <Route index element={<Dashboard />} />

        {/* /admin/dashboard */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="requests" element={<ClientRequests />} />
        <Route path="developers" element={<Developers />} />
        <Route path="projects" element={<Projects />} />

        {/* ✅ ADMIN 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
