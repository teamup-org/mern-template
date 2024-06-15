import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './ProfileGallery.css';
import Header from './Header';
import Footer from './Footer';

const ProfileResult = () => {
  const { user } = useAuth0();
  return (
    user && (
      <div>
        <div className="box">
          <img src={user.picture} alt={user.name} />
          <div className="box-info">
            <div className="head colhead">{user.name}</div>
            <div className="box-row">
              <ul className="summary list-name nobullet">
                <li>Name</li>
                <li>Email</li>
                <li>Location</li>
                <li>Organization</li>
                <li>Website</li>
              </ul>
              <ul className="summary list-value nobullet">
                <li>{user.name}</li>
                <li>{user.email}</li>
                <li>Text</li>
                <li>Text</li>
                <li>Text</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const ProfileGallery = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&
    user && (
      <div className="container">
        <Header />
        <main className="main">
          <div className="filter">
            <h1>Filter</h1>
          </div>
          <div className="content">
            <div className="search">
              <h1>Search</h1>
            </div>
            <div className="gallery">
              <ProfileResult />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  );
};

export default ProfileGallery;
