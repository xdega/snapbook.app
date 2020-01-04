import React from 'react';

import { AuthUserContext, withAuthorization } from './Session';

const HomePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <p className="body-content">Welcome Home, {authUser.email}</p>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
