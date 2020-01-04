import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { withFirebase } from './Firebase'

const RegisterPage = () => (
  <div className="body-content">
    <RegisterForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwprdTwo: '',
  error: null
}

class RegisterFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();
    const { username, email, passwordOne } = this.state;
    
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email
          });
      })
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
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        {error && <p className="mb-3 p-3 bg-pink-500 w-3/4 mx-auto rounded">{error.message}</p>}
        <input
          className="block p-3 ml-auto mr-auto my-3 rounded w-3/4 text-gray-800"
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Your Name, eg. Joe Bloggs"
        />
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
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          className="block p-3 ml-auto mr-auto mb-3 rounded w-3/4 text-gray-800"
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button
          className="primary-button"
          disabled={isInvalid}
          type="submit"
        >Sign Up</button>
      </form>
    );
  }
}

const RegisterLink = () => (
  <p className="body-content w-full">
    {"Don't have an account? "}<Link className="text-pink-500" to={ROUTES.REGISTER}>Register</Link>
  </p>
);

const RegisterForm = withRouter(withFirebase(RegisterFormBase));

export default RegisterPage;
export { RegisterPage, RegisterLink}
