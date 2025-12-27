import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD ADMIN FROM STORAGE ================= */
  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    const storedAdmin = localStorage.getItem("admin_user");

    if (storedToken && storedAdmin) {
      setToken(storedToken);
      setAdmin(JSON.parse(storedAdmin));
    }

    setLoading(false);
  }, []);

  /* ================= LOGIN ================= */
  const login = (adminData, jwtToken) => {
    localStorage.setItem("admin_token", jwtToken);
    localStorage.setItem("admin_user", JSON.stringify(adminData));

    setAdmin(adminData);
    setToken(jwtToken);
  };

  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");

    setAdmin(null);
    setToken(null);

    navigate("/admin/login");
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
