import { useState } from "react";
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
  FaAndroid,
  FaApple,
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaDatabase,
  FaAws,
  FaDocker,
} from "react-icons/fa";
import { SiFlutter } from "react-icons/si";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    setMobileOpen(false);
    setOpenSection(null);
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src="https://ik.imagekit.io/iiz6sw7ik/IMG_20251025_123454.png?updatedAt=1761375924313"
              alt="logo"
              className="h-9"
            />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            <a href="#about" className="hover:text-indigo-600">About</a>

            {/* SERVICES */}
            <div className="relative group">
              <span className="cursor-pointer hover:text-indigo-600">
                Services
              </span>
              <div className="absolute left-0 top-full mt-2 w-56 bg-white border rounded-xl shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition">
                {[
                  ["web", "Web Development", <FaLaptopCode />],
                  ["app", "App Development", <FaMobileAlt />],
                  ["cloud", "Cloud Services", <FaCloud />],
                  ["branding", "Branding", <FaPenNib />],
                  ["marketing", "Marketing", <FaBullhorn />],
                ].map(([id, label, icon]) => (
                  <button
                    key={id}
                    onClick={() => goTo(`/service/${id}`)}
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-slate-50 text-left"
                  >
                    {icon}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* TECHNOLOGIES */}
            <div className="relative group">
              <span className="cursor-pointer hover:text-indigo-600">
                Technologies
              </span>

              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[650px] bg-white border rounded-2xl shadow-lg p-6 grid grid-cols-3 gap-6 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition">
                {/* APP */}
                <div>
                  <p className="font-semibold mb-2">App</p>
                  <TechItem icon={<FaAndroid />} label="Android" onClick={() => goTo("/technology/android")} />
                  <TechItem icon={<FaApple />} label="iOS" onClick={() => goTo("/technology/ios")} />
                  <TechItem icon={<FaReact />} label="React Native" onClick={() => goTo("/technology/reactnative")} />
                  <TechItem icon={<SiFlutter />} label="Flutter" onClick={() => goTo("/technology/flutter")} />
                </div>

                {/* WEB */}
                <div>
                  <p className="font-semibold mb-2">Web</p>
                  <TechItem icon={<FaHtml5 />} label="HTML" onClick={() => goTo("/technology/html")} />
                  <TechItem icon={<FaCss3Alt />} label="CSS" onClick={() => goTo("/technology/css")} />
                  <TechItem icon={<FaJsSquare />} label="JavaScript" onClick={() => goTo("/technology/javascript")} />
                  <TechItem icon={<FaReact />} label="React" onClick={() => goTo("/technology/reactjs")} />
                  <TechItem icon={<FaNodeJs />} label="Node.js" onClick={() => goTo("/technology/nodejs")} />
                  <TechItem icon={<FaPython />} label="Python" onClick={() => goTo("/technology/python")} />
                  <TechItem icon={<FaDatabase />} label="Database" onClick={() => goTo("/technology/database")} />
                </div>

                {/* CLOUD */}
                <div>
                  <p className="font-semibold mb-2">Cloud</p>
                  <TechItem icon={<FaAws />} label="AWS" onClick={() => goTo("/technology/aws")} />
                  <TechItem icon={<FaCloud />} label="Google Cloud" onClick={() => goTo("/technology/cloud")} />
                  <TechItem icon={<FaDocker />} label="Docker" onClick={() => goTo("/technology/docker")} />
                </div>
              </div>
            </div>

            <Link to="/blogs" className="hover:text-indigo-600">Blogs</Link>
            <a href="#contact" className="hover:text-indigo-600">Contact</a>

            <button
              onClick={() => setShowQuote(true)}
              className="ml-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Free Quote
            </button>
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-slate-700"
          >
            <FaBars size={22} />
          </button>
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <aside className="absolute left-0 top-0 h-full w-72 bg-white p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <img
                src="https://ik.imagekit.io/iiz6sw7ik/IMG_20251025_123454.png?updatedAt=1761375924313"
                alt="logo"
                className="h-8"
              />
              <FaTimes onClick={() => setMobileOpen(false)} />
            </div>

            <MobileLink label="Home" onClick={() => goTo("/")} />
            <MobileLink label="About" onClick={() => goTo("/#about")} />

            <MobileSection
              title="Services"
              open={openSection === "services"}
              onToggle={() => setOpenSection(openSection === "services" ? null : "services")}
            >
              <MobileLink label="Web Development" onClick={() => goTo("/service/web")} />
              <MobileLink label="App Development" onClick={() => goTo("/service/app")} />
              <MobileLink label="Cloud Services" onClick={() => goTo("/service/cloud")} />
              <MobileLink label="Branding" onClick={() => goTo("/service/branding")} />
              <MobileLink label="Marketing" onClick={() => goTo("/service/marketing")} />
            </MobileSection>

            <MobileLink label="Blogs" onClick={() => goTo("/blogs")} />
            <MobileLink label="Contact" onClick={() => goTo("/#contact")} />

            <button
              onClick={() => {
                setShowQuote(true);
                setMobileOpen(false);
              }}
              className="mt-6 w-full py-2 rounded-lg bg-indigo-600 text-white"
            >
              Free Quote
            </button>
          </aside>
        </div>
      )}

      {showQuote && <QuoteForm setShowQuote={setShowQuote} />}
    </>
  );
}

/* ===== Helper Components ===== */

const TechItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600 mb-2"
  >
    {icon}
    {label}
  </button>
);

const MobileLink = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="block w-full text-left py-2 text-slate-700 hover:text-indigo-600"
  >
    {label}
  </button>
);

const MobileSection = ({ title, open, onToggle, children }) => (
  <div className="mt-2">
    <button
      onClick={onToggle}
      className="w-full text-left py-2 font-medium text-slate-700"
    >
      {title}
    </button>
    {open && <div className="pl-4">{children}</div>}
  </div>
);
