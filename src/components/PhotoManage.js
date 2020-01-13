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
        } else {
          // if no snap, then there are no photos
          this.setState({
            photos: null
          });
        }
    });
  }
  
  comonentWillUnmount() {
    this.props.firebase.photos(this.props.uid).off();
  }

  deletePhoto = (uid, filename, key) => {
    this.props.firebase.fileRef(uid, filename).delete().then(() => {
      this.props.firebase.photos(uid).child(key).remove().then(() => {
        console.log("Photo Removed!");
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h2 className="page-subhead mb-3">Manage Photos</h2>
        { this.state.photos ? this.state.photos.map(item => <PhotoItem {...item} uid={this.props.uid} deletePhoto={this.deletePhoto} key={item.pid}/>) : <p className="text-left">You have no photos :( </p> }
      </div>
    );
  }
}

const PhotoItem = (props) => (
  <div>
    <img className="h-40 mt-3" src={props.url} alt={props.filename} />
    <button onClick={ () => props.deletePhoto(props.uid, props.filename, props.pid) } className="primary-button-mini block mt-1 mb-5">Delete Photo</button>
  </div>
);

export default withFirebase(PhotoManage);
