import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

const HomePage = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page!</p>
      
      {isAuthenticated ? (
        <li><Link to="/profile">View Your Profile</Link></li>
      ) : (null)}

      {isAuthenticated ? (
        <LogoutButton />
      ) : (<LoginButton />)}
    </div>
  );
}

export default HomePage;