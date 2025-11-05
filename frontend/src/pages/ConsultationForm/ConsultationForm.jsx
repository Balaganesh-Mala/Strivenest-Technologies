import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaServicestack } from "react-icons/fa";
import Swal from "sweetalert2";
import "./ConsultationForm.css";

const API = "http://localhost:5000/api/quotes";

const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Consultation submitted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          message: "",
        });
      } else {
        Swal.fire("Error", data.message || "Failed to submit consultation", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Server connection failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="consultation-container">
      <h2 className="consultation-title">Get a Free Consultation</h2>
      <form className="consultation-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <div className="input-wrapper">
            <FaUser className="form-icon" />
            <input
              type="text"
              id="name"
              name="name"
              className="input-controls"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
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
                className="input-controls"
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
                className="input-controls"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="serviceType">Service Required</label>
          <div className="input-wrapper">
            <FaServicestack className="form-icon" />
            <select
              id="serviceType"
              name="serviceType"
              className="input-controls"
              value={formData.serviceType}
              onChange={handleChange}
              required
            >
              <option value="">Select service type</option>
              <option value="Web Development">Web Development</option>
              <option value="App Development">App Development</option>
              <option value="Cloud Services">Cloud Services</option>
              <option value="Logo Designing">Logo Designing</option>
              <option value="WordPress Development">WordPress Development</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <div className="input-wrapper textarea-wrapper">
            <textarea
              id="message"
              name="message"
              placeholder="Tell us about your project..."
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default ConsultationForm;
