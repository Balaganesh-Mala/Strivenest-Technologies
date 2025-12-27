import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import Services from "./pages/Services/Services.jsx";
import Process from "./pages/Process/Process.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import Testimonials from "./pages/Testimonials/Testimonials.jsx";
import FAQ from "./pages/FAQ/FAQ.jsx";
import Blogs from "./pages/Blogs/Blogs.jsx";
import Footer from "./pages/Footer/Footer.jsx";
import ConsultationForm from "./pages/ConsultationForm/ConsultationForm.jsx";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton.jsx";
import ServiceDetails from "./pages/ServiceDetails/ServiceDetails.jsx";
import TechnologyDetails from "./pages/TechnologyDetails/TechnologyDetails.jsx";

// Admin Pages
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister/AdminRegister.jsx";
import Dashboard from "./AdminPages/Dashboard/Dashboard.jsx";

// Developer Pages
import DeveloperLogin from "./DeveloperPages/pages/Auth/Login.jsx";
import DeveloperRegister from "./pages/DeveloperRegister/DeveloperRegister.jsx";
import DeveloperDashboard from "./DeveloperPages/pages/Developer/DeveloperDashboard.jsx";
import ProjectRequests from "./DeveloperPages/pages/Developer/ProjectRequests.jsx";
import ProjectSummary from "./DeveloperPages/pages/Developer/ProjectSummary.jsx";
import Notifications from "./DeveloperPages/pages/Developer/Notifications.jsx";
import Help from "./DeveloperPages/pages/Developer/Help.jsx";
import Settings from "./DeveloperPages/pages/Developer/Settings.jsx";

import { getAuthToken } from "./DeveloperPages/api/apiClient.js";
import { Toaster } from "react-hot-toast";

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
};

const DeveloperPrivateRoute = ({ children }) => {
  const token = getAuthToken();
  return token ? children : <Navigate to="/developer/login" replace />;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isDeveloperPage = location.pathname.startsWith("/developer");

  return (
    <>
      {!isAdminPage && !isDeveloperPage && <Navbar />}
      {!isAdminPage && !isDeveloperPage && <WhatsAppButton />}
      {children}
      {!isAdminPage && !isDeveloperPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <AboutUs />
                <Services />
                <Process />
                <Projects />
                <Testimonials />
                <FAQ />
                <ConsultationForm />
              </>
            }
          />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/service/:serviceId" element={<ServiceDetails />} />
          <Route path="/technology/:techId" element={<TechnologyDetails />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster position="top-right" />
      </Layout>
    </Router>
  );
};

export default App;
