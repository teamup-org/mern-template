import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import ProfileGallery from './ProfileGallery';
import Profile from './Profile';
import NotFoundPage from './NotFoundPage';
import AIProfile from './AIProfile';
import AboutUs from './AboutUs';
import PdfExtractor from './PdfExtractor';
import ProcessResume from './ProcessResume';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-gallery" element={<ProfileGallery />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/pdf-extractor" element={<PdfExtractor />} />
          <Route path="/process-resume" element={<ProcessResume />} />
          <Route path="/ai-profile" element={<AIProfile />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;