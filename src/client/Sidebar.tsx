import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function dropdown() {
  document.getElementById("dropdown")?.classList.toggle("show");
}

function dropdown_student() {
  document.getElementById("dropdown-student")?.classList.toggle("show");
}

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="search-bar">
        <input type="text" name="search" placeholder="Search" />
      </div>
      <Link to="/">
        <button className="sidebar-button">Home</button>
      </Link>
      <p>Class ID</p>
      <div className="grade-dropdown">
        <button className="dropbutton" onClick={dropdown}>
          Class
        </button>
        <div className="class-content" id="dropdown">
          <button className="sidebar-button">Class Work</button>
          <div className="student-dropdown">
            <button className="dropbutton" onClick={dropdown_student}>
              Student List
            </button>
            <div className="student-list" id="dropdown-student">
              <Link to="/student">
                <button className="student">Smith, John</button>
              </Link>
              <Link to="/student">
                <button className="student">Smith, John</button>
              </Link>
              <Link to="/student">
                <button className="student">Smith, John</button>
              </Link>
            </div>
          </div>
          <button className="sidebar-button">Class Statistics</button>
        </div>
      </div>
      <div>
        <Link to="/document">
          <button className="sidebar-button">Document</button>
        </Link>
      </div>
      <div className="sidebar-footer">
        <button className="sidebar-button">Settings</button>
        <button className="sidebar-button">Account Settings</button>
        <button className="sidebar-button">Log Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
