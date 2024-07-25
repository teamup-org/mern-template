import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AIProfile from "./AIProfile";
import "./App.css";
import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import ContactPage from "./ContactPage";
import LoginPage from "./LoginPage";
import Profile from "./Profile";
import ProfileGallery from "./ProfileGallery";
import StudentViewPage from "./StudentViewPage";
import StudentAssignments from "./StudentAssignments";
import TeacherHomePage from "./TeacherHomePage";

const App: React.FC = () => {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/contact" element={<ContactPage />} />
          <Route path='/login' element={<LoginPage />} />
					<Route path="/teacher" element={<TeacherHomePage />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/profile-gallery" element={<ProfileGallery />} />
					<Route path="/ai-profile" element={<AIProfile />} />
					<Route path="/student" element={<StudentViewPage />} />
					<Route path="/student-assignments" element={<StudentAssignments />} />
					
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
