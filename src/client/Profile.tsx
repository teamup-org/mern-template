import React, { useState, useEffect } from 'react';
import { Link, Navigate } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import './Profile.css';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [profileDescription, setProfileDescription] = useState('');

  if (isLoading) {
    return <Navigate to="/" />;
  }

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleSaveDescription = async () => {
    console.log('handleSaveDescription called');
    try {
      if (isAuthenticated && user) {
        const response = await fetch('http://localhost:3000/api/profiledescription', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email, profileDescription }),
        });
  
        if (response.ok) {
          console.log('Profile description updated successfully');
          setIsEditingDescription(false);

          // Update the user's time
        await fetch('http://localhost:3000/api/users/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: user.email,
            time: new Date(),
          }),
        });

        console.log('User time updated');
        } else {
          console.error('Error updating profile description');
        }
      } else {
        console.error('User is undefined');
      }
    } catch (error) {
      console.error('Error updating profile description:', error);
    }
  };   

  const handleCancelEdit = () => {
    setIsEditingDescription(false);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfileDescription(event.target.value);
  };

  useEffect(() => {
    const fetchProfileDescription = async () => {
      try {
        if (isAuthenticated && user) {
          const response = await fetch(`http://localhost:3000/api/profiledescription?email=${user.email}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            const { description } = await response.json();
            setProfileDescription(description);
          } else {
            console.error('Error fetching profile description:', await response.json());
          }
        } else {
          console.error('User object is undefined');
        }
      } catch (error) {
        console.error('Error fetching profile description:', error);
      }
    };
  
    fetchProfileDescription();
  }, [isAuthenticated, user]);  

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
            {isEditingDescription ? (
              <div>
                <textarea
                  value={profileDescription}
                  onChange={handleDescriptionChange}
                  rows={5}
                  cols={40}
                />
                <button onClick={handleSaveDescription}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>Profile Description:</p>
                <p>{profileDescription || 'No description available'}</p>
                <button onClick={handleEditDescription}>Edit Description</button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
