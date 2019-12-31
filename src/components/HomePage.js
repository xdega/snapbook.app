import React from 'react';

import { AuthUserContext, withAuthorization } from './Session';

const HomePage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div>
        <p className="body-content w-1/3 rounded">Welcome Home, {authUser.email}</p>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
