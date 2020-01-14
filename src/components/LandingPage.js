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
      <div className="body-content"
        dangerouslySetInnerHTML={{
          __html: this.state.body
        }}
        >
      </div>
    );
  }
}

export default withFirebase(LandingPage);
