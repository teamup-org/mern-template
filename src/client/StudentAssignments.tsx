import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import './StudentAssignments.css';
import StudentQuiz from './StudentQuiz';

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

    // Create function to handle get the assignment assigned by the teacher to the student
    // get document associated with the assignment
    // get questions associated with the document/assignment (quiz template in StudentQuiz component)

    return (
        isAuthenticated && user && (
            <div>
                <Header />
                <div className="assignments-container">
                    <div className="assignment">
                        <h2>Assignment Title</h2>
                        <p>Assignment Type</p>
                        {!isDocumentVisible && !isQuizVisible && (
                            <button className='start-button' onClick={handleStartAssignment}>Begin</button>
                        )}
                        {isDocumentVisible && !isQuizVisible && (
                            <div className="document">
                                <p>Assignment Document Content:</p>
                                <p>This is the content of the assignment that the student needs to read.</p>
                                <p>More details about the assignment go here...</p>
                            </div>
                        )}
                        {isDocumentVisible && (
                            <button className='start-button' onClick={handleStartQuiz}>Answer Questions</button>
                        )}
                        
                        {isQuizVisible && (
                            <StudentQuiz/>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default StudentAssignments;