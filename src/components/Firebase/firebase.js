import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyAENkrr6mrpa9kXUimjaDWrjN8I4tdaT0Y",
  authDomain: "wf-fotobook.firebaseapp.com",
  databaseURL: "https://wf-fotobook.firebaseio.com",
  projectId: "wf-fotobook",
  storageBucket: "wf-fotobook.appspot.com",
  messagingSenderId: "1064630907676",
  appId: "1:1064630907676:web:531b9abefd1ba012dcc0d9"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }
  
  // Auth API interface
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
  
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => 
      this.auth.currentUser.updatePassword(password);

  // User API interface
  user = uid => this.db.ref('users/' + uid);
  users = () => this.db.ref('users');
  
  // Content API interface
  content = page => this.db.ref('content').child(page);

}

export default Firebase;
