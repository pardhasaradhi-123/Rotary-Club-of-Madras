import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import Aside from "./Aside";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [detailsReport, setDetailsReport] = useState([]);
  const [rotaractClubsData, setRotaractClubsData] = useState([]);
  // const [interactClubData, setInteractClubData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  const navigate = useNavigate();

  // Fetch details report
  const fetchDetailsReport = async () => {
    try {
      const response = await fetch("http://localhost:3005/api/v1/club/getAll"); // Replace with your API endpoint
      const data = await response.json();
      console.log(data);
      // const rotaractClubs = data.filter((club) => club.clubType === "rotaract");
      // const interactClubs = data.filter((club) => club.clubType === "interact");
      // setInteractClubData(interactClubs);
      // setRotaractClubsData(rotaractClubs);
      setDetailsReport(data);
    } catch (error) {
      console.error("Error fetching details report:", error);
    }
  };

  useEffect(() => {
    fetchDetailsReport();
  }, []);

  // Delete function
  const handleDeleteClub = async (id) => {
    try {
      console.log("Deleting club with id:", id); // Debug log
      await fetch(`http://localhost:3005/api/v1/club/deleteClub/${id}`, {
        method: "DELETE",
      });
      // Refresh data by fetching overview details and details report again
      fetchDetailsReport();
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };

  // projects fetching
  useEffect(() => {
    // Fetch data from the API
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch(
          "http://localhost:3005/api/v1/projects/getAll"
        ); // Replace with your API endpoint
        const data = await response.json();
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, []);

  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="#">Dashboard</a>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
        </div>
      </nav>
      <div className="container">
        <Aside />
        <main className="overview">
          <h1 className="heading">overview</h1>
          <div className="overview-container">
            <div className="overDetails">
              <img src="/assets/project.png" alt="" />
              <h1>{projectData.length}</h1>
              <h4>total projects</h4>
            </div>
            <div className="overDetails">
              <img src="/assets/dollors.svg" alt="" />
              <h1>{rotaractClubsData}</h1>
              <h4>total amount spent in rotaract</h4>
            </div>
            <div className="overDetails">
              <img src="/assets/dollors.svg" alt="" />
              <h1>0</h1>
              <h4>total amount spent in interact</h4>
            </div>
            <div className="overDetails">
              <img src="/assets/time.png" alt="" />
              <h1>0</h1>
              <h4>total man hour interact clubs</h4>
            </div>
            <div className="overDetails">
              <img src="/assets/time.png" alt="" />
              <h1>0</h1>
              <h4>total man hour rotaract clubs</h4>
            </div>
          </div>
          <div className="details-report-section">
            <div className="heading-section">
              <div className="heading-section-left">
                <span className="material-symbols-outlined">lab_profile</span>
                <h1 className="heading">details report</h1>
              </div>
              <div className="btns">
                <button
                  onClick={() => {
                    navigate("/addclub");
                  }}
                >
                  <span className="material-symbols-outlined">add</span>add club
                </button>
                <button>
                  <span className="material-symbols-outlined">upgrade</span>
                  export
                </button>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>club name </th>
                  <th>club id</th>
                  <th>month</th>
                  <th>
                    <input
                      type="month"
                      name=""
                      id=""
                      placeholder="enter month"
                    />
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
                {detailsReport.map((eachDetail) => {
                  const { _id, clubName, clubID, month } = eachDetail;
                  console.log("Detail ID:", _id); // Debug log
                  return (
                    <tr key={_id}>
                      <td>{clubName}</td>
                      <td>{clubID}</td>
                      <td>{month}</td>
                      <Link to={`/updateclub/${clubName}`}>
                        <td>
                          <button className="update">update</button>
                        </td>
                      </Link>

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
        </main>
      </div>
    </React.Fragment>
  );
}
