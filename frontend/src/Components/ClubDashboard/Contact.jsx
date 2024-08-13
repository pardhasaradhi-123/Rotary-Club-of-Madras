// src/Contact.jsx
import { useState } from "react";
import "./contact.css";
import "./navbar.css";
import "./clubDashboard.css";
import Aside from "./Aside";
import Lottie from "lottie-react";
import contactAnimation from "../../../public/assets/contactUsAnimation.json";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.message) errors.message = "Message is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      console.log("Form data submitted:");
      setSubmitted(true);
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="#">Contact</a>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
        </div>
      </nav>
      <div className="container">
        <Aside />
        <div className="contact-form-container">
          <div className="contact-form">
            {submitted ? (
              <Lottie animationData={contactAnimation} />
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="heading">
                  <h1>query</h1>
                </div>
                <div>
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div>
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="error">{errors.email}</span>
                  )}
                </div>
                <div>
                  <label>Message:</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && (
                    <span className="error">{errors.message}</span>
                  )}
                </div>
                <button type="submit">Submit</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
