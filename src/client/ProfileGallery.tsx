import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import './ProfileGallery.css';
import Header from './Header';
import Footer from './Footer';
// import auth from './constants';
const auth = {
  domain: 'dev-cabv17sajsvsytoj.us.auth0.com',
  client_id: '3QtlFcwJrplRcVzy3Y6dTVrtkr39MO7K',
};

const getMgmtAPIAccessToken = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: auth.client_id,
      client_secret: '{yourClientSecret}',
      audience: `https://${auth.domain}/api/v2/`,
    }),
  };

  useEffect(() => {
    fetch(`https://${auth.domain}/oauth/token`, options)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((response) => setResult(response.access_token))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { result, error, loading };
};

const userSearch = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    params: { sort: 'created_at:1', search_engine: 'v3' },
    headers: { authorization: 'Bearer {yourMgmtApiAccessToken}' },
  };

  useEffect(() => {
    fetch(`https://${auth.domain}/api/v2/users`, options)
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((response) => setResult(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { result, error, loading };
};

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
