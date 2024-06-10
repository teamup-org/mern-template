import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Profile.css';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  //isAuthenticated && user &&
  return (
    isAuthenticated &&
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

export default Profile;
