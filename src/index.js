import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './Components/App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCD7jraQP4_YueCAxE9-C3q9cTsIzuEPIM",
    authDomain: "sidewalk-accessibility.firebaseapp.com",
    databaseURL: "https://sidewalk-accessibility.firebaseio.com",
    projectId: "sidewalk-accessibility",
    storageBucket: "sidewalk-accessibility.appspot.com",
    messagingSenderId: "244943859924",
    appId: "1:244943859924:web:7aa912106bfafa130e4b41",
    measurementId: "G-8JK3Y18VJC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
