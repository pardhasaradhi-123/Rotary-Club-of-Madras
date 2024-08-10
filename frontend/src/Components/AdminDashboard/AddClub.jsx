import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddClub() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clubName: "",
    clubID: "",
    presidentName: "",
    secretaryName: "",
    email: "",
    password: "",
    clubType: "",
    month: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formErrors, setFormErrors] = useState({
    clubName: "",
    clubID: "",
    presidentName: "",
    secretaryName: "",
    email: "",
    password: "",
    clubType: "",
    month: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      clubName: "",
      clubID: "",
      presidentName: "",
      secretaryName: "",
      email: "",
      password: "",
      clubType: "",
      month: "",
    };

    // ClubName validation
    if (formData.clubName === "") {
      newErrors.clubName = "Club Name is required";
      valid = false;
    }

    // clubID validation
    if (formData.clubID === "") {
      newErrors.clubID = "Club ID is required";
      valid = false;
    }

    // presidentName validation
    if (formData.presidentName === "") {
      newErrors.presidentName = "President Name is required";
      valid = false;
    }

    // secretaryName validation
    if (formData.secretaryName === "") {
      newErrors.secretaryName = "Secretary Name is required";
      valid = false;
    }

    // Email validation
    if (!formData.email.includes("@gmail.com")) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // Password validation
    if (formData.password.length === 0) {
      newErrors.password = "Password is required";
      valid = false;
    }

    // club type validation
    if (formData.clubType === "") {
      newErrors.clubType = "Select the club type";
      valid = false;
    }

    // month validation
    if (formData.month === "") {
      newErrors.month = "Select the month";
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3005/api/v1/club/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Form submitted successfully", formData);
          navigate("/adminDashboard");
        } else {
          console.error("Error submitting form");
        }
      } catch (error) {
        console.error("Error:", error);
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
              <h1>Add Club</h1>
              <h4>Details go here</h4>
            </div>
            <div className="form-right">
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  navigate("/adminDashboard");
                }}
              >
                close
              </span>
            </div>
          </div>
          <div className="input-section">
            <div className="input">
              <label htmlFor="clubName">Club Name:</label>
              <input
                type="text"
                name="clubName"
                placeholder="Enter club name"
                value={formData.clubName}
                onChange={handleChange}
              />
              {formErrors.clubName && (
                <span style={{ color: "red" }}>{formErrors.clubName}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="clubID">Club ID:</label>
              <input
                type="text"
                name="clubID"
                placeholder="Enter club ID"
                value={formData.clubID}
                onChange={handleChange}
              />
              {formErrors.clubID && (
                <span style={{ color: "red" }}>{formErrors.clubID}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="presidentName">President Name:</label>
              <input
                type="text"
                name="presidentName"
                placeholder="Enter president name"
                value={formData.presidentName}
                onChange={handleChange}
              />
              {formErrors.presidentName && (
                <span style={{ color: "red" }}>{formErrors.presidentName}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="secretaryName">Secretary Name:</label>
              <input
                type="text"
                name="secretaryName"
                placeholder="Enter secretary name"
                value={formData.secretaryName}
                onChange={handleChange}
              />
              {formErrors.secretaryName && (
                <span style={{ color: "red" }}>{formErrors.secretaryName}</span>
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
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />
              {formErrors.password && (
                <span style={{ color: "red" }}>{formErrors.password}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="clubType">Club Type:</label>
              <select
                name="clubType"
                className="clubType"
                value={formData.clubType}
                onChange={handleChange}
                required
              >
                <option value="">Select club type</option>
                <option value="interact">Interact</option>
                <option value="rotaract">Rotaract</option>
              </select>
              {formErrors.clubType && (
                <span style={{ color: "red" }}>{formErrors.clubType}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="month">Month:</label>
              <input
                type="month"
                name="month"
                value={formData.month}
                onChange={handleChange}
              />
              {formErrors.month && (
                <span style={{ color: "red" }}>{formErrors.month}</span>
              )}
            </div>
          </div>
          <div className="btn">
            <button
              className="cancel"
              type="button"
              onClick={() => {
                navigate("/adminDashboard");
              }}
            >
              Cancel
            </button>

            <button className="add" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
