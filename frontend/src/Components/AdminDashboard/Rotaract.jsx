import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import Aside from "./Aside";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { toast } from "react-toastify";

export default function Rotaract() {
  const [rotaractDetailsReport, setRotaractDetailsReport] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 8; // Number of clubs per page
  const navigate = useNavigate();

  const fetchDetailsReport = async () => {
    try {
      const response = await fetch(
        "https://server.rcmys.in/api/v1/club/getAll"
      );
      const data = await response.json();
      const rotaractClubs = data.filter((club) => club.clubType === "rotaract");
      setRotaractDetailsReport(rotaractClubs);
    } catch (error) {
      console.error("Error fetching details report:", error);
    }
  };

  useEffect(() => {
    fetchDetailsReport();
  }, []);

  const handleDeleteClub = async (id) => {
    try {
      await fetch(`https://server.rcmys.in/api/v1/club/deleteClub/${id}`, {
        method: "DELETE",
      });
      fetchDetailsReport();
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };

  const redirect = (club) => {
    const { clubName } = club;
    navigate(`/rotaract/rotaract-project-full-details/${clubName}`, {
      state: { club },
    });
  };

  // Pagination logic
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = rotaractDetailsReport.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(rotaractDetailsReport.length / todosPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="#">Rotaract</a>
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
          </div>
          <table>
            <thead>
              <tr>
                <th>club name</th>
                <th>club id</th>
                <th>month</th>
                <th>
                  <input type="month" placeholder="enter month" />
                </th>
                <th>
                  <input
                    type="search"
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
              {currentTodos.map((eachDetail) => {
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
          <div className="flex justify-end mt-3">
            {currentPage === 1 ? null : (
              <button onClick={prevPage} className="uppercase">
                Previous
              </button>
            )}
            <span className="mx-4"> Page {currentPage} </span>

            {currentPage ===
            Math.ceil(rotaractDetailsReport.length / todosPerPage) ? null : (
              <button onClick={nextPage} className="uppercase">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
