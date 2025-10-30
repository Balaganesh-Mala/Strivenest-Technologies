import React from "react";
import "./QuoteForm.css";
import { IoClose } from "react-icons/io5";


const QuoteForm = ({ setShowQuote }) => {
  return (
    <>
      {/* Overlay Blur */}
      <div className="quote-overlay" onClick={() => setShowQuote(false)}></div>

      {/* Form Popup */}
      <div className="quote-form-container">
        <button className="close-btn" onClick={() => setShowQuote(false)}>
          <IoClose />
        </button>
        <h2>Get a Free Quote</h2>
        <form className="quote-form">
          <input type="text" placeholder="Your Name" id="name" required />
          <input type="email" placeholder="Your Email" id="email" required />
          <input type="text" placeholder="Your Phone Number" id="phoneNumber" required />
          <div className="form-group">
            <label htmlFor="service">Service Required</label>
            <div className="input-wrapper">
              <select
                id="service"
                name="service"
                required
              >
                <option value="App Development" selected>App Development</option>
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
          <textarea
            placeholder="Tell us about your project..."
            rows="4"
            required
          ></textarea>
          <button type="submit" className="blue-btn">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default QuoteForm;
