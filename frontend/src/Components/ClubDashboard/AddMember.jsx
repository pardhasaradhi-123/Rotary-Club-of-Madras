import React, { useState } from "react";
import "./addClub.css";
import { useNavigate } from "react-router-dom";

export default function AddMember() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    id: "",
    designation: "",
    email: "",
    mobileNum: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formErrors, setFormErrors] = useState({
    name: "",
    id: "",
    designation: "",
    email: "",
    mobileNum: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      id: "",
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
    if (formData.id === "") {
      newErrors.id = "ID is required";
      valid = false;
    }

    // Designation validation
    if (formData.designation === "") {
      newErrors.designation = "Designation is required";
      valid = false;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // Mobile number validation
    if (formData.mobileNum === "") {
      newErrors.mobileNum = "Mobile number is required";
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3005/api/v1/member/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("Form submitted successfully", formData);
          navigate("/club-member");
        } else {
          console.error("Error submitting form");
        }
      } catch (error) {
        console.error("Error", error);
      }
    } else {
      console.log("Form is invalid. Please check the fields.");
    }
  };

  return (
    <React.Fragment>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-top">
            <div className="form-left">
              <h1>Add Member</h1>
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
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <span style={{ color: "red" }}>{formErrors.name}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                name="id"
                placeholder="Enter ID"
                value={formData.id}
                onChange={handleChange}
              />
              {formErrors.id && (
                <span style={{ color: "red" }}>{formErrors.id}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="designation">Designation:</label>
              <input
                type="text"
                name="designation"
                placeholder="Enter designation"
                value={formData.designation}
                onChange={handleChange}
              />
              {formErrors.designation && (
                <span style={{ color: "red" }}>{formErrors.designation}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
              {formErrors.email && (
                <span style={{ color: "red" }}>{formErrors.email}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="mobileNum">Mobile Number:</label>
              <input
                type="text"
                name="mobileNum"
                placeholder="Enter mobile number"
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
              Cancel
            </button>
            <button type="submit" className="add">
              Add
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
