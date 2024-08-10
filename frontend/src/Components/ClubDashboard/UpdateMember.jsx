import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateMember() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    ID: "",
    designation: "",
    email: "",
    mobileNum: "",
  });

  const handleChange = (e) => {
    const { value } = e.target.value;
    setFormData({
      ...formData,
      name: value,
      ID: value,
      designation: value,
      email: value,
      mobileNum: value,
    });
  };

  const [formErrors, setFormErrors] = useState({
    name: "",
    ID: "",
    designation: "",
    email: "",
    mobileNum: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      ID: "",
      designation: "",
      email: "",
      mobileNum: "",
    };

    // Name validation
    if (formData.name === "") {
      newErrors.name = "Name is required";
      valid = false;
    }

    // ID validation
    if (formData.ID === "") {
      newErrors.ID = "ID is required";
      valid = false;
    }

    // designation validation
    if (formData.designation === "") {
      newErrors.designation = "Designation is required";
      valid = false;
    }

    // Email validation
    if (!formData.email.includes("@gmail.com")) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // mobile number validation
    if (formData.mobileNum === "") {
      newErrors.mobileNum = "select the club type";
    }

    setFormErrors(newErrors);
    return valid;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Perform form submission here
      console.log("formData");
      // Replace console.log with your form submission logic (e.g., API call)
    } else {
      console.log("Form is invalid. Please check the fields.");
    }
  };

  return (
    <React.Fragment>
      <div className="form-container">
        <form onSubmit={validateForm}>
          <div className="form-top">
            <div className="form-left">
              <h1>update member</h1>
              <h4>titles goes here</h4>
            </div>
            <div
              className="form-right"
              onClick={() => {
                navigate("/club-member");
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </div>
          </div>
          <div className="input-section">
            <div className="input">
              <label htmlFor="Name">name:</label>
              <input
                type="text"
                placeholder="enter name"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <span style={{ color: "red" }}>{formErrors.name}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="ID"> iD:</label>
              <input
                type="text"
                placeholder="enter id"
                value={formData.clubID}
                onChange={handleChange}
              />
              {formErrors.ID && (
                <span style={{ color: "red" }}>{formErrors.ID}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="designation">designation:</label>
              <input
                type="text"
                placeholder="enter designation"
                value={formData.designation}
                onChange={handleChange}
              />
              {formErrors.designation && (
                <span style={{ color: "red" }}>{formErrors.designation}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="email">emial address:</label>
              <input
                type="email"
                placeholder="enter email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <span style={{ color: "red" }}>{formErrors.email}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="mobile-num">mobile number:</label>
              <input
                type="month"
                value={formData.mobileNum}
                onChange={handleChange}
              />
              {formErrors.mobileNum && (
                <span style={{ color: "red" }}>{formErrors.mobileNum}</span>
              )}
            </div>
          </div>
          <div className="btn">
            <button
              className="cancel"
              onClick={() => {
                navigate("/club-member");
              }}
            >
              cancel
            </button>
            <button className="add" onClick={handleSubmit}>
              add
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
