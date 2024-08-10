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
                  navigate("/adminDashboard");
                }}
              >
                <img src="/assets/dashboard.svg" alt="" />
                <Link to="/adminDashboard" className="heading ">
                  Dashboard
                </Link>
              </button>
              <div className="dropdown">
                <button className="dropdown-toggle">
                  <div>
                    <img src="/assets/clubs.svg" alt="" />
                    <span>clubs</span>
                  </div>
                </button>
                <div className="dropdown-menu">
                  <Link to="/interact" className="dropdown-item">
                    <img src="/assets/profile.svg" alt="" />
                    <span>interact</span>
                  </Link>
                  <Link to="/rotaract" className="dropdown-item">
                    <img src="/assets/clubs.svg" alt="" />
                    <span>rotaract</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="aside-bottom">
            <img src="/assets/login.jpeg" alt="logout img here" />
            <Link to="/">
              <button
                style={{
                  width: "180px",
                  margin: "10px 0 0 10px",
                  padding: "10px",
                }}
              >
                log out
              </button>
            </Link>
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
}
