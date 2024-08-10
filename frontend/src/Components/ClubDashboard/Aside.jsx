import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Aside() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <aside>
        <div className="aside-container">
          <div className="aside-top">
            <div className="logo-section">
              <img src="/assets/rotary-logo.jpeg" alt="logo here" />
            </div>
            <div className="menu-section">
              <button
                className="dashboard-menu"
                onClick={() => {
                  navigate("/clubDashboard");
                }}
              >
                <span className="material-symbols-outlined">dashboard</span>
                <Link to="/clubDashboard" className="heading ">
                  Dashboard
                </Link>
              </button>
            </div>
            <div className="menu-section">
              <button
                className="dashboard-menu"
                onClick={() => {
                  navigate("/project");
                }}
              >
                <span className="material-symbols-outlined">inventory</span>
                <Link to="/project" className="heading ">
                  Project
                </Link>
              </button>
            </div>
            <div className="menu-section">
              <button
                className="dashboard-menu"
                onClick={() => {
                  navigate("/club-member");
                }}
              >
                <span className="material-symbols-outlined">groups</span>
                <Link to="/club-member" className="heading ">
                  Club Member
                </Link>
              </button>
            </div>
            <div className="menu-section">
              <button
                className="dashboard-menu"
                onClick={() => {
                  navigate("/contact");
                }}
              >
                <span className="material-symbols-outlined">chat</span>
                <Link to="/contact" className="heading ">
                  Contact
                </Link>
              </button>
            </div>
          </div>
          <div className="aside-bottom">
            <img src="/assets/login.jpeg" alt="logout img here" />
            <Link to="/">
              <button style={{ width: "180px", margin: "10px 0 0 10px",padding:'10px' }}>
                log out
              </button>
            </Link>
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
}
