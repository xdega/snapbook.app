import React from 'react';
import ReactDOM from 'react-dom';
import "./styles.css"
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyAENkrr6mrpa9kXUimjaDWrjN8I4tdaT0Y",
  authDomain: "wf-fotobook.firebaseapp.com",
  databaseURL: "https://wf-fotobook.firebaseio.com",
  projectId: "wf-fotobook",
  storageBucket: "wf-fotobook.appspot.com",
  messagingSenderId: "1064630907676",
  appId: "1:1064630907676:web:531b9abefd1ba012dcc0d9"
};

firebase.initializeApp(firebaseConfig);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
