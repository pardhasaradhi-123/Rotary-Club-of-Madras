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

  const formFields = [
    {
      name: "clubName",
      label: "Club Name",
      placeholder: "Enter club name",
      type: "text",
    },
    {
      name: "clubID",
      label: "Club ID",
      placeholder: "Enter club ID",
      type: "text",
    },
    {
      name: "presidentName",
      label: "President Name",
      placeholder: "Enter president name",
      type: "text",
    },
    {
      name: "secretaryName",
      label: "Secretary Name",
      placeholder: "Enter secretary name",
      type: "text",
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "Enter email",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      type: "password",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate each form field dynamically
    formFields.forEach(({ name }) => {
      if (name !== "clubID" && formData[name] === "") {
        newErrors[name] = `${
          name.charAt(0).toUpperCase() + name.slice(1)
        } is required`;
        valid = false;
      }
    });

    if (!formData.email.includes("@gmail.com")) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (formData.clubType === "") {
      newErrors.clubType = "Select the club type";
      valid = false;
    }

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
        const response = await fetch("https://server.rcmys.in/api/v1/club/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Form submitted successfully");

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
              <h4>Adding club</h4>
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
            {formFields.map(({ name, label, placeholder, type }) => (
              <div className="input" key={name}>
                <label htmlFor={name}>
                  {label}:{" "}
                  {label == "Club ID" ? (
                    <span>(optional)</span>
                  ) : (
                    <span style={{ color: "red" }}>*</span>
                  )}
                </label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formData[name]}
                  onChange={handleChange}
                />
                {formErrors[name] && (
                  <span style={{ color: "red" }}>{formErrors[name]}</span>
                )}
              </div>
            ))}

            <div className="input">
              <label htmlFor="clubType">
                Club Type:<span style={{ color: "red" }}>*</span>
              </label>
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
              <label htmlFor="month">
                Month:<span style={{ color: "red" }}>*</span>
              </label>
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
