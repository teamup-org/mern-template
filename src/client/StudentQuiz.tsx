import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './StudentQuiz.css';

interface AnswerOption {
    id: number;
    content: string;
    answer: boolean;
}

interface Question {
    content: string;
    answeroptions: AnswerOption[];
}

const StudentQuiz: React.FC = () => {
    const { user, isAuthenticated } = useAuth0();
    const [showResults, setShowResults] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<AnswerOption | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const [feedbackColor, setFeedbackColor] = useState<'correct' | 'incorrect'>('correct');

    const questions: Question[] = [
        {
            content: "What color is the sky?",
            answeroptions: [
                { id: 0, content: "Green", answer: false },
                { id: 1, content: "Blue", answer: true },
                { id: 2, content: "Pink", answer: false },
                { id: 3, content: "Purple", answer: false },
            ],
        },
        {
            content: "How many continents are on the planet?",
            answeroptions: [
                { id: 0, content: "4", answer: false },
                { id: 1, content: "5", answer: false },
                { id: 2, content: "6", answer: false },
                { id: 3, content: "7", answer: true },
            ],
        },
        {
            content: "What is the largest ocean on the planet?",
            answeroptions: [
                { id: 0, content: "Pacific", answer: true },
                { id: 1, content: "Atlantic", answer: false },
                { id: 2, content: "Indian", answer: false },
                { id: 3, content: "Arctic", answer: false },
            ],
        },
    ];

    const handleOptionClick = (id: number, answer: boolean) => {
        const selectedContent = questions[currentQuestion].answeroptions.find(option => option.id === id)?.content || '';
        setSelectedOption({ id, content: selectedContent, answer });
    };

    const handleSubmit = () => {
        setSubmitted(true);
        const correctOption = questions[currentQuestion].answeroptions.find(option => option.answer);
        if (selectedOption?.answer) {
            setScore(score + 1);
            setFeedbackMessage(`Correct, the answer is ${correctOption?.content}.`);
            setFeedbackColor('correct');
        } else {
            setFeedbackMessage(`Incorrect, the correct answer is ${correctOption?.content}.`);
            setFeedbackColor('incorrect');
        }
    };

    const handleNextQuestion = () => {
        setSubmitted(false);
        setFeedbackMessage('');
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
        setSelectedOption(null);
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
                        <p className="current-question">
                            {currentQuestion + 1}/{questions.length} Questions
                        </p>
                        <h2 className="question-content">{questions[currentQuestion].content}</h2>

                        <ul>
                            {questions[currentQuestion].answeroptions.map((option) => {
                                let className = 'quiz-options';
                                if (submitted) {
                                    if (option.answer) {
                                        className += ' correct';
                                    } else if (selectedOption && selectedOption.id === option.id) {
                                        className += ' incorrect';
                                    }
                                } else if (selectedOption && selectedOption.id === option.id) {
                                    className += ' selected';
                                }
                                return (
                                    <li
                                        className={className}
                                        key={option.id}
                                        onClick={() => !submitted && handleOptionClick(option.id, option.answer)}
                                    >
                                        {option.content}
                                    </li>
                                );
                            })}
                        </ul>
                        {selectedOption && !submitted && (
                            <button className='quiz-button' onClick={handleSubmit}>Submit</button>
                        )}
                        {submitted && (
                            <>
                                <p className={feedbackColor}>{feedbackMessage}</p>
                                <button className='quiz-button' onClick={handleNextQuestion}>Next Question</button>
                            </>
                        )}
                    </div>
                )}
            </div>
        )
    );
};

export default StudentQuiz;
