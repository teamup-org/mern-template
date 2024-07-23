import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import './StudentAssignments.css';

const StudentAssignments = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [isDocumentVisible, setDocumentVisible] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [isQuizVisible, setQuizVisible] = useState(false); // State for quiz visibility

    if (redirect) {
        return <Navigate to="/" replace={true} />;
    }

    // Early return if loading
    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleStartAssignment = () => {
        setDocumentVisible(true);
    };

    const handleStartQuiz = () => {
        setDocumentVisible(false); // Hide document
        setQuizVisible(true); // Show quiz
    };

    return (
        isAuthenticated && user && (
            <div>
                <Header />
                <div className="container">
                    <h1>Your Assignments</h1>
                    <div className="assignment">
                        <h2>Assignment Title</h2>
                        <p>Assignment Type</p>
                        {!isDocumentVisible && !isQuizVisible && (
                            <button onClick={handleStartAssignment}>Begin</button>
                        )}
                        {isDocumentVisible && !isQuizVisible && (
                            <div className="document">
                                <p>Assignment Document Content:</p>
                                <p>This is the content of the assignment that the student needs to read.</p>
                                <p>More details about the assignment go here...</p>
                            </div>
                        )}
                        {isDocumentVisible && (
                            <button onClick={handleStartQuiz}>Answer Questions</button>
                        )}
                        
                        {isQuizVisible && (
                            <div className="quiz">
                                <h3>Quiz Questions</h3>
                                <p>Current Question / Total Questions</p>

                                {/* Question 1 */}
                                {/* Add logic for answering questions */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default StudentAssignments;