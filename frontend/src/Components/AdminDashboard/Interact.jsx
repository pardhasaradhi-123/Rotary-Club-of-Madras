import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import Aside from "./Aside";
import DeleteClub from "./DeleteClub";
import "./navbar.css";
import { Link } from "react-router-dom";

export default function Interact() {
  const [deleteClub, setDeleteClub] = useState(false);
  const [interactDetailsReport, setInteractDetailsReport] = useState([]);

  const fetchDetailsReport = async () => {
    try {
      const response = await fetch("http://localhost:3005/api/v1/club/getAll"); // Replace with your API endpoint
      const data = await response.json();
      const interactClubs = data.filter((club) => club.clubType === "interact");
      setInteractDetailsReport(interactClubs);
    } catch (error) {
      console.error("Error fetching details report:", error);
    }
  };
  useEffect(() => {
    fetchDetailsReport();
  }, []);
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
            <div className="heading-section-nav">
              <div className="heading-section-left">
                <span className="material-symbols-outlined">lab_profile</span>
                <h1 className="heading">details report</h1>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>club name </th>
                <th>club id</th>
                <th>month</th>
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
              {interactDetailsReport.map((eachDetail) => {
                const { _id, clubName, clubID, month } = eachDetail;
                return (
                  <tr key={_id}>
                    <Link
                      to={`/interact/interact-project-full-details/${clubName}`}
                    >
                      <td>{clubName}</td>
                    </Link>
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
      </div>
      {deleteClub && <DeleteClub onClose={() => setDeleteClub(false)} />}
    </React.Fragment>
  );
}
