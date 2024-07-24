import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import './StudentQuiz.css';

const StudentQuiz = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [showResults, setShowResults] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        {
            content: "What color is the sky?",
            answeroptions: [
                { id: 0, content: "Green", answer: 'false' },
                { id: 1, content: "Blue", answer: 'true' },
                { id: 2, content: "Pink", answer: 'false' },
                { id: 3, content: "Purple", answer: 'false' },
            ],
        },
        {
            content: "How many continents on the planet?",
            answeroptions: [
                { id: 0, content: "4", answer: 'false' },
                { id: 1, content: "5", answer: 'false' },
                { id: 2, content: "6", answer: 'false' },
                { id: 3, content: "7", answer: 'true' },
            ],
        },
        {
            content: "What is the largest ocean on the planet?",
            answeroptions: [
                { id: 0, content: "Pacific", answer: 'true' },
                { id: 1, content: "Atlantic", answer: 'false' },
                { id: 2, content: "Indian", answer: 'false' },
                { id: 3, content: "Arctic", answer: 'false' },
            ],
        },
    ];

    const optionClicked = (answer: string) => {
        if (answer == 'true') {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    return (
        isAuthenticated && user && (
            <div className='question-box'>

                {showResults ? (
                    <div className="final-results">
                        <h1>Questions Complete!</h1>
                        <h2>
                            You answered {score}/{questions.length} correctly.
                        </h2>
                    </div>
                ) : (
                    <div className="question-box">
                        <h1>Assignment Quiz</h1>

                        <p>Score: {score}</p>
                        <h2>
                            {currentQuestion + 1}/{questions.length} Questions
                        </h2>
                        <h3 className="question-content">{questions[currentQuestion].content}</h3>

                        <ul>
                            {questions[currentQuestion].answeroptions.map((option) => {
                                return (
                                    <li
                                        key={option.id}
                                        onClick={() => optionClicked(option.answer)}
                                    >
                                        {option.content}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        )
    );
};

export default StudentQuiz;