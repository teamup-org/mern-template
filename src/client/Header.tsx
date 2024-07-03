import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';
import './Header.css';

import logo from './images/teamup-logo.png';

const Header = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="TeamUp Logo" className="logo-image" />
        </Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/about">About this product</Link></li>
          <li>{isAuthenticated ? (
              <Link to="/profile-gallery">Profile Gallery</Link>
            ) : (
              <Link to="#" onClick={() => loginWithRedirect()}>
                Profile Gallery
              </Link>
            )}
          </li>
          <li>{isAuthenticated ? (
              <Link to="/profile">Profile</Link>
            ) : (
              <Link to="#" onClick={() => loginWithRedirect()}>
                Profile
              </Link>
            )}
          </li>
          <li>
            {isAuthenticated ? (
              <>
                <button
                  className="nav-button button"
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                  Log Out
                </button>
              </>
            ) : (
              <Link to="#" onClick={() => loginWithRedirect()} className="nav-button">
                Log In
              </Link>
            )}
          </li>
          <Profile />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
