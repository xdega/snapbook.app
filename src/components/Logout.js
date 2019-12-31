import React from 'react';

import { withFirebase } from './Firebase';

const LogoutLink = ({ firebase }) => (
  <button className="uppercase font-bold" type="button" onClick={firebase.doSignOut}>
    Log Out
  </button>
);

export default withFirebase(LogoutLink);
