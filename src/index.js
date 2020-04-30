import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App'
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyA68UadJUznSAWeMBTr2WrlwXHXfjy29H0",
  authDomain: "fotogram-55208.firebaseapp.com",
  databaseURL: "https://fotogram-55208.firebaseio.com",
  projectId: "fotogram-55208",
  storageBucket: "fotogram-55208.appspot.com",
  messagingSenderId: "364590719247",
  appId: "1:364590719247:web:482013c740f9b0eaf3de7a"
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


