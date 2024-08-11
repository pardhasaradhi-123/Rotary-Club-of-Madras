import React, { useState, useEffect } from "react";
import "./addClub.css";
import "./exportClubDashboardProject.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function UpdateClubDashboardProject() {
  const navigate = useNavigate();
  const location = useLocation();
  const { _id } = useParams();

  const initialFormState = {
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

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formErrors, setFormErrors] = useState(initialFormState);

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...initialFormState };

    const requiredFields = [
      "projectName",
      "projectChairName",
      "projectSecretaryName",
      "projectAvenue",
      "noOfBenifeshiers",
      "totalAmountSpent",
      "projectPhotoLink",
      "projectDescription",
      "presidentName",
      "secretaryName",
      "projectMonth",
      "totalManHourSpent",
      "venue",
    ];

    requiredFields.forEach((field) => {
      if (formData[field] === "") {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
        valid = false;
      }
    });

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          "http://localhost:3005/api/v1/projects/update",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          setFormData(formData);
          navigate("/project");
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
    { label: "Project Name", name: "projectName", type: "text" },
    { label: "Project Chairman Name", name: "projectChairName", type: "text" },
    {
      label: "Project Secretary Name",
      name: "projectSecretaryName",
      type: "text",
    },
    { label: "Host Club Name", name: "hostClubName", type: "text" },
    { label: "Co-Host Club Name", name: "coHostClubName", type: "text" },
    { label: "Project Avenue", name: "projectAvenue", type: "text" },
    { label: "No. of Beneficiaries", name: "noOfBenifeshiers", type: "text" },
    { label: "Speaker/Guests", name: "speaker", type: "text" },
    { label: "Total Amount Spent", name: "totalAmountSpent", type: "text" },
    { label: "President Name", name: "presidentName", type: "text" },
    { label: "Secretary Name", name: "secretaryName", type: "text" },
    { label: "Project Month", name: "projectMonth", type: "month" },
    { label: "Total Man Hours Spent", name: "totalManHourSpent", type: "text" },
    { label: "Venue", name: "venue", type: "text" },
    { label: "Project Photo Link", name: "projectPhotoLink", type: "text" },
  ];
  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost:3005/api/v1/projects/getAll"
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
              <h1>Update Project</h1>
              <h4>titles goes here</h4>
            </div>
            <div className="form-right">
              <span
                className="material-symbols-outlined"
                onClick={() => navigate("/project")}
              >
                close
              </span>
            </div>
          </div>
          <div className=" export">
            {formFields.map((field) => (
              <div className="input" key={field.name}>
                <label htmlFor={field.name}>{field.label.toLowerCase()}:</label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={`enter ${field.label.toLowerCase()}`}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
                {formErrors[field.name] && (
                  <span style={{ color: "red" }}>{formErrors[field.name]}</span>
                )}
              </div>
            ))}
            <div className="input">
              <label htmlFor="projectDescription">project description :</label>
              <textarea
                name="projectDescription"
                id="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="Enter Project Description"
              ></textarea>
              {formErrors.projectDescription && (
                <span style={{ color: "red" }}>
                  {formErrors.projectDescription}
                </span>
              )}
            </div>
            <div className="bottom-section">
              <button className="submit" type="submit">
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
