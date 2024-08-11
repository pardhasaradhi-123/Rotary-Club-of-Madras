import React, { useState, useEffect } from "react";
import "./clubDashboard.css";
import Aside from "./Aside";

import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { ADMIN_EMAIL } from "../../constant";

export default function Project() {
  const [projectDetails, setProjectDetails] = useState([]);
  const [majoreData, setMajoreData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:3005/api/v1/projects/getAll"
        ); // Replace with your API endpoint
        const data = await response.json();

        const currentClubEmail = localStorage.getItem("email");
        let clubProjects = [];
        if (currentClubEmail !== ADMIN_EMAIL) {
          clubProjects = data.filter(
            (project) => project.clubEmail === currentClubEmail
          );
        } else {
          clubProjects = data;
        }

        setProjectDetails(clubProjects);
        setMajoreData(clubProjects);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log("Deleting club with id:", id); // Debug log
      await fetch(`http://localhost:3005/api/v1/projects/deleteClub/${id}`, {
        method: "DELETE",
      });
      // Refresh data by fetching overview details and details report again
      // fetchProjectDetails();
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };
  // Get president name and secretary name from the first index of majoreData
  const presidentName =
    majoreData.length > 0 ? majoreData[0].presidentName : "N/A";
  const secretaryName =
    majoreData.length > 0 ? majoreData[0].secretaryName : "N/A";

  const handleUpdate = (club) => {
    navigate(`/updateClubdashboardProject/${club.projectName}`, {
      state: { club },
    });
  };

  const handleExport = (club) => {
    navigate(`/export-clubDashboard-project/${club.projectName}`, {
      state: { club },
    });
  };

  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="#">Project</a>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
        </div>
      </nav>
      <div className="container">
        <Aside />
        <div className="details-report-container">
          <div className="heading-section">
            <div className="heading-section-nav">
              <div className="heading-section-left">
                <span className="material-symbols-outlined">lab_profile</span>
                <h1 className="heading">details report</h1>
              </div>
              <div className="heading-section-right">
                <button>
                  <span className="material-symbols-outlined">upgrade</span>
                  Export
                </button>
              </div>
            </div>
            <div className="majoreRole-details">
              <div className="majore-left">
                <h1>
                  <span>president:</span> {presidentName}
                </h1>
                <h1>
                  <span>secretary:</span> {secretaryName}
                </h1>
              </div>
              <div className="majore-right">
                <div className="top">
                  <span className="material-symbols-outlined">inventory</span>
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
                <th>project month</th>
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
                          handleDelete(_id);
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
