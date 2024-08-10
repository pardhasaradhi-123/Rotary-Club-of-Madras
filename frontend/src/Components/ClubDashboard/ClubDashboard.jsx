import React, { useState, useEffect } from "react";
import Aside from "./Aside";
import "./clubDashboard.css";
import { useNavigate } from "react-router-dom";

export default function ClubDashboard() {
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
        console.log(data);
        setMajoreData(data);
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
          <div
            className="overview-container"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="overDetails" style={{ width: "350px" }}>
              <span className="material-symbols-outlined">inventory</span>
              <h1>{majoreData.length}</h1>
              <h4>projects</h4>
            </div>
            <div className="overDetails" style={{ width: "350px" }}>
              <span className="material-symbols-outlined">groups</span>
              <h1>26</h1>
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
