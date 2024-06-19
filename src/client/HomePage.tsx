import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import FileUpload from "./FileUpload";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page!</p>
      <Profile />
      <LoginButton />
      <LogoutButton />
      <FileUpload />
    </div>
  );
}

export default HomePage;