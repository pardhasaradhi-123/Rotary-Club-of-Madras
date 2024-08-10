import React, { useEffect, useState } from "react";
import "./clubDashboard.css";
import Aside from "./Aside";
import "./navbar.css";
import DeleteMember from "./DeleteMember";
import { useNavigate } from "react-router-dom";

export default function ClubMember() {
  const navigate = useNavigate();
  const [member, setMember] = useState([]);

  const [deleteMember, setDeleteMember] = useState(false);
  const fetchMembersData = async () => {
    const response = await fetch("http://localhost:3005/api/v1/member/getAll");
    const data = await response.json();
    setMember(data);
  };
  useEffect(() => {
    fetchMembersData();
  }, []);
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
                  <span>president:</span> president name
                </h1>
                <h1>
                  <span>secretary:</span> secretary name
                </h1>
              </div>
              <div className="majore-right">
                <div className="top">
                  <span className="material-symbols-outlined">diversity_3</span>
                </div>
                <div className="bottom">
                  <h1>34</h1>
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
                      <button
                        className="update"
                        onClick={() => {
                          navigate("/updateMember");
                        }}
                      >
                        update
                      </button>
                    </td>
                    <td>
                      <button className="delete" onClick={() => {}}>
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
      {deleteMember && <DeleteMember onClose={() => setDeleteMember(false)} />}
    </React.Fragment>
  );
}
