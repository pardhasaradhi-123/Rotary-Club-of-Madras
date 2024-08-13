import React, { useEffect, useState } from "react";
import "./addClub.css";
import "./exportClubDashboardProject.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddProject() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialFormData = {
    projectName: "",
    projectChairName: "",
    projectSecretaryName: "",
    hostClubName: "",
    coHostClubName: "",
    projectAvenue: "",
    noOfBeneficiaries: "",
    speaker: "",
    totalAmountSpent: "",
    projectPhotoLink: "",
    projectDescription: "",
    presidentName: "",
    secretaryName: "",
    projectMonth: "",
    totalManHourSpent: "",
    venue: "",
    clubType: "",
  };

  const formFields = [
    {
      name: "projectName",
      label: "Project Name",
      type: "text",
      required: true,
    },
    {
      name: "projectChairName",
      label: "Project Chairman Name",
      type: "text",
      required: true,
    },
    {
      name: "projectSecretaryName",
      label: "Project Secretary Name",
      type: "text",
      required: true,
    },
    {
      name: "hostClubName",
      label: "Host Club Name",
      type: "text",
      required: false,
    },
    {
      name: "coHostClubName",
      label: "Co-Host Club Name",
      type: "text",
      required: false,
    },
    {
      name: "projectAvenue",
      label: "Project Avenue",
      type: "text",
      required: true,
    },
    {
      name: "noOfBeneficiaries",
      label: "No. of Beneficiaries",
      type: "text",
      required: true,
    },
    { name: "speaker", label: "Speaker/Guests", type: "text", required: false },
    {
      name: "totalAmountSpent",
      label: "Total Amount Spent",
      type: "text",
      required: true,
    },
    {
      name: "presidentName",
      label: "President Name",
      type: "text",
      required: true,
    },
    {
      name: "secretaryName",
      label: "Secretary Name",
      type: "text",
      required: true,
    },
    {
      name: "projectMonth",
      label: "Project Month",
      type: "month",
      required: true,
    },
    {
      name: "totalManHourSpent",
      label: "Total Man Hours Spent",
      type: "text",
      required: true,
    },
    { name: "venue", label: "Venue", type: "text", required: true },
    {
      name: "projectPhotoLink",
      label: "Project Photo Link",
      type: "text",
      required: true,
    },
    {
      name: "projectDescription",
      label: "Project Description",
      type: "textarea",
      required: true,
    },
    // {
    //   name: "clubType",
    //   label: "Club Type",
    //   type: "select",
    //   options: ["Interact", "Rotaract"],
    //   required: true,
    // },
  ];

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const { club } = location.state;
    setFormData({ ...initialFormData, clubType: club.clubType });
  }, [location]);

  const [formErrors, setFormErrors] = useState(
    Object.keys(initialFormData).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {})
  );

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

    formFields.forEach((field) => {
      if (field.required && formData[field.name].trim() === "") {
        newErrors[field.name] = `${field.label} is required`;
        valid = false;
      } else {
        newErrors[field.name] = "";
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

  return (
    <React.Fragment>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-top">
            <div className="form-left">
              <h1>Add Project</h1>
              <h4>Adding project</h4>
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
          <div className="export">
            {formFields.map(({ name, label, type, options, required }) => (
              <div className="input" key={name}>
                <label htmlFor={name}>
                  {label}:
                  {required ? (
                    <span style={{ color: "red" }}>*</span>
                  ) : (
                    <span>(optional)</span>
                  )}
                </label>
                {type === "select" ? (
                  <select
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
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
