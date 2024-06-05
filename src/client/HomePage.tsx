import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import './HomePage.css'; // Import the CSS file for styling

import sample1 from './images/sample1.png'; // Import image
import sample2 from './images/sample2.jpg'; // Import image

const HomePage = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className="home-page">
      <header>
        <div className="logo">YourLogo</div>
        <nav>
          <ul>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/about">About this product</Link></li>
            <li>
              {isAuthenticated ? (
                <button
                  className="nav-button button"
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                  Log Out
                </button>
              ) : (
                <button className="nav-button button" onClick={() => loginWithRedirect()}>
                  Log In
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>
      
      <main>
        <section className="hero">
          <h1>Being in the community</h1>
          <p>App for Good | Summer 2024</p>
          <button className="button">Learn More</button>
        </section>
        
        <section className="content">
          <div className="content-row">
            <div className="content-item">
              <img src={sample1} alt="Content 1" />
              <h2>We want to improve the world!</h2>
              <p>We want to explain more about our product.</p>
              <button className="button">Learn More</button>
            </div>
            <div className="content-item">
              <img src={sample2} alt="Content 2" />
              <h2>How App for good works?</h2>
              <p>Here is a part of the mission of App for good.</p>
              <button className="button">Learn More</button>
            </div>
          </div>
        </section>
        
        <section className="features">
          <h2>Main features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Share with others</h3>
              <p>Use this section to explain a benefit of your product.</p>
            </div>
            <div className="feature-item">
              <h3>Login</h3>
              <p>Use this section to explain a benefit of your product.</p>
            </div>
            <div className="feature-item">
              <h3>Easy to use</h3>
              <p>Use this section to explain a benefit of your product.</p>
            </div>
            <div className="feature-item">
              <h3>Avoid the hassle</h3>
              <p>Use this section to explain a benefit of your product.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer>
        <p>Learn more</p>
        <button className="button">Learn More</button>
      </footer>
      
      <Profile />
    </div>
  );
}

export default HomePage;
