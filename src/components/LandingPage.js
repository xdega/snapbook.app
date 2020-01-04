import React, { Component } from 'react';
import { withFirebase } from './Firebase';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: null
    }
  }

  componentDidMount() {
    this.props.firebase.content('home').on('value', snap => {
      this.setState({
        body: snap.val()
      });
    });
  }
  
  componentWillUnmount() {
    this.props.firebase.content('home').off();
  }

  render() {
    return (
      <div>
        <p className="body-content">{this.state.body}</p>
      </div>
    );
  }
}

export default withFirebase(LandingPage);
