import { useState, useEffect } from "react";
import "./addClub.css";
import { Link, useParams } from "react-router-dom";

const fields = [
  {
    name: "clubName",
    label: "Club Name",
    type: "text",
    placeholder: "Enter club name",
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
  { name: "email", label: "Email", type: "text", placeholder: "Enter email" },
  {
    name: "password",
    label: "Password",
    type: "text",
    placeholder: "Enter password",
  },
  {
    name: "clubType",
    label: "Club Type",
    type: "select",
    options: ["Interact", "Rotaract"],
  },
  { name: "month", label: "Month", type: "month" },
];

const UpdateClub = () => {
  const { _id } = useParams(); // Get the club id from the URL
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Fetch the club details when the component mounts
    const fetchClubDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3005/api/v1/club/getAll/${_id}` // Assuming this is the correct endpoint
        );
        const club = await response.json();
        setFormData(club);
        console.log(club);
      } catch (error) {
        console.error("Failed to fetch club details", error);
      }
    };

    fetchClubDetails();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    fields.forEach((field) => {
      if (
        field.type !== "select" &&
        (!formData[field.name] || formData[field.name].trim() === "")
      ) {
        newErrors[field.name] = `${field.label} is required`;
        valid = false;
      }
      if (field.name === "email" && !formData.email.includes("@gmail.com")) {
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
      try {
        const response = await fetch(
          `http://localhost:3005/api/v1/club/updateClub/${_id}`, // Assuming this is the correct endpoint
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          console.log("Club updated successfully!");
        } else {
          console.error("Failed to update the club");
        }
      } catch (error) {
        console.error("Error occurred while updating the club", error);
      }
    } else {
      console.log("Form is invalid. Please check the fields.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-top">
          <div className="form-left">
            <h1>Update Club</h1>
            <h4>Update the details of the club</h4>
          </div>
          <div className="form-right">
            <Link to="/adminDashboard">
              <span className="material-symbols-outlined">close</span>
            </Link>
          </div>
        </div>
        <div className="input-section">
          {fields.map((field) => (
            <div className="input" key={field.name}>
              <label htmlFor={field.name}>{field.label}:</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select {field.label.toLowerCase()}</option>
                  {field.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              )}
              {formErrors[field.name] && (
                <span style={{ color: "red" }}>{formErrors[field.name]}</span>
              )}
            </div>
          ))}
        </div>
        <div className="btn">
          <Link to="/adminDashboard">
            <button type="button" className="cancel">
              Cancel
            </button>
          </Link>
          <button type="submit" className="add">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClub;
