import React, { useState, useEffect } from "react";
import Aside from "./Aside";
import "./clubDashboard.css";
import { useNavigate } from "react-router-dom";
import { ADMIN_EMAIL } from "../../constant";

export default function ClubDashboard() {
  const [majoreProjectData, setMajoreProjectData] = useState([]);
  const [majoreMmeberData, setMajoreMemberData] = useState([]);

  const navigate = useNavigate();
  // Fetch data from the API
  const fetchProjectDetails = async () => {
    try {
      const projectResponse = await fetch(
        "http://localhost:3005/api/v1/projects/getAll"
      ); // Replace with your API endpoint
      const projectData = await projectResponse.json();
      const currentClubEmail = localStorage.getItem("email");
      let clubProjects = [];
      if (currentClubEmail !== ADMIN_EMAIL) {
        clubProjects = projectData.filter(
          (project) => project.clubEmail === currentClubEmail
        );
      } else {
        clubProjects = projectData;
      }
      setMajoreProjectData(clubProjects);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const fetchMembersData = async () => {
    try {
      const memberResponse = await fetch(
        "http://localhost:3005/api/v1/member/getAll"
      );
      const memberData = await memberResponse.json();
      const currentClubEmail = localStorage.getItem("email");
      let clubMembers;
      if (currentClubEmail !== ADMIN_EMAIL) {
        clubMembers = memberData.filter(
          (project) => project.clubEmail === currentClubEmail
        );
      } else {
        clubMembers = memberData;
      }

      setMajoreMemberData(clubMembers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjectDetails();
    fetchMembersData();
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
          <div
            className="overview-container"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="overDetails" style={{ width: "350px" }}>
              <span className="material-symbols-outlined">inventory</span>
              <h1>{majoreProjectData.length}</h1>
              <h4>projects</h4>
            </div>
            <div className="overDetails" style={{ width: "350px" }}>
              <span className="material-symbols-outlined">groups</span>
              <h1>{majoreMmeberData.length}</h1>
              <h4>total club members</h4>
            </div>
          </div>
          <div
            className="btn-section"
            style={{
              height: "250px",
              display: "flex",
              alignItems: "end",
            }}
          >
            <button
              style={{
                width: "100%",
                background: "aqua",
                padding: "10px",
                textTransform: "uppercase",
                fontWeight: "550",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                navigate("/addproject");
              }}
            >
              <span className="material-symbols-outlined">add</span>
              add project
            </button>
          </div>
        </main>
      </div>
    </React.Fragment>
  );
}
