import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AIProfile from "./AIProfile";
import "./App.css";
import ContactPage from "./ContactPage";
import Document from "./DocumentPage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import Profile from "./Profile";
import ProfileGallery from "./ProfileGallery";
import StudentAssignments from "./StudentAssignments";
import StudentViewPage from "./StudentViewPage";
import TeacherHomePage from "./TeacherHomePage";

const App: React.FC = () => {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/teacher" element={<TeacherHomePage />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/profile-gallery" element={<ProfileGallery />} />
					<Route path="/ai-profile" element={<AIProfile />} />
					<Route path="/student" element={<StudentViewPage />} />
					<Route path="/student-assignments" element={<StudentAssignments />} />

					<Route path="*" element={<NotFoundPage />} />
					<Route path="/document" element={<Document />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
