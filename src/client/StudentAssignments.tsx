import React, { useState, useEffect } from 'react';
import { Link, Navigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import './StudentAssignments.css'

const StudentAssignments = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    // if (isLoading) {
    //     return <Navigate to="/" />;
    // }

    return (
        isAuthenticated && user && (
            <div>
                <Header />
                <div className="container">
                    <h1>Assignments</h1>
                    <ul className="assignment-list">
                        <li className="assignment-item">
                        <div>
                            <h3>Assignment 1</h3>
                            <p>Due: July 31, 2024</p>
                        </div>
                        <button>View</button>
                        </li>
                        <li className="assignment-item">
                        <div>
                            <h3>Assignment 2</h3>
                            <p>Due: August 15, 2024</p>
                        </div>
                        <button>View</button>
                        </li>
                        <li className="assignment-item">
                        <div>
                            <h3>Assignment 3</h3>
                            <p>Due: September 1, 2024</p>
                        </div>
                        <button>View</button>
                        </li>
                    </ul>
                    </div>
            </div>
        )
    );
};

export default StudentAssignments;