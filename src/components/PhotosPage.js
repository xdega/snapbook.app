import React from 'react';
import { AuthUserContext, withAuthorization } from './Session';
import PhotoUpload from './PhotoUpload';
import PhotoManage from './PhotoManage';

const PhotosPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <div className="body-content">
          <PhotoUpload uid={authUser.uid} />
        </div>
        <div className="body-content mt-3">
          <PhotoManage uid={authUser.uid} />
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(PhotosPage);
