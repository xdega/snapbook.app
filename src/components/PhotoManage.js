import React, { Component } from 'react';
import { withFirebase } from './Firebase';

class PhotoManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null
    }
  }
  
  componentDidMount() {
    this.props.firebase.photos(this.props.uid)
      .on('value', (snap) => {
        if (snap.exists()) {
          const photosObject = snap.val();
          const photosList = Object.keys(photosObject).map(key => ({
            ...photosObject[key],
            pid: key
          }));
            
          this.setState({ 
            photos: photosList 
          });
        }
    });
  }

  render() {
    return (
      <div>
        <h2 className="page-subhead mb-3">Manage Photos</h2>
        { this.state.photos ? this.state.photos.map(item => <PhotoItem {...item} />) : <p className="text-left">You have no photos :( </p> }
      </div>
    );
  }
}

const PhotoItem = (props) => (
  <div>
    <img className="h-40 mt-3" src={props.url} alt={props.filename} />
  </div>
);

export default withFirebase(PhotoManage);
