import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!); // The '!' non-null assertion operator is used if you are sure that the element exists.
root.render(<App />);