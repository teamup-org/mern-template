import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './StudentViewPage.css';
import Sidebar from "./Sidebar";

const StudentViewPage = () => {
    return (
        <div className="homepage">
            <Sidebar />
            <div className="main">
                <div className="student-status">
                    <h3>John Smith - On Track</h3>
                    <p>Comprehension: Above Class Average</p>
                    <p>Reading Speed: Class Average</p>
                </div>
                <div className="reports">
                    <div className="student-report">
                        <div className="time">
                            <p>Last Session</p>
                            <p>7/13/2024</p>
                        </div>
                        <p>Reading Speed: 1 minutes 13 seconds</p>
                        <p>Words Per Minute: 87</p>
                        <p>Comprehension Score: 85%</p>
                        <p>Questions Answered Correctly: 17/20</p>
                        <button className="left-button">View More</button>
                    </div>
                    <div className="student-report">
                        <div className="time">
                            <p>All Time</p>
                            <p>Sep - Present</p>
                        </div>
                        <p>Words Per Minute: 87</p>
                        <p>Comprehension Score: 83%</p>
                        <p>Questions Answered Correctly: 249/300</p>
                        <button className="right-button">View Report</button>
                    </div>
                </div>
                <div className="graph">Graph goes here</div>
                <hr className="break"/>
                <div className="graph">Graph goes here</div>
            </div>
        </div>
    )    
}

export default StudentViewPage