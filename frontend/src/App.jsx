import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
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
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister/AdminRegister.jsx";
import Dashboard from "./AdminPages/Dashboard/Dashboard.jsx";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin/login" replace />;
};


const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}
      {!isAdminPage && <WhatsAppButton />}
      {children}
      {!isAdminPage && <Footer />}
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

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />

          <Route
            path="/admin"
            element={
              
                <Dashboard />
              
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
