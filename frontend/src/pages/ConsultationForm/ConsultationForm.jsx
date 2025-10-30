import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaServicestack,
  FaComments,
} from "react-icons/fa";
import "./ConsultationForm.css";

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Your request has been submitted!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="consultation-container">
      <h2 className="consultation-title">Get a Free Consultation</h2>

      <form className="consultation-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <div className="input-wrapper">
              <FaUser className="form-icon" />
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <FaEnvelope className="form-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <div className="input-wrapper">
              <FaPhone className="form-icon" />
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="service">Service Required</label>
          <div className="input-wrapper">
            <FaServicestack className="form-icon" />
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Select a service</option>
              <option value="Web Development">Web Development</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Cloud Services">Cloud Services</option>
              <option value="Logo Designing">Logo Designing</option>
              <option value="WordPress Development">
                WordPress Development
              </option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <div className="input-wrapper textarea-wrapper">
            <FaComments className="textarea-icon" />
            <textarea
              id="message"
              name="message"
              placeholder="Write your message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ConsultationForm;
