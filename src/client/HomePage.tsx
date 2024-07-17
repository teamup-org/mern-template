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
        <nav>
          <ul>
            <li>ReadWell</li>
            <li>ReCycle</li>
            <li>My Portfolio</li>
          </ul>
        </nav>
        <div className="logo">
          <img src={logo} alt="TeamUp Logo" className="logo-image" />  {/*Replace logo with respective team app logo*/}
        </div>
        <button className="nav-button">Menu</button>
      </header>
      
      <main>
        <section className="hero">
          <h1>Being in the Community</h1>
          <p>Apps for Good | Summer 2024</p>
          <button className="button">Start!</button>
        </section>
        
        <section className="content">
          <div className="content-item">
            <div className="text-container left-text">
              <h2>We want to improve the world</h2>
              <p>We want to explain more about our product</p>
              <button className="button">Learn More</button>
            </div>
            <img src={sample1} alt="Content 1" />
          </div>
          <div className="content-item">
            <img src={sample2} alt="Content 2" />
            <div className="text-container right-text">
              <h2>How Apps for Good works</h2>
              <p>This is a part of the universe of Apps for Good</p>
              <button className="button">Learn More</button>
            </div>
          </div>
        </section>
        
        <section className="features">
          <h2>Main Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Share with Others</h3>
              <p>...</p>
            </div>
            <div className="feature-item">
              <h3>Login</h3>
              <p>...</p>
            </div>
            <div className="feature-item">
              <h3>Ease of Use</h3>
              <p>...</p>
            </div>
            <div className="feature-item">
              <h3>Avoid the Hassle</h3>
              <p>...</p>
            </div>
          </div>
        </section>

        <section className="bottom">
          <h2>Learn more</h2>
          <p>How this works</p>
          <button className="button">Learn More</button>
        </section>
      </main>
      
      <footer className="home-footer">
        <div className="footer-container1">
          <p>ReadWell | ReCycle | My Portfolio</p>
          <div className="container-container">
            <div className="placeholder"></div>
            <div className="placeholder"></div>
            <div className="placeholder"></div>
            <div className="placeholder"></div>
          </div>
        </div>
        <div className="footer-container2">
          <Link to="/contact"><button className="button">Contact Us!</button></Link>
          <Link to="/login"><button className="button">Login</button></Link>
        </div>
      </footer>
      
      <Profile />
    </div>
  );
};

export default HomePage;
