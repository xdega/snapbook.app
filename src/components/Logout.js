import React from 'react';

import { withFirebase } from './Firebase';

const LogoutLink = ({ firebase }) => (
  <button className="nav-link uppercase font-bold" type="button" onClick={firebase.doSignOut}>
    Log Out
  </button>
);

export default withFirebase(LogoutLink);
