import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import "./ContactPage.css";
import "./HomePage.css";

import sample1 from "./images/sample1.png";
import sample2 from "./images/sample2.jpg";
import logo from "./images/teamup-logo.png";

const ContactPage = () => {
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
          <img src={logo} alt="TeamUp Logo" className="logo-image" />{" "}
          {/*Replace logo with respective team app logo*/}
        </div>
        <button className="nav-button">Menu</button>
      </header>

      <main>
        <div className="divide">
          <div className="left-half">
            <h1>Contact Us</h1>
            <p>If you have any questions, we are here</p>
            <form>
              <div className="names">
                <div className="name-container1">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="fname"
                    id="fname"
                    placeholder="Jane"
                  />
                </div>
                <div className="name-container2">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lname"
                    id="lname"
                    placeholder="Smith"
                  />
                </div>
              </div>
              <div className="email-container">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="email@email.com"
                />
              </div>
              <div className="email-container">
                <label>Your Message</label>
                <textarea name="msg" id="msg" rows={4} cols={50} placeholder="Enter your question or message here"></textarea>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
          <div>
            <img src={sample1} alt="Content 1" />
          </div>
        </div>
      </main>

      <footer className="contact-footer">
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
          <Link to="/">
            <button className="button">Home</button>
          </Link>
          <Link to="/login"><button className="button">Login</button></Link>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
