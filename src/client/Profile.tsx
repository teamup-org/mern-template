import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./Profile.css";

const Profile = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && user && (
      <div className="view-profile">
        <header>
          <div className="logo">Logo</div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li>
                <button
                    className="nav-button button"
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        </header>
        <body>
          <div>Your Profile</div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </body>
      </div>
    )
  );
};

export default Profile;