import React, { Component } from 'react';
import * as firebase from 'firebase';
//import { withFirebase } from '../Firebase';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      body: null
    }
  }

  componentDidMount() {
    const rootRef = firebase.database().ref();
    const bodyRef = rootRef.child('content').child('home');
    bodyRef.on('value', snap => {
      this.setState({
        body: snap.val()
      });
    });
  }

  render() {
    return (
      <div>
        <p className="body-content w-1/3 rounded">{this.state.body}</p>
      </div>
    );
  }
}

export default LandingPage;
