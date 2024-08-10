import React, { useState } from "react";
import "./addClub.css";
import { useNavigate } from "react-router-dom";

export default function UpdateAdminDashboardProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: "",
    presidentName: "",
    secretaryName: "",
    projectStartMonth: "",
    projectEndMonth: "",
    avenue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formErrors, setFormErrors] = useState({
    projectName: "",
    presidentName: "",
    secretaryName: "",
    projectStartMonth: "",
    projectEndMonth: "",
    avenue: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      projectName: "",
      presidentName: "",
      secretaryName: "",
      projectStartMonth: "",
      projectEndMonth: "",
      avenue: "",
    };

    // projectName validation
    if (formData.projectName === "") {
      newErrors.projectName = "Project Name is required";
      valid = false;
    }

    //presidentName validation
    if (formData.presidentName === "") {
      newErrors.presidentName = "President name is required";
    }

    //secretary validation
    if (formData.secretaryName === "") {
      newErrors.secretaryName = "Secretary name is required";
    }

    // project start month validation
    if (formData.projectStartMonth === "") {
      newErrors.projectStartMonth = "Project start month is required";
      valid = false;
    }

    // project end month validation
    if (formData.projectEndMonth === "") {
      newErrors.projectEndMonth = "Project end month is required";
      valid = false;
    }

    // avenue validation
    if (formData.avenue === "") {
      newErrors.avenue = "Avenue is required";
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Perform form submission here
      console.log(formData);
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
            <div className="input">
              <label htmlFor="projectName">project name:</label>
              <input
                type="text"
                placeholder="enter project name"
                value={formData.projectName}
                onChange={handleChange}
              />
              {formErrors.projectName && (
                <span style={{ color: "red" }}>{formErrors.projectName}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="presidentName">president name:</label>
              <input
                type="text"
                placeholder="enter president name"
                value={formData.presidentName}
                onChange={handleChange}
              />
              {formErrors.presidentName && (
                <span style={{ color: "red" }}>{formErrors.presidentName}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="secretaryName">secretary name:</label>
              <input
                type="text"
                placeholder="enter secretary name"
                value={formData.secretaryName}
                onChange={handleChange}
              />
              {formErrors.secretaryName && (
                <span style={{ color: "red" }}>{formErrors.secretaryName}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="project-start-month">
                project starting month:
              </label>
              <input
                type="month"
                placeholder="enter month"
                value={formData.projectStartMonth}
                onChange={handleChange}
              />
              {formErrors.projectStartMonth && (
                <span style={{ color: "red" }}>
                  {formErrors.projectStartMonth}
                </span>
              )}
            </div>
            <div className="input">
              <label htmlFor="project-end-month">project end month:</label>
              <input
                type="month"
                placeholder="enter month"
                value={formData.projectEndMonth}
                onChange={handleChange}
              />
              {formErrors.projectEndMonth && (
                <span style={{ color: "red" }}>
                  {formErrors.projectEndMonth}
                </span>
              )}
            </div>
            <div className="input">
              <label htmlFor="avenue">Avenue :</label>
              <input
                type="text"
                name="avenue"
                className="avenue"
                value={formData.avenue}
                onChange={handleChange}
                placeholder="enter avenue"
              />
              {formErrors.avenue && (
                <span style={{ color: "red" }}>{formErrors.avenue}</span>
              )}
            </div>
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
