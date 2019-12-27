import React from 'react';
import * as firebase from 'firebase';

class App extends React.Component {
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
        <header>
          <h1 className="text-white text-center p-3 text-3xl font-black tracking-wide">
            <span className="text-pink-500">FOTO</span>
            <span>BOOK</span>
          </h1>
        </header>
        <p className="text-white p-3 text-center">{this.state.body}</p>
      </div>
    );
  }
}

export default App;
