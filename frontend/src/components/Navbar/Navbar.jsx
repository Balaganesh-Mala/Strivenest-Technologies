import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import QuoteForm from "../QuoteForm/QuoteForm";
import {
  FaBars,
  FaTimes,
  FaLaptopCode,
  FaMobileAlt,
  FaCloud,
  FaPenNib,
  FaBullhorn,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaJsSquare,
  FaDatabase,
  FaAndroid,
  FaApple,
  FaAws,
  FaDocker,
} from "react-icons/fa";
import { SiFlutter } from "react-icons/si";
import "./Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSection, setOpenSection] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleQuoteForm = () => setShowQuote(!showQuote);
  const toggleSection = (section) =>
    setOpenSection(openSection === section ? "" : section);

  const goToService = (id) => {
    navigate(`/service/${id}`);
    setIsSidebarOpen(false);
  };

  const goToTech = (id) => {
    navigate(`/technology/${id}`);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/"><img src="https://ik.imagekit.io/iiz6sw7ik/IMG_20251025_123454.png?updatedAt=1761375924313" alt="website logo" /></Link>
          </div>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="#about">About</a></li>

            <li className="dropdown">
              <span>Services ▾</span>
              <ul className="dropdown-menu">
                <li onClick={() => goToService("web")}><FaLaptopCode /> Web Development</li>
                <li onClick={() => goToService("app")}><FaMobileAlt /> App Development</li>
                <li onClick={() => goToService("cloud")}><FaCloud /> Cloud Service</li>
                <li onClick={() => goToService("branding")}><FaPenNib /> Logo & Branding</li>
                <li onClick={() => goToService("marketing")}><FaBullhorn /> Digital Marketing</li>
              </ul>
            </li>

            <li className="dropdown">
              <span>Technologies ▾</span>
              <ul className="dropdown-menu ">
                <div className="tech-grid">
                <li className="tech-group">
                  <strong>App Development</strong>
                  <ul>
                    <li onClick={() => goToTech("android")}><FaAndroid /> Android</li>
                    <li onClick={() => goToTech("ios")}><FaApple /> iOS</li>
                    <li onClick={() => goToTech("reactnative")}><FaReact /> React Native</li>
                    <li onClick={() => goToTech("flutter")}><SiFlutter /> Flutter</li>
                  </ul>
                </li>

                <li className="tech-group">
                  <strong>Web Development</strong>
                  <ul>
                    <li onClick={() => goToTech("html")}><FaHtml5 /> HTML</li>
                    <li onClick={() => goToTech("css")}><FaCss3Alt /> CSS</li>
                    <li onClick={() => goToTech("javascript")}><FaJsSquare /> JavaScript</li>
                    <li onClick={() => goToTech("reactjs")}><FaReact /> React.js</li>
                    <li onClick={() => goToTech("nodejs")}><FaNodeJs /> Node.js</li>
                    <li onClick={() => goToTech("python")}><FaPython /> Python</li>
                    <li onClick={() => goToTech("database")}><FaDatabase /> MongoDB / SQL</li>
                  </ul>
                </li>

                <li className="tech-group">
                  <strong>Cloud Services</strong>
                  <ul>
                    <li onClick={() => goToTech("aws")}><FaAws /> AWS</li>
                    <li onClick={() => goToTech("cloud")}><FaCloud /> Google Cloud</li>
                    <li onClick={() => goToTech("docker")}><FaDocker /> Docker</li>
                  </ul>
                </li>
                </div>
              </ul>
            </li>

            <li><Link to="/blogs">Blogs</Link></li>
            <li><a href="#contact">Contact</a></li>

            <li>
              <button className="quote-btn" onClick={toggleQuoteForm}>Free Quote</button>
            </li>
          </ul>

          <div className="menu-icon" onClick={toggleSidebar}>
            <FaBars />
          </div>
        </div>
      </nav>

      <div className={`mobile-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="mobile-sidebar-header">
          <Link to="/"><img src="https://ik.imagekit.io/iiz6sw7ik/IMG_20251025_123454.png?updatedAt=1761375924313" alt="logo" /></Link>
          <FaTimes className="close-icon" onClick={toggleSidebar} />
        </div>

        <ul className="mobile-menu">
          <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
          <li><a href="#about" onClick={toggleSidebar}>About</a></li>

          <li className="mobile-section">
            <button className="mobile-toggle" onClick={() => toggleSection("services")}>Services ▾</button>
            {openSection === "services" && (
              <ul className="mobile-sub">
                <li onClick={() => { goToService("web"); }}>Web Development</li>
                <li onClick={() => { goToService("app"); }}>App Development</li>
                <li onClick={() => { goToService("cloud"); }}>Cloud Service</li>
                <li onClick={() => { goToService("branding"); }}>Logo & Branding</li>
                <li onClick={() => { goToService("marketing"); }}>Digital Marketing</li>
              </ul>
            )}
          </li>

          <li className="mobile-section">
            <button className="mobile-toggle" onClick={() => toggleSection("technologies")}>Technologies ▾</button>
            {openSection === "technologies" && (
              <div className="mobile-sub tech-mobile-groups">
                <div>
                  <strong>App Development</strong>
                  <ul>
                    <li onClick={() => { goToTech("android"); }}>Android</li>
                    <li onClick={() => { goToTech("ios"); }}>iOS</li>
                    <li onClick={() => { goToTech("react-native"); }}>React Native</li>
                    <li onClick={() => { goToTech("flutter"); }}>Flutter</li>
                  </ul>
                </div>
                <div>
                  <strong>Web Development</strong>
                  <ul>
                    <li onClick={() => { goToTech("html"); }}>HTML</li>
                    <li onClick={() => { goToTech("css"); }}>CSS</li>
                    <li onClick={() => { goToTech("javascript"); }}>JavaScript</li>
                    <li onClick={() => { goToTech("reactjs"); }}>React.js</li>
                    <li onClick={() => { goToTech("nodejs"); }}>Node.js</li>
                    <li onClick={() => { goToTech("python"); }}>Python</li>
                    <li onClick={() => { goToTech("database"); }}>MongoDB / SQL</li>
                  </ul>
                </div>
                <div>
                  <strong>Cloud Services</strong>
                  <ul>
                    <li onClick={() => { goToTech("aws"); }}>AWS</li>
                    <li onClick={() => { goToTech("cloud"); }}>Google Cloud</li>
                    <li onClick={() => { goToTech("docker"); }}>Docker</li>
                  </ul>
                </div>
              </div>
            )}
          </li>

          <li><Link to="/blogs" onClick={toggleSidebar}>Blogs</Link></li>
          <li><a href="#contact" onClick={toggleSidebar}>Contact</a></li>

          <li>
            <button className="quote-btn mobile-quote" onClick={() => { toggleQuoteForm(); toggleSidebar(); }}>
              Free Quote
            </button>
          </li>
        </ul>
      </div>

      {showQuote && <QuoteForm setShowQuote={setShowQuote} />}
    </>
  );
};

export default Navbar;
