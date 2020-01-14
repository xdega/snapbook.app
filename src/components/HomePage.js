import React from 'react';
import { AuthUserContext, withAuthorization } from './Session';
import HomeContent from './HomeContent';

const HomePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <div className="body-content">
          <HomeContent uid={authUser.uid} />
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
