import React, { useState } from 'react';
import processResume from '../utils/process'; // Import the processResume function
import Header from './Header';
import Footer from './Footer';
import './ProcessResume.css';

type Result = {
  keyword: string;
  occurrences: number;
};

const ProcessResume: React.FC = () => {
  const [resumeText, setResumeText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<Result[] | null>(null);

  const handleSubmit = async () => {
    try {
      const results = processResume(resumeText);
      setAnalysisResult(results);
    } catch (error) {
      console.error('Error processing resume:', error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Process Resume</h1>
      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste resume text here"
      />
      <button onClick={handleSubmit}>Analyze</button>
      {analysisResult && (
        <div>
          <h2>Analysis Result</h2>
          <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProcessResume;