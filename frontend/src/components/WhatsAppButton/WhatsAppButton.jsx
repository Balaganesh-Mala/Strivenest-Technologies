import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919876543210"  
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
    >
      <div className="whatsapp-wave"></div>
      <FaWhatsapp className="whatsapp-icon" />
    </a>
  );
};

export default WhatsAppButton;
