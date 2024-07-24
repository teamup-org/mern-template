import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AIProfile from "./AIProfile";
import "./App.css";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import Profile from "./Profile";
import ProfileGallery from "./ProfileGallery";
import StudentViewPage from "./StudentViewPage";
import TeacherHomePage from "./TeacherHomePage";
import Document from './DocumentPage';

const App: React.FC = () => {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/teacher" element={<TeacherHomePage />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/profile-gallery" element={<ProfileGallery />} />
					<Route path="/ai-profile" element={<AIProfile />} />
					<Route path="*" element={<NotFoundPage />} />
					<Route path="/student" element={<StudentViewPage />} />
					<Route path="/document" element={<Document />} /> 
				</Routes>
			</div>
		</Router>
	);
};

export default App;
