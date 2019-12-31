import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { RegisterLink } from './RegisterPage';
import { withFirebase } from './Firebase';
import * as ROUTES from '../constants/routes';

const LoginPage = () => (
  <div className="body-content sm:w-2/4 md:w-3/4 lg:w-3/5">
    <h1 className="text-xl uppercase mb-6">Log In</h1>
    <LoginForm />
    <RegisterLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class LoginFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    
    event.preventDefault();

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const {
      email,
      password,
      error
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        {error && <p className="mb-3 p-3 bg-pink-500 w-3/4 mx-auto rounded">{error.message}</p>}
        <input
          className="block p-3 ml-auto mr-auto mb-3 rounded w-3/4 text-gray-800"
          name="email"
          value={email}
          onChange={this.onChange}
          type="email"
          placeholder="Your Email, eg. name@example.com"
        />
        <input
          className="block p-3 ml-auto mr-auto mb-3 rounded w-3/4 text-gray-800"
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button
          className="p-4 uppercase py-2 bg-pink-500 rounded"
          disabled={isInvalid}
          type="submit"
        >Log In</button>
      </form>
    );
  }
}

const LoginForm = withRouter(withFirebase(LoginFormBase));

export default LoginPage;
export { LoginForm };
