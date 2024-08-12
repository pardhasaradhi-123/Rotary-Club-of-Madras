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

  const [formErrors, setFormErrors] = useState({
    name: "",
    id: "",
    designation: "",
    email: "",
    mobileNum: "",
  });

  const fields = [
    { label: "Name", name: "name", type: "text", placeholder: "Enter name" },
    { label: "ID", name: "id", type: "text", placeholder: "Enter ID" },
    {
      label: "Designation",
      name: "designation",
      type: "text",
      placeholder: "Enter designation",
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Enter email",
    },
    {
      label: "Mobile Number",
      name: "mobileNum",
      type: "text",
      placeholder: "Enter mobile number",
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

    fields.forEach((field) => {
      if (field.name !== "id" && formData[field.name] === "") {
        newErrors[field.name] = `${field.label} is required`;
        valid = false;
      }

      if (
        field.name === "email" &&
        formData.email !== "" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        newErrors.email = "Invalid email address";
        valid = false;
      }
    });

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const clubEmail = localStorage.getItem("email");
      try {
        const response = await fetch(
          "http://localhost:3005/api/v1/member/save",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, clubEmail }),
          }
        );
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
            {fields.map((field) => (
              <div className="input" key={field.name}>
                <label htmlFor={field.name}>
                  {field.label}:
                  {field.label === "ID" ? (
                    <span>(optional)</span>
                  ) : (
                    <span style={{ color: "red" }}>*</span>
                  )}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
                {formErrors[field.name] && (
                  <span style={{ color: "red" }}>{formErrors[field.name]}</span>
                )}
              </div>
            ))}
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
