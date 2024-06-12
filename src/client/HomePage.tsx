import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import './HomePage.css';

import sample1 from './images/sample1.png';
import sample2 from './images/sample2.jpg';
import logo from './images/teamup-logo.png';

const HomePage = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className="home-page">
      <header>
        <div className="logo">
          <img src={logo} alt="TeamUp Logo" className="logo-image" />
        </div>
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
          <h1>Impact The World Together</h1>
          <p>Apps for Good | Summer 2024</p>
          <button className="button">Learn More</button>
        </section>
        
        <section className="content">
          <div className="content-item">
            <div className="text-container left-text">
              <h2>Product #1</h2>
              <p>Here we will explain more about our first product from Team Up.</p>
              <button className="button">Learn More</button>
            </div>
            <img src={sample1} alt="Content 1" />
          </div>
          <div className="content-item">
            <img src={sample2} alt="Content 2" />
            <div className="text-container right-text">
              <h2>Product #2</h2>
              <p>Here we will explain more about our second product from Team Up.</p>
              <button className="button">Learn More</button>
            </div>
          </div>
        </section>
        
        <section className="features">
          <h2>Team Up With Us</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Create</h3>
              <p>Work on technology projects tailored to address real-world issues.</p>
            </div>
            <div className="feature-item">
              <h3>Serve</h3>
              <p>Enhance the lives of others through software development and gain the opportunity to take on real-world projects.</p>
            </div>
            <div className="feature-item">
              <h3>Collaborate</h3>
              <p>Meet other like-minded students and learn to collaborate through the software development process.</p>
            </div>
            <div className="feature-item">
              <h3>Support</h3>
              <p>Learn how to use project management tools, cloud computing resources, and hardware from our industry professionals.</p>
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
