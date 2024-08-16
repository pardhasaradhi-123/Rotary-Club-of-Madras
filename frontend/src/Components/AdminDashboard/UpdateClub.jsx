import { useState, useEffect } from "react";
import "./addClub.css";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";

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
  const { _id } = useParams(); // Get the club ID from the URL, now named clubID
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch all clubs and find the specific club by clubID
    const fetchClubDetails = async () => {
      try {
        const response = await fetch(
          `https://server.rcmys.in/api/v1/club/getAll` // Fetch all clubs
        );
        const club = await response.json();
        setFormData(location.state.club, club);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch club details", error);
        setLoading(false);
      }
    };

    fetchClubDetails();
  }, [_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://server.rcmys.in/api/v1/club/update`, // Update club details by clubID
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        navigate("/adminDashboard"); // Redirect to the dashboard on success
      } else {
        console.error("Failed to update the club");
      }
    } catch (error) {
      console.error("Error occurred while updating the club", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
