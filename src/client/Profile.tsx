import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated &&
    user && (
      <div className="profile-image-container">
        <Link to="/profile-gallery">  {/* Wrap the image with Link */}
          <img src={user.picture} alt={user.name} className="profile-image" />
        </Link>
      </div>
    )
  );
};

export default Profile;
