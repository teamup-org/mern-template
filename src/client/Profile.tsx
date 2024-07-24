import { useAuth0 } from "@auth0/auth0-react";
import Header from "./Header";

const Profile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	// if (isLoading) {
	//   return <Navigate to="/" />;
	// }

	return (
		isAuthenticated &&
		user && (
			<div>
				<Header />
				<img src={user.picture} alt={user.name} />
				<h2>{user.name}</h2>
				<p>{user.email}</p>
			</div>
		)
	);
};

export default Profile;
