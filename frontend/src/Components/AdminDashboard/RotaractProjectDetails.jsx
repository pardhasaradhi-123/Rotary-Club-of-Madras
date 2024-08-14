import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import Aside from "./Aside";
import "./navbar.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function RotaractProjectDetails() {
  const { clubName } = useParams();

  const [projectDetails, setProjectDetails] = useState([]);
  const [majoreData, setMajoreData] = useState([]);
  const [presidentName, setPresidentName] = useState("");
  const [secretaryName, setSeSecretaryName] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setSeSecretaryName(
      location.state.club.secretaryName
        ? location.state.club.secretaryName
        : "N/A"
    );
    setPresidentName(
      location.state.club.presidentName
        ? location.state.club.presidentName
        : "N/A"
    );
  }, [location]);

  // Fetch data from the API
  const fetchProjectDetails = async () => {
    try {
      const response = await fetch(
        "http://13.232.41.111:3005/api/v1/projects/getAll"
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
      await fetch(`http://13.232.41.111:3005/api/v1/projects/deleteClub/${id}`, {
        method: "DELETE",
      });
      // Refresh data by fetching overview details and details report again
      fetchProjectDetails();
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };

  // Get president name and secretary name from the first index of majoreData
  // const presidentName =
  //   majoreData.length > 0 ? majoreData[0].presidentName : "N/A";
  // const secretaryName =
  //   majoreData.length > 0 ? majoreData[0].secretaryName : "N/A";

  const handleExport = (club) => {
    navigate(`/exportAdmindashboardProject/${club.projectName}`, {
      state: { club },
    });
  };

  // const handleUpdate = (club) => {
  //   navigate(`/update-dashboard-project/${club.projectName}`, {
  //     state: { club },
  //   });
  // };
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
                      <button className="update">update</button>
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => {
                          handleDeleteClub(_id);
                          toast.error(`${projectName} deleted!`, {
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
