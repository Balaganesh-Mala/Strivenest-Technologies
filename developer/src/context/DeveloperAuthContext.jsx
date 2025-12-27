import { createContext, useContext, useEffect, useState } from "react";
import { developerLogin } from "../api/developer.api";

const DeveloperAuthContext = createContext();

export const DeveloperAuthProvider = ({ children }) => {
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= RESTORE SESSION ================= */
  useEffect(() => {
    const storedDev = localStorage.getItem("developer_user");
    if (storedDev) {
      setDeveloper(JSON.parse(storedDev));
    }
    setLoading(false);
  }, []);

  /* ================= LOGIN ================= */
 const login = async (email, password) => {
  const res = await developerLogin({ email, password });

  console.log("LOGIN RESPONSE 👉", res.data);

  const { token, user } = res.data;

  if (!user || user.role !== "DEVELOPER") {
    throw new Error("Not a developer account");
  }

  localStorage.setItem("developer_token", token);
  localStorage.setItem("developer_user", JSON.stringify(user));

  setDeveloper(user);
  return res;
};



  /* ================= LOGOUT ================= */
  const logout = () => {
    localStorage.removeItem("developer_token");
    localStorage.removeItem("developer_user");
    setDeveloper(null);
  };

  return (
    <DeveloperAuthContext.Provider
      value={{ developer, login, logout, loading }}
    >
      {!loading && children}
    </DeveloperAuthContext.Provider>
  );
};

export const useDeveloperAuth = () => useContext(DeveloperAuthContext);
