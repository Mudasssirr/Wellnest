import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import BrowserRoute from './config/routes';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRoute />
  </React.StrictMode>
);

reportWebVitals();
