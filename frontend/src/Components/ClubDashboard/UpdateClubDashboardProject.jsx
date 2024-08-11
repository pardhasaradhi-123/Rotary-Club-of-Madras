import React, { useState } from "react";
import "./addClub.css";
import "./exportProject.css";
import { useNavigate } from "react-router-dom";

export default function UpdateClubDashboardProject() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [formErrors, setFormErrors] = useState({
    projectName: "",
    projectChairName: "",
    projectSecretaryName: "",
    projectAvenue: "",
    noOfBenifeshiers: "",
    totalAmountSpent: "",
    projectPhotoLink: "",
    projectDescription: "",
    presidentName: "",
    secretaryName: "",
    projectMonth: "",
    totalManHourSpent: "",
    venue: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      projectName: "",
      projectChairName: "",
      projectSecretaryName: "",
      projectAvenue: "",
      noOfBenifeshiers: "",
      totalAmountSpent: "",
      projectPhotoLink: "",
      projectDescription: "",
      presidentName: "",
      secretaryName: "",
      projectMonth: "",
      totalManHourSpent: "",
      venue: "",
    };

    // projectName validation
    if (formData.projectName === "") {
      newErrors.projectName = "Project name is required";
      valid = false;
    }

    // project chairman Name validation
    if (formData.projectChairName === "") {
      newErrors.projectChairName = "Project chairman name is required";
      valid = false;
    }

    // project secretary Name validation
    if (formData.projectSecretaryName === "") {
      newErrors.projectSecretaryName = "Project secretary name is required";
      valid = false;
    }

    // project avenue validation
    if (formData.projectAvenue === "") {
      newErrors.projectAvenue = "Project avenue is required";
      valid = false;
    }

    // No.of benifeshier validation
    if (formData.noOfBenifeshiers === "") {
      newErrors.noOfBenifeshiers = "No.of Benifeshier is required";
      valid = false;
    }

    // total amount spent validation
    if (formData.totalAmountSpent === "") {
      newErrors.totalAmountSpent = "Total amount spent is required";
      valid = false;
    }

    // project photo link validation
    if (formData.projectPhotoLink === "") {
      newErrors.projectPhotoLink = "Project photo link is required";
      valid = false;
    }

    // project description validation
    if (formData.projectDescription === "") {
      newErrors.projectDescription = "Project description is required";
      valid = false;
    }

    //president validation
    if (formData.presidentName === "") {
      newErrors.presidentName = "President name is required";
    }

    //secretary validation
    if (formData.secretaryName === "") {
      newErrors.secretaryName = "Secretary name is required";
    }

    // project start month validation
    if (formData.projectMonth === "") {
      newErrors.projectMonth = "Project month is required";
      valid = false;
    }

    // project end month validation
    if (formData.totalManHourSpent === "") {
      newErrors.totalManHourSpent = "total man hours spent is required";
      valid = false;
    }

    // venue validation
    if (formData.venue === "") {
      newErrors.venue = "Venue is required";
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
      navigate("/project");
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
                  navigate("/project");
                }}
              >
                close
              </span>
            </div>
          </div>
          <div className="input-section export">
            <div className="input">
              <label htmlFor="projectName">project name:</label>
              <input
                type="text"
                name="projectName"
                placeholder="enter project name"
                value={formData.projectName}
                onChange={handleChange}
              />
              {formErrors.projectName && (
                <span style={{ color: "red" }}>{formErrors.projectName}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="projectChairmanName">
                project chairman name:
              </label>
              <input
                type="text"
                name="projectChairName"
                placeholder="enter project chairman name"
                value={formData.projectChairName}
                onChange={handleChange}
              />
              {formErrors.projectChairName && (
                <span style={{ color: "red" }}>
                  {formErrors.projectChairName}
                </span>
              )}
            </div>
            <div className="input">
              <label htmlFor="projectSecretaryName">
                project secretary name:
              </label>
              <input
                type="text"
                name="projectSecretaryName"
                placeholder="enter project secretary name"
                value={formData.projectSecretaryName}
                onChange={handleChange}
              />
              {formErrors.projectSecretaryName && (
                <span style={{ color: "red" }}>
                  {formErrors.projectSecretaryName}
                </span>
              )}
            </div>
            <div className="input">
              <label htmlFor="hostClubName">host club name:</label>
              <input
                type="text"
                name="hostClubName"
                placeholder="enter host club name"
                value={formData.hostClubName}
                onChange={handleChange}
              />
              {formErrors.hostClubName && (
                <span style={{ color: "red" }}>{formErrors.hostClubName}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="Co-HostClubName">host club name:</label>
              <input
                type="text"
                name="coHostClubName"
                placeholder="enter Co-Host club name"
                value={formData.coHostClubName}
                onChange={handleChange}
              />
              {formErrors.coHostClubName && (
                <span style={{ color: "red" }}>
                  {formErrors.coHostClubName}
                </span>
              )}
            </div>
            <div className="input">
              <label htmlFor="projectAvenue">project avenue:</label>
              <input
                type="text"
                name="projectAvenue"
                placeholder="enter project avenue"
                value={formData.projectAvenue}
                onChange={handleChange}
              />
              {formErrors.projectAvenue && (
                <span style={{ color: "red" }}>{formErrors.projectAvenue}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="noOfBenefishier">no.of benefishier:</label>
              <input
                type="text"
                name="noOfBenifeshiers"
                placeholder="enter no.of benefishier"
                value={formData.noOfBenifeshiers}
                onChange={handleChange}
              />
              {formErrors.noOfBenifeshiers && (
                <span style={{ color: "red" }}>
                  {formErrors.noOfBenifeshiers}
                </span>
              )}
            </div>
            <div className="input">
              <label htmlFor="speaker">spekaer/Guests:</label>
              <input
                type="text"
                name="speaker"
                placeholder="enter speaker/guests"
                value={formData.speaker}
                onChange={handleChange}
              />
            </div>
            <div className="input">
              <label htmlFor="totalAmountSpent">total amount spent:</label>
              <input
                type="text"
                name="totalAmountSpent"
                placeholder="enter total amount spent"
                value={formData.totalAmountSpent}
                onChange={handleChange}
              />
              {formErrors.totalAmountSpent && (
                <span style={{ color: "red" }}>
                  {formErrors.totalAmountSpent}
                </span>
              )}
            </div>
            <div className="input">
              <label htmlFor="presidentName">president name:</label>
              <input
                type="text"
                name="presidentName"
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
                name="secretaryName"
                placeholder="enter secretary name"
                value={formData.secretaryName}
                onChange={handleChange}
              />
              {formErrors.secretaryName && (
                <span style={{ color: "red" }}>{formErrors.secretaryName}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="projectmonth">project month:</label>
              <input
                type="month"
                name="projectMonth"
                placeholder="enter month"
                value={formData.projectMonth}
                onChange={handleChange}
              />
              {formErrors.projectMonth && (
                <span style={{ color: "red" }}>{formErrors.projectMonth}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="totalManHourSpent">total man hours spent:</label>
              <input
                type="text"
                name="totalManHourSpent"
                placeholder="enter time"
                value={formData.totalManHourSpent}
                onChange={handleChange}
              />
              {formErrors.totalManHourSpent && (
                <span style={{ color: "red" }}>
                  {formErrors.totalManHourSpent}
                </span>
              )}
            </div>
            <div className="input">
              <label htmlFor="venue">venue :</label>
              <input
                type="text"
                name="venue"
                className="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="enter venue"
              />
              {formErrors.venue && (
                <span style={{ color: "red" }}>{formErrors.venue}</span>
              )}
            </div>
            <div className="input">
              <label htmlFor="projectPhotoLink">project photo link :</label>
              <input
                type="text"
                name="projectPhotoLink"
                className="projectPhotoLink"
                value={formData.projectPhotoLink}
                onChange={handleChange}
                placeholder="enter project photo link"
              />
              {formErrors.projectPhotoLink && (
                <span style={{ color: "red" }}>
                  {formErrors.projectPhotoLink}
                </span>
              )}
            </div>
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
              <button className="submit" onClick={handleSubmit}>
                submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
