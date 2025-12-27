import { useEffect, useState } from "react";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

export default function Home() {
  const titles = [
    "App Development",
    "Web Development",
    "Cloud Services",
    "Marketing",
  ];

  const [currentTitle, setCurrentTitle] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  /* Rotate titles */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  /* Auto popup */
  useEffect(() => {
    const timer = setTimeout(() => setShowQuote(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center mt-10">
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Best{" "}
            <span className="relative inline-block text-indigo-600">
              {titles[currentTitle]}
              
            </span>
            <br />
            Company in Anantapur
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
            We design and build high-quality mobile and web applications that
            help businesses grow. Our mission is to turn ideas into scalable,
            user-friendly digital products.
          </p>

          {/* SOCIALS */}
          <div className="flex justify-center lg:justify-start gap-4 text-gray-500">
            {[FaFacebook, FaInstagram, FaLinkedin, FaYoutube].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full border hover:bg-indigo-600 hover:text-white transition"
                >
                  <Icon size={16} />
                </a>
              )
            )}
          </div>

          {/* CTA */}
          <div>
            <button
              onClick={() => setShowQuote(true)}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-xl
              bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-md"
            >
              Get a Free Quote
            </button>
          </div>
        </div>

        {/* RIGHT MEDIA */}
        <div className="relative flex justify-center">
          {/* Decorative images */}
          <img
            src="https://ik.imagekit.io/izqq5ffwt/logo12.png"
            alt="decor"
            className="hidden lg:block absolute -left-16 top-20 w-40 opacity-80"
          />

          <img
            src="https://ik.imagekit.io/izqq5ffwt/logo23.png"
            alt="decor"
            className="hidden lg:block absolute -right-16 bottom-16 w-40 opacity-80"
          />

          {/* PHONE MOCKUP */}
          <div className="relative w-64 sm:w-72">
            <video
              src="https://ik.imagekit.io/izqq5ffwt/WhatsApp%20Video%202025-10-28%20at%2022.10.19_15489131.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="rounded-[3rem] shadow-xl"
            />

            <img
              src="https://ik.imagekit.io/izqq5ffwt/download.png?updatedAt=1761819335957"
              alt="Phone Frame"
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* QUOTE MODAL */}
      {showQuote && <QuoteForm setShowQuote={setShowQuote} />}
    </section>
  );
}
