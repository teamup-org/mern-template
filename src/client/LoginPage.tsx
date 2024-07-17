import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import "./HomePage.css";

import logo from "./images/teamup-logo.png";

const LoginPage = () => {
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

      <main className="login-screen">
        <h2>Create an Account</h2>
        <p>enter your email to Sign up</p>
        <form className="login-form">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email@email.com"
          />
          <button type="submit" className="login-button">Sign up</button>
        </form>
        <div className="line">
          <p>or continue with</p>
        </div>
        <button className="google-button">Google</button>
        <p className="disclaimer">
          By clicking continue, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </main>

      <footer className="login-footer">
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
          <Link to="/contact">
            <button className="button">Contact Us!</button>
          </Link>
          <Link to="/">
            <button className="button">Home</button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
