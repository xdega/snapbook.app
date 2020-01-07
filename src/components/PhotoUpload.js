import React, { Component } from 'react';
import { withFirebase } from './Firebase';

class PhotoUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: null, 
      url: '',
      progress: 0
    }
  
    this.handleChange = this
      .handleChange
      .bind(this);

    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      const img = e.target.files[0];
      this.setState({img});
    }
  }

  photoToDB(url, filename) {
    return this.props.firebase
      .user(this.props.uid)
      .child('photos')
      .push({
        score: 0,
        title: '',
        description: '',
        timestamp: Date.now(),
        url,
        filename
      })
  }

  handleUpload = () => {
    if (this.state.img == null) return;
      
    const uploadTask = this.props.firebase.upload(this.props.uid, this.state.img);

    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);  
      this.setState({progress});
    },
    (error) => {
      console.log(error);
    },
    () => {
      const file = this.props.firebase.getFile(this.props.uid, this.state.img.name);
      const filename = this.state.img.name;
      file.then( url => {
        this.setState({url});
        this.photoToDB(url, filename);
      });

      this.refs.file.value = null;
      this.setState({
        img: null,
        progress: 0
      });
    });
  }
 
  render() {
    return (
      <div>
        <h2 className="page-subhead mb-3">Upload a Photo</h2>
        <input ref="file" type="file" onChange={this.handleChange} className="text-left block mb-3" />
        { this.state.progress === 0 
          ? <button onClick={this.handleUpload} className="primary-button-mini text-left block">Upload</button>  
          : <ProgressButton progress={this.state.progress} /> 
        }
      </div>
    );
  }
}

const ProgressButton = (props) => (
  <button disabled className="text-xs p-2 uppercase py-1 bg-pink-700 rounded text-left block">{ props.progress }%</button>
);

export default withFirebase(PhotoUpload);
