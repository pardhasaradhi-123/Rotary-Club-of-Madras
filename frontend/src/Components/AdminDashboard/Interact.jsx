import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import Aside from "./Aside";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Interact() {
  const [interactDetailsReport, setInteractDetailsReport] = useState([]);
  const navigate = useNavigate();

  const fetchDetailsReport = async () => {
    try {
      const response = await fetch("https://server.rcmys.in/api/v1/club/getAll"); // Replace with your API endpoint
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
      // Debug log
      await fetch(`https://server.rcmys.in/api/v1/club/deleteClub/${id}`, {
        method: "DELETE",
      });
      // Refresh data by fetching overview details and details report again
      fetchDetailsReport();
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };

  const redirect = (club) => {
    const { clubName } = club;
    navigate(`/interact/interact-project-full-details/${clubName}`, {
      state: { club },
    });
  };
  // const handleUpdate = (club) => {
  //   navigate(`/updateclub/${club.clubName}`, { state: { club } });
  // };
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
                    <td onClick={() => redirect(eachDetail)}>{clubName}</td>
                    <td>{clubID}</td>
                    <td>{month}</td>

                    <td>
                      <button className="update">update</button>
                    </td>

                    <td>
                      <button
                        className="delete"
                        onClick={() => {
                          handleDeleteClub(_id);
                          toast.error(`${clubName} deleted!`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
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
