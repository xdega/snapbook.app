import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

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
    this.store = app.storage();
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

  // Users DB API interface
  user = (uid) => this.db.ref('users/' + uid);
  users = () => this.db.ref('users');
  usernames = () => this.db.ref('usernames');

  userByUsername = (username) => 
    this.db.ref('users')
    .orderByChild('username')
    .equalTo(username);
 
  photos = (uid) => this.db.ref('users/' + uid + '/photos/');

  // Content API interface
  content = page => this.db.ref('content').child(page);

  // Storage API interface
  upload = (uid, file) => this.store.ref(uid + '/' + file.name).put(file);

  getFile = (uid, filename) => this.store.ref(uid).child(filename).getDownloadURL();

  fileRef = (uid, filename) => this.store.ref(uid).child(filename);

}

export default Firebase;
