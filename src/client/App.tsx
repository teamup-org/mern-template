import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import ProfileGallery from './ProfileGallery';
import Profile from './Profile';
import NotFoundPage from './NotFoundPage';
import AIProfile from './AIProfile';
import ContactPage from './ContactPage';
import LoginPage from './LoginPage';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-gallery" element={<ProfileGallery />} />
          <Route path="/ai-profile" element={<AIProfile />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
