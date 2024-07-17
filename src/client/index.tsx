import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!); // The '!' non-null assertion operator is used if you are sure that the element exists.
root.render(  <Auth0Provider
    domain="dev-cabv17sajsvsytoj.us.auth0.com"
    clientId="3QtlFcwJrplRcVzy3Y6dTVrtkr39MO7K"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation="localstorage"
  >
    <App />
  </Auth0Provider>);