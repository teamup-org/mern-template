import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import ProfileGallery from './ProfileGallery';
import Profile from './Profile';
import NotFoundPage from './NotFoundPage';
import AIProfile from './AIProfile';
import TeacherHomePage from './TeacherHomePage';
import StudentViewPage from './StudentViewPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TeacherHomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-gallery" element={<ProfileGallery />} />
          <Route path="/ai-profile" element={<AIProfile />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path='/student' element={<StudentViewPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
