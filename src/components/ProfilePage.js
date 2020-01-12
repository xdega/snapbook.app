import React, { Component } from 'react';
import { withFirebase } from './Firebase';

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        photos: [],
        username: this.props.match.params.username,
        firstname: '',
        lastname: ''
    }
  }
  
  componentDidMount() {
    this.props.firebase.userByUsername(this.state.username)
      .on('value', snap => {
        const user = snap.val()
        if(user) {
          // This is getting the first object from the snap. Seems a bit hacky.
          const userPhotos = user[Object.keys(user)[0]].photos;
          const photosList = Object.keys(userPhotos).map(key => ({
            ...userPhotos[key],
            pid: key
          }));
          this.setState({
            photos: photosList,
            firstname: user[Object.keys(user)[0]].firstname,
            lastname: user[Object.keys(user)[0]].lastname
          });
        }
      });
  }

  render() {
    return (
      <div className="body-content">
        <h2 className="page-subhead mb-3">{this.state.firstname} {this.state.lastname}</h2>
        {this.state.photos ? this.state.photos.map(item => <ProfileItem {...item} key={item.pid} />) : <p> No Photos </p>}
      </div>
    );
  }
}

const ProfileItem = (props) => (
  <img className="h-40 m-1 rounded inline-block" src={props.url} alt={props.filename}/>
);


export default withFirebase(ProfilePage);
