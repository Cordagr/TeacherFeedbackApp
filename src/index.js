import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'; // Use the new React 18 DOM method
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create the root for React 18

root.render(
  <StrictMode>
    <ColorModeScript />
    <Router>
      <App />
    </Router>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
