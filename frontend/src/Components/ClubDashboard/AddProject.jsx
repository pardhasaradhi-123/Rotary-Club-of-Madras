import React, { useState } from "react";
import "./addClub.css";
import "./exportClubDashboardProject.css";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const navigate = useNavigate();
  const initialFormData = {
    projectName: "",
    projectChairName: "",
    projectSecretaryName: "",
    hostClubName: "",
    coHostClubName: "",
    projectAvenue: "",
    noOfBenifeshiers: "",
    speaker: "",
    totalAmountSpent: "",
    projectPhotoLink: "",
    projectDescription: "",
    presidentName: "",
    secretaryName: "",
    projectMonth: "",
    totalManHourSpent: "",
    venue: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formErrors, setFormErrors] = useState(
    Object.keys(initialFormData).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    Object.keys(formData).forEach((key) => {
      if (
        formData[key] === "" &&
        key !== "speaker" &&
        key !== "hostClubName" &&
        key !== "coHostClubName"
      ) {
        newErrors[key] = `${key
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()} is required`;
        valid = false;
      } else {
        newErrors[key] = "";
      }
    });

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const clubEmail = localStorage.getItem("email");
      console.log(clubEmail);
      try {
        const response = await fetch(
          "http://localhost:3005/api/v1/projects/save",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, clubEmail }),
          }
        );

        if (response.ok) {
          console.log("Form submitted successfully");
          navigate("/clubDashboard");
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

  const formFields = [
    { name: "projectName", label: "Project Name", type: "text" },
    { name: "projectChairName", label: "Project Chairman Name", type: "text" },
    {
      name: "projectSecretaryName",
      label: "Project Secretary Name",
      type: "text",
    },
    { name: "hostClubName", label: "Host Club Name", type: "text" },
    { name: "coHostClubName", label: "Co-Host Club Name", type: "text" },
    { name: "projectAvenue", label: "Project Avenue", type: "text" },
    { name: "noOfBenifeshiers", label: "No. of Beneficiaries", type: "text" },
    { name: "speaker", label: "Speaker/Guests", type: "text" },
    { name: "totalAmountSpent", label: "Total Amount Spent", type: "text" },
    { name: "presidentName", label: "President Name", type: "text" },
    { name: "secretaryName", label: "Secretary Name", type: "text" },
    { name: "projectMonth", label: "Project Month", type: "month" },
    { name: "totalManHourSpent", label: "Total Man Hours Spent", type: "text" },
    { name: "venue", label: "Venue", type: "text" },

    { name: "projectPhotoLink", label: "Project Photo Link", type: "text" },
    {
      name: "projectDescription",
      label: "Project Description",
      type: "textarea",
    },
    {
      name: "clubType",
      label: "Club Type",
      type: "select",
      options: ["Interact", "Rotaract"],
    },
  ];

  return (
    <React.Fragment>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-top">
            <div className="form-left">
              <h1>add project</h1>
              <h4>Titles go here</h4>
            </div>
            <div className="form-right">
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  navigate("/clubDashboard");
                }}
              >
                close
              </span>
            </div>
          </div>
          <div className="input-section export">
            {formFields.map(({ name, label, type, options }) => (
              <div className="input" key={name}>
                <label htmlFor={name}>{label}:</label>
                {type === "select" ? (
                  <select
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select {label.toLowerCase()}</option>
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : type === "textarea" ? (
                  <textarea
                    name={name}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    value={formData[name]}
                    onChange={handleChange}
                  ></textarea>
                ) : (
                  <input
                    type={type}
                    name={name}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    value={formData[name]}
                    onChange={handleChange}
                  />
                )}
                {formErrors[name] && (
                  <span style={{ color: "red" }}>{formErrors[name]}</span>
                )}
              </div>
            ))}
            <div className="bottom-section">
              <button className="submit" type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
