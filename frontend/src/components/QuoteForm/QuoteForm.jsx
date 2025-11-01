import React, { useState } from "react";
import "./QuoteForm.css";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";

const API = "http://localhost:5000/api/quotes";

const QuoteForm = ({ setShowQuote }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "App Development",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (e) => {
    if (isDisabled) return;
    const { id, value } = e.target;
    const field = id === "phoneNumber" ? "phone" : id;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Quote Submitted!",
          text: "Your quote has been submitted successfully.",
          confirmButtonColor: "#3085d6",
        });
        setIsDisabled(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: data.message || "Something went wrong!",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Failed to connect to server",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="quote-overlay" onClick={() => setShowQuote(false)}></div>
      <div className="quote-form-container">
        <button className="close-btn" onClick={() => setShowQuote(false)}>
          <IoClose />
        </button>
        <h2>Get a Free Quote</h2>

        <form className="quote-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <input
            type="text"
            id="phoneNumber"
            placeholder="Your Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            disabled={isDisabled}
          />
          <div className="form-group">
            <label htmlFor="service">Service Required</label>
            <div className="input-wrapper">
              <select
                id="service"
                required
                value={formData.service}
                onChange={handleChange}
                disabled={isDisabled}
              >
                <option value="App Development">App Development</option>
                <option value="Web Development">Web Development</option>
                <option value="Digital Marketing">Digital Marketing</option>
                <option value="Cloud Services">Cloud Services</option>
                <option value="Logo Designing">Logo Designing</option>
                <option value="WordPress Development">WordPress Development</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
              </select>
            </div>
          </div>
          <textarea
            id="message"
            placeholder="Tell us about your project..."
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
            disabled={isDisabled}
          ></textarea>
          <button type="submit" className="blue-btn" disabled={loading || isDisabled}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default QuoteForm;
