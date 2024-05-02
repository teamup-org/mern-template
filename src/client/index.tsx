import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => <div>Hello from React and TypeScript!</div>;

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!); // The '!' non-null assertion operator is used if you are sure that the element exists.
root.render(<App />);