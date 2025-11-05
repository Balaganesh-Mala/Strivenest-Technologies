import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import DeveloperDashboard from "./pages/Developer/DeveloperDashboard";
import ProjectRequests from "./pages/Developer/ProjectRequests";
import ProjectSummary from "./pages/Developer/ProjectSummary";
import Notifications from "./pages/Developer/Notifications";
import Help from "./pages/Developer/Help";
import Settings from "./pages/Developer/Settings";
import { getAuthToken } from "./api/apiClient";

const isLoggedIn = !!getAuthToken();

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/developer/dashboard",
    element: isLoggedIn ? <DeveloperDashboard /> : <Navigate to="/" />,
  },
  {
    path: "/developer/requests",
    element: isLoggedIn ? <ProjectRequests /> : <Navigate to="/" />,
  },
  {
    path: "/developer/summary",
    element: isLoggedIn ? <ProjectSummary /> : <Navigate to="/" />,
  },
  {
    path: "/developer/notifications",
    element: isLoggedIn ? <Notifications /> : <Navigate to="/" />,
  },
  {
    path: "/developer/help",
    element: isLoggedIn ? <Help /> : <Navigate to="/" />,
  },
  {
    path: "/developer/settings",
    element: isLoggedIn ? <Settings /> : <Navigate to="/" />,
  },
]);

export default router;
