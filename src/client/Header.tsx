import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './Header.css';
// import logo from './images/teamup-logo.png';

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <header>
      {/* <div className="logo">
        <img src={logo} alt="TeamUp Logo" className="logo-image" />
      </div> */}
      <nav>
        <ul>
          <li>
            <Link to="/ai-profile">AI Profile</Link>
          </li>
          <li>
            <Link to="/profile-gallery">Profile Gallery</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button
              className="nav-button button"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
