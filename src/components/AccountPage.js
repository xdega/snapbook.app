import React from 'react';
import { withAuthorization } from './Session';

const AccountPage = () => (
  <div>
    <p className="body-content w-1/3 rounded">Account Settings</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
