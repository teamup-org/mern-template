import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import './AboutUs.css'; // Import your CSS file
import img1 from './images/computers-good.png';
import img2 from './images/courses-training.jpg';
import img3 from './images/who-we-are.png';

const AboutUs = () => {
  return (
    <div className="about-page">
      <Header />

      <main>
        <section className="intro-section">
          <h1>About Us</h1>
        </section>
        
        <section className="info-section">
          <div className="info-item">
            <div className="text-section left-align">
              <h2>Who we are</h2>
              <p>The Apps for Good program offers an online platform where college students can collaborate on software development projects that aim to create a positive social impact.</p>
              <p>By participating, students choose from diverse real-world challenges and are equipped with the necessary resources, mentorship, and support to turn their innovative ideas into fully functional applications ready for deployment.</p>
            </div>
            <img src={img1} alt="Who we are" className="info-image" />
          </div>
          <div className="info-item">
            <img src={img2} alt="Courses and Training" className="info-image" />
            <div className="text-section right-align">
              <h2>Courses and Training</h2>
              <p>Our specialized training courses provide students with the essential tools for careers in STEM. Through rigorous, short-term coding boot camps, participants gain the programming and software development skills necessary for the industry.</p>
              <p>These hands-on programs prioritize practical experience, ensuring that students quickly acquire the technical competencies needed to succeed in the professional world.</p>
            </div>
          </div>
          <div className="info-item">
            <div className="text-section left-align">
              <h2>Computers for Good</h2>
              <p>Computers for Good focuses on giving pre-owned computers a new purpose by refurbishing and integrating them into our computer science boot camps.</p>
              <p>By revitalizing these devices, we provide students with essential technology, helping them harness their potential and thrive in the digital era.</p>
            </div>
            <img src={img3} alt="Computers for Good" className="info-image" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
