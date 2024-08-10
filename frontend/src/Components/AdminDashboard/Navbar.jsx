import React from "react";
import './navbar.css'

export default function Navbar() {
  return (
    <React.Fragment>
      <nav className="navbar">
        <div className="navbar-brand">
          <a href="#">Brand</a>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
        </div>
      </nav>
    </React.Fragment>
  );
}
