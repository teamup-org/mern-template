import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import Header from "./Header";
import './HomePage.css';

import sample1 from './images/sample1.png';
import sample2 from './images/sample2.jpg';
import logo from './images/teamup-logo.png';

const HomePage = () => {
  const { loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently, user } = useAuth0();

  const createUser = async (userInfo: any) => {
    try {
      const accessToken = await getAccessTokenSilently();
      console.log('Access Token:', accessToken);
  
      const response = await fetch('http://localhost:3000/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          description: 'No profile description',
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User created:', data);
      } else if (response.status === 409) {
        await updateUserTime(userInfo.email);
      } else {
        console.error('Error creating user:', response.status);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };
  
  const updateUserTime = async (email: string) => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch('http://localhost:3000/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email,
          time: new Date(),
        }),
      });
  
      if (response.ok) {
        console.log('User time updated');
      } else if (response.status === 404) {
        console.error('User not found');
      } else {
        console.error('Error updating user:', response.status);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  

  useEffect(() => {
    if (isAuthenticated && user) {
      createUser(user);
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  return (
    <div className="home-page">
      <header>
        <div className="logo">
          <img src={logo} alt="TeamUp Logo" className="logo-image" />  {/*Replace logo with respective team app logo*/}
        </div>
        <nav>
          <ul>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/about">About this product</Link></li>
            {isAuthenticated ? (
              <Header/>
            ) : (null)}
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
          <h1>Impact the world Together</h1>
          <p>Our passionate volunteers are the driving force behind our success.<br/>This dedicated team contributes 
            their time, talents, and energy across a wide range of areas to support our mission.</p>
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
              <h3>Share with Others</h3>
              <p>There is a profound joy found in sharing what has been achieved and accumulated with others and having a sense of 
                community and support being fostered.  It is incredibly fulfilling to know that something worked hard for can help someone 
                else succeed and find their own path to achievement. In this way, bridges are built, and the collective growth and success of 
                everyone around is contributed to.</p>
            </div>
            <div className="feature-item">
              <h3>Everything-in-One</h3>
              <p>You'll find everything you need in one place. From a wide range of products and services to comprehensive solutions, we’ve 
                got you covered. Save time, simplify your life, and enjoy the ease of all in one spot. Discover the convenience today!</p>
            </div>
            <div className="feature-item">
              <h3>Easy to Use</h3>
              <p>Discover the simplicity and convenience of our app, designed with you in mind. Whether you're a tech enthusiast or a novice, 
                our intuitive interface ensures a seamless experience for everyone. With straightforward navigation and user-friendly features, 
                you can effortlessly access everything you need. Say goodbye to complicated processes and hello to efficiency and ease.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer>
        <p>Learn more</p>
        <button className="button">Learn More</button>
      </footer>
      
      {/* <Profile /> */}
    </div>
  );
};

export default HomePage;
