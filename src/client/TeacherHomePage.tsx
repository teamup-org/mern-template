import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./TeacherHomePage.css";
import Sidebar from "./Sidebar";

import sample1 from "./images/sample1.png";
import sample2 from "./images/sample2.jpg";

const TeacherHomePage = () => {
  return (
    <div className="homepage">
      <Sidebar />
      <div className="main">
        <h1>Your Classes</h1>
        <div className="class-grid">
            <button className="class-button">
              <img src={sample1} alt="class pic" />
              <div>
                <h3>Class Name</h3>
                <p>1 Student</p>
              </div>
            </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherHomePage;
