import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import Aside from "./Aside";
import "./navbar.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function InteractProjectDetails() {
  const { clubName } = useParams();
  const [projectDetails, setProjectDetails] = useState([]);
  const [majoreData, setMajoreData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch data from the API
  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost:3005/api/v1/projects/getAll"
      ); // Replace with your API endpoint
      const data = await response.json();
      const clubEmail = location.state.club.email;
      let clubProjects = data.filter(
        (project) => project.clubEmail === clubEmail
      );

      setProjectDetails(clubProjects);
      setMajoreData(clubProjects);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
  }, [clubName]);
  const handleDeleteClub = async (id) => {
    try {
      console.log("Deleting club with id:", id); // Debug log
      await fetch(`http://localhost:3005/api/v1/club/deleteClub/${id}`, {
        method: "DELETE",
      });
      // Refresh data by fetching overview details and details report again
      fetchProjectDetails();
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };

  // Get president name and secretary name from the first index of majoreData
  const presidentName =
    majoreData.length > 0 ? majoreData[0].presidentName : "N/A";
  const secretaryName =
    majoreData.length > 0 ? majoreData[0].secretaryName : "N/A";
  const handleExport = (club) => {
    navigate(`/exportAdmindashboardProject/${club.clubName}`, {
      state: { club },
    });
  };

  const handleUpdate = (club) => {
    navigate(`/update-dashboard-project/${club.clubName}`, { state: { club } });
  };

  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="#">Interact</a>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
        </div>
      </nav>
      <div className="container">
        <Aside />
        <div className="details-report-container">
          <div className="heading-section">
            <div className="heading-section-left">
              <span className="material-symbols-outlined">lab_profile</span>
              <h1 className="heading">details report</h1>
            </div>
            <div className="majoreRole-details">
              <div className="majore-left">
                <h1>
                  <span>president:</span>
                  {presidentName}
                </h1>
                <h1>
                  <span>secretary:</span> {secretaryName}
                </h1>
              </div>
              <div className="majore-right">
                <div className="top">
                  <img
                    src="/assets/project.png"
                    alt="logo"
                    style={{ width: "30px" }}
                  />
                </div>
                <div className="bottom">
                  <h1>{majoreData.length}</h1>
                  <p>total projects</p>
                </div>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>project name </th>
                <th>month</th>
                <th>avenue</th>
                <th>
                  <input type="month" name="" id="" placeholder="enter month" />
                </th>
                <th>
                  <input
                    type="search"
                    name=""
                    id=""
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                      border: "none",
                      outline: "none",
                    }}
                    placeholder="search.."
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {projectDetails.map((eachDetail) => {
                const { _id, projectName, projectMonth, projectAvenue } =
                  eachDetail;
                return (
                  <tr key={_id}>
                    <td
                      onClick={() => {
                        handleExport(eachDetail);
                      }}
                    >
                      {projectName}
                    </td>
                    <td>{projectMonth}</td>
                    <td>{projectAvenue}</td>
                    <td>
                      <button
                        className="update"
                        onClick={() => {
                          handleUpdate(eachDetail);
                        }}
                      >
                        update
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => {
                          handleDeleteClub(_id);
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}
