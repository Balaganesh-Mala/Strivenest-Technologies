import { Navigate } from "react-router-dom";
import { useDeveloperAuth } from "../../context/DeveloperAuthContext";

export default function DeveloperProtectedRoute({ children }) {
  const { developer, loading } = useDeveloperAuth();

  if (loading) return null;

  if (!developer) {
    return <Navigate to="/developer/login" replace />;
  }

  return children;
}
