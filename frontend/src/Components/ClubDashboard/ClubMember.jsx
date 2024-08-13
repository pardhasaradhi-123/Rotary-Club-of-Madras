import React, { useEffect, useState } from "react";
import "./clubDashboard.css";
import Aside from "./Aside";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { ADMIN_EMAIL } from "../../constant";

export default function ClubMember() {
  const navigate = useNavigate();
  const [member, setMember] = useState([]);
  const [club, setClub] = useState({});
  const currentUser = localStorage.getItem("email");

  const fetchMembersData = async () => {
    const response = await fetch("http://localhost:3005/api/v1/member/getAll");
    const data = await response.json();
    const currentClubEmail = localStorage.getItem("email");
    let clubMembers = [];
    if (currentClubEmail !== ADMIN_EMAIL) {
      clubMembers = data.filter(
        (project) => project.clubEmail === currentClubEmail
      );
    } else {
      clubMembers = data;
    }
    setMember(clubMembers);
  };
  useEffect(() => {
    fetchMembersData();
    fetchClubDetails();
  }, []);
  const handleDeleteMember = async (id) => {
    try {
      await fetch(`http://localhost:3005/api/v1/member/deleteClub/${id}`, {
        method: "DELETE",
      });
      fetchMembersData();
    } catch (error) {
      console.error("Error deleting club:", error);
    }
  };
  const fetchClubDetails = async () => {
    try {
      const response = await fetch("http://localhost:3005/api/v1/club/getAll");
      const data = await response.json();
      const myclub = data.filter((club) => club.email === currentUser);

      setClub(myclub[0]);
    } catch (error) {
      console.error("Error fetching details report:", error);
    }
  };
  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="#">Club Members</a>
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
                <button
                  onClick={() => {
                    navigate("/add-member");
                  }}
                >
                  <span className="material-symbols-outlined">person_add</span>
                  add memeber
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
                  <span className="material-symbols-outlined">diversity_3</span>
                </div>
                <div className="bottom">
                  <h1>{member.length}</h1>
                  <p>total members</p>
                </div>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>member name </th>
                <th>id</th>
                <th>designation</th>
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
              {member.map((eachMember) => {
                const { _id, id, name, designation } = eachMember;
                return (
                  <tr key={_id}>
                    <td>{name}</td>
                    <td>{id}</td>
                    <td>{designation}</td>
                    <td>
                      <button className="update">update</button>
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => {
                          handleDeleteMember(_id);
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
