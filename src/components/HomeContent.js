import React, { Component } from 'react';
import { withFirebase } from './Firebase';

class HomeContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      username: ''
    }
  }

  componentDidMount() {
    this.props.firebase.user(this.props.uid).on("value", (snap) => {
      const user = snap.val();
      this.setState({
        firstname: user.firstname,
        username: user.username
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.user(this.props.uid).off();
  }
  
  render() {
    return (
      <div>
        <h2 className="text-left page-subhead mb-3">{"Welcome Home, " + this.state.firstname}</h2>
        <p className="text-left">Your public profile is here: </p>
        <a className="text-left block text-pink-500" href={"/profile/" + this.state.username}>/photo/{this.state.username}</a>
      </div>
    );
  }
}

export default withFirebase(HomeContent);
