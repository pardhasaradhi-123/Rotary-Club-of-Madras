import React, { useEffect, useState } from "react";
import "./addClub.css";
import "./exportAdminDashboardProject.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ExportProject() {
  const { _id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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

    formFields.forEach(({ name }) => {
      if (formData[name] === "") {
        newErrors[name] = `${name
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()} is required`;
        valid = false;
      }
    });

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log(formData);
      // Add form submission logic here
    } else {
      console.log("Form is invalid. Please check the fields.");
    }
  };

  const formFields = [
    {
      label: "Project Name",
      name: "projectName",
      type: "text",
      placeholder: "Enter project name",
    },
    {
      label: "Project Chairman Name",
      name: "projectChairName",
      type: "text",
      placeholder: "Enter project chairman name",
    },
    {
      label: "Project Secretary Name",
      name: "projectSecretaryName",
      type: "text",
      placeholder: "Enter project secretary name",
    },
    {
      label: "Host Club Name",
      name: "hostClubName",
      type: "text",
      placeholder: "Enter host club name",
    },
    {
      label: "Co-Host Club Name",
      name: "coHostClubName",
      type: "text",
      placeholder: "Enter co-host club name",
    },
    {
      label: "Project Avenue",
      name: "projectAvenue",
      type: "text",
      placeholder: "Enter project avenue",
    },
    {
      label: "No. of Beneficiaries",
      name: "noOfBenifeshiers",
      type: "text",
      placeholder: "Enter number of beneficiaries",
    },
    {
      label: "Speaker/Guests",
      name: "speaker",
      type: "text",
      placeholder: "Enter speaker/guests",
    },
    {
      label: "Total Amount Spent",
      name: "totalAmountSpent",
      type: "text",
      placeholder: "Enter total amount spent",
    },
    {
      label: "President Name",
      name: "presidentName",
      type: "text",
      placeholder: "Enter president name",
    },
    {
      label: "Secretary Name",
      name: "secretaryName",
      type: "text",
      placeholder: "Enter secretary name",
    },
    {
      label: "Project Month",
      name: "projectMonth",
      type: "month",
      placeholder: "Enter month",
    },
    {
      label: "Total Man Hour Spent",
      name: "totalManHourSpent",
      type: "text",
      placeholder: "Enter man hour spent",
    },
    { label: "Venue", name: "venue", type: "text", placeholder: "Enter venue" },
    {
      label: "Project Photo (Link)",
      name: "projectPhotoLink",
      type: "text",
      placeholder: "Enter project photo link",
    },
    {
      label: "Project Description",
      name: "projectDescription",
      type: "textarea",
      placeholder: "Enter project description",
    },
  ];

  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(
        "https://rcmys.in/api/v1/projects/getAll"
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
              <h4>Title goes here</h4>
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
                onClick={() => navigate("/adminDashboard")}
              >
                close
              </span>
            </div>
          </div>
          <div className="export">
            {formFields.map(({ label, name, type, placeholder }) => (
              <div className="input" key={name}>
                <label htmlFor={name}>{label}:</label>
                {type === "textarea" ? (
                  <textarea
                    name={name}
                    id={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                  ></textarea>
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                  />
                )}
                {formErrors[name] && (
                  <span style={{ color: "red" }}>{formErrors[name]}</span>
                )}
              </div>
            ))}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
