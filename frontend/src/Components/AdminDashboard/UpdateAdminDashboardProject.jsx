import React, { useState, useEffect } from "react";
import "./addClub.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function UpdateAdminDashboardProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const { _id } = useParams();

  const [formData, setFormData] = useState({
    projectName: "",
    presidentName: "",
    secretaryName: "",
    projectMonth: "",
    totalManHourSpent: "",
    avenue: "",
  });

  const [formErrors, setFormErrors] = useState({
    projectName: "",
    presidentName: "",
    secretaryName: "",
    projectMonth: "",
    totalManHourSpent: "",
    avenue: "",
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

    formFields.forEach((field) => {
      if (formData[field.name] === "") {
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

  const formFields = [
    {
      name: "projectName",
      label: "Project Name",
      type: "text",
      placeholder: "enter project name",
    },
    {
      name: "presidentName",
      label: "President Name",
      type: "text",
      placeholder: "enter president name",
    },
    {
      name: "secretaryName",
      label: "Secretary Name",
      type: "text",
      placeholder: "enter secretary name",
    },
    {
      name: "projectMonth",
      label: "Project Month",
      type: "month",
      placeholder: "enter month",
    },
    {
      name: "totalManHourSpent",
      label: "Total Man Hour Spent",
      type: "text",
      placeholder: "enter man hour spent",
    },
    {
      name: "projectAvenue",
      label: "Avenue",
      type: "text",
      placeholder: "enter avenue",
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
        <form onSubmit={validateForm}>
          <div className="form-top">
            <div className="form-left">
              <h1>update project</h1>
              <h4>titles goes here</h4>
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
            {formFields.map((field) => (
              <div className="input" key={field.name}>
                <label htmlFor={field.name}>{field.label}:</label>
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
                navigate("/adminDashboard");
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
