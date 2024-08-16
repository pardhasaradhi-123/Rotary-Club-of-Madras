import React, { useState, useEffect } from "react";
import "./clubDashboard.css";
import Aside from "./Aside";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { ADMIN_EMAIL } from "../../constant";

export default function Project() {
  const [projectDetails, setProjectDetails] = useState([]);
  const [majoreData, setMajoreData] = useState([]);
  const [club, setClub] = useState({});
  const currentUser = localStorage.getItem("email");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          "https://server.rcmys.in/api/v1/projects/getAll"
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
    fetchClubDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log("Deleting club with id:"); // Debug log
      await fetch(`https://server.rcmys.in/api/v1/projects/deleteClub/${id}`, {
        method: "DELETE",
      });
      // Refresh data by fetching overview details and details report again
      // fetchProjectDetails();
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };

  const fetchClubDetails = async () => {
    try {
      const response = await fetch("https://server.rcmys.in/api/v1/club/getAll");
      const data = await response.json();
      const myclub = data.filter((club) => club.email === currentUser);

      setClub(myclub[0]);
    } catch (error) {
      console.error("Error fetching details report:", error);
    }
  };

  // const handleUpdate = (club) => {
  //   navigate(`/updateClubdashboardProject/${club.projectName}`, {
  //     state: { club },
  //   });
  // };

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
                  <span>president:</span> {club?.presidentName}
                </h1>
                <h1>
                  <span>secretary:</span> {club?.secretaryName}
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
                      <button className="update">update</button>
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
