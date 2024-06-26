import React from 'react';
import { Link, Navigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import './Profile.css';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <Navigate to="/" />;
  }

  return (
    isAuthenticated &&
    user && (
      <div>
        <Header />
        <div className="content">
          <div className="profile-container">
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
