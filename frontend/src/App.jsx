import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
      <Navbar />
      <WhatsAppButton />
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
              <Footer />
            </>
          }
        />
        <Route path="/service/:serviceId" element={<ServiceDetails />} />
        <Route path="/technology/:techId" element={<TechnologyDetails />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </Router>
  );
};

export default App;
