import React, { useState } from "react";
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
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [openSection, setOpenSection] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleQuoteForm = () => setIsQuoteOpen(!isQuoteOpen);
  const toggleSection = (section) =>
    setOpenSection(openSection === section ? "" : section);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img
              src="https://ik.imagekit.io/iiz6sw7ik/IMG_20251025_123454.png?updatedAt=1761375924313"
              alt="website logo"
            />
          </div>

          <ul className="nav-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>

            <li className="dropdown">
              <span>Services ▾</span>
              <ul className="dropdown-menu">
                <li>
                  <FaLaptopCode /> Web Development
                </li>
                <li>
                  <FaMobileAlt /> App Development
                </li>
                <li>
                  <FaCloud /> Cloud Service
                </li>
                <li>
                  <FaPenNib /> Logo & Branding
                </li>
                <li>
                  <FaBullhorn /> Digital Marketing
                </li>
              </ul>
            </li>

            <li className="dropdown">
              <span>Technologies ▾</span>
              <ul className="dropdown-menu">
                <li>
                  <FaPython /> Python
                </li>
                <li>
                  <FaHtml5 /> HTML
                </li>
                <li>
                  <FaCss3Alt /> CSS
                </li>
                <li>
                  <FaReact /> React.js
                </li>
                <li>
                  <FaReact /> React Native / Flutter
                </li>
                <li>
                  <FaNodeJs /> Node.js
                </li>
                <li>
                  <FaJsSquare /> JavaScript
                </li>
              </ul>
            </li>

            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>

            <li>
              <button className="quote-btn" onClick={toggleQuoteForm}>
                Free Quote
              </button>
            </li>
          </ul>

          <div className="menu-icon" onClick={toggleSidebar}>
            <FaBars />
          </div>
        </div>
      </nav>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <FaTimes className="close-icon" onClick={toggleSidebar} />
        </div>
        <ul>
          <li>
            <a href="#home" onClick={toggleSidebar}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={toggleSidebar}>
              About
            </a>
          </li>

          <li className="sidebar-section">
            <span onClick={() => toggleSection("services")}>
              Services ▾
            </span>
            {openSection === "services" && (
              <ul>
                <li>Web Development</li>
                <li>App Development</li>
                <li>Cloud Service</li>
                <li>Logo & Branding</li>
                <li>Digital Marketing</li>
              </ul>
            )}
          </li>

          <li className="sidebar-section">
            <span onClick={() => toggleSection("technologies")}>
              Technologies ▾
            </span>
            {openSection === "technologies" && (
              <ul>
                <li>Python</li>
                <li>HTML</li>
                <li>CSS</li>
                <li>React.js</li>
                <li>React Native / Flutter</li>
                <li>Node.js</li>
                <li>JavaScript</li>
              </ul>
            )}
          </li>

          <li>
            <a href="#blog" onClick={toggleSidebar}>
              Blog
            </a>
          </li>
          <li>
            <a href="#contact" onClick={toggleSidebar}>
              Contact
            </a>
          </li>

          <li>
            <button
              className="quote-btn"
              onClick={() => {
                toggleSidebar();
                toggleQuoteForm();
              }}
            >
              Free Quote
            </button>
          </li>
        </ul>
      </div>

      {isQuoteOpen && <div className="overlay"></div>}

      {isQuoteOpen && (
        <div className="quote-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={toggleQuoteForm}>
              <FaTimes />
            </button>
            <h2>Free Quote</h2>
            <form>
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <input type="text" placeholder="Subject" />
              <input type="tel" placeholder="Phone Number" />
              <textarea placeholder="Message" rows="3"></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
