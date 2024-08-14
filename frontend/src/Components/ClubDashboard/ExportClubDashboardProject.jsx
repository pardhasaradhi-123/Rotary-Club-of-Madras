import React, { useState, useEffect } from "react";
import "./addClub.css";
import "./exportClubDashboardProject.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ExporExportClubDashboardProjecttProject() {
  const navigate = useNavigate();
  const { _id } = useParams();
  const location = useLocation();
  const [formData, setFormData] = useState({
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
  });

  const [formErrors, setFormErrors] = useState({
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
  });

  const formFields = [
    {
      name: "projectName",
      label: "Project Name",
      type: "text",
      placeholder: "Enter project name",
    },
    {
      name: "projectChairName",
      label: "Project Chairman Name",
      type: "text",
      placeholder: "Enter project chairman name",
    },
    {
      name: "projectSecretaryName",
      label: "Project Secretary Name",
      type: "text",
      placeholder: "Enter project secretary name",
    },
    {
      name: "hostClubName",
      label: "Host Club Name",
      type: "text",
      placeholder: "Enter host club name",
    },
    {
      name: "coHostClubName",
      label: "Co-Host Club Name",
      type: "text",
      placeholder: "Enter co-host club name",
    },
    {
      name: "projectAvenue",
      label: "Project Avenue",
      type: "text",
      placeholder: "Enter project avenue",
    },
    {
      name: "noOfBenifeshiers",
      label: "No. of Beneficiaries",
      type: "text",
      placeholder: "Enter number of beneficiaries",
    },
    {
      name: "speaker",
      label: "Speaker/Guests",
      type: "text",
      placeholder: "Enter speaker/guests",
    },
    {
      name: "totalAmountSpent",
      label: "Total Amount Spent",
      type: "text",
      placeholder: "Enter total amount spent",
    },
    {
      name: "projectPhotoLink",
      label: "Project Photo Link",
      type: "text",
      placeholder: "Enter project photo link",
    },
    {
      name: "projectDescription",
      label: "Project Description",
      type: "textarea",
      placeholder: "Enter project description",
    },
    {
      name: "presidentName",
      label: "President Name",
      type: "text",
      placeholder: "Enter president name",
    },
    {
      name: "secretaryName",
      label: "Secretary Name",
      type: "text",
      placeholder: "Enter secretary name",
    },
    {
      name: "projectMonth",
      label: "Project Month",
      type: "month",
      placeholder: "Enter project start month",
    },
    {
      name: "totalManHourSpent",
      label: "Total Man Hour Spent",
      type: "text",
      placeholder: "Enter project end month",
    },
    { name: "venue", label: "Venue", type: "text", placeholder: "Enter venue" },
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

    formFields.forEach((field) => {
      if (!formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
        valid = false;
      }
    });

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Perform form submission here
      // Replace console.log with your form submission logic (e.g., API call)
    } else {
      console.log("Form is invalid. Please check the fields.");
    }
  };
  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(
        "http://13.232.41.111:3005/api/v1/projects/getAll"
      );
      const project = await response.json();
      setFormData(location.state.club, project);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [_id]);
  return (
    <React.Fragment>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-top">
            <div className="form-left">
              <h1>Project Name</h1>
              <h4>Titles go here</h4>
            </div>
            <div className="form-right">
              <span
                className="material-symbols-outlined"
                onClick={handleSubmit}
              >
                upgrade
              </span>
              <span
                className="material-symbols-outlined"
                onClick={() => {
                  navigate("/project");
                }}
              >
                close
              </span>
            </div>
          </div>
          <div className="export">
            {formFields.map((field) => (
              <div className="input" key={field.name}>
                <label htmlFor={field.name}>{field.label}:</label>
                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                  />
                )}
                {formErrors[field.name] && (
                  <span style={{ color: "red" }}>{formErrors[field.name]}</span>
                )}
              </div>
            ))}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
