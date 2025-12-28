import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER;
  const message = import.meta.env.VITE_WHATSAPP_MESSAGE;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* PULSE RING */}
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping" />

      {/* BUTTON */}
      <div className="relative h-14 w-14 flex items-center justify-center rounded-full bg-green-500 shadow-lg hover:scale-110 transition-transform duration-300">
        <FaWhatsapp className="text-white text-3xl" />
      </div>

      {/* TOOLTIP */}
      <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </a>
  );
}
