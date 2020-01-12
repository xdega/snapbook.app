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
  firstname: '',
  lastname: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  formErrors: {
    username: null,
    firstname: null,
    lastname: null,
    email: null
  },
  error: null
}

class RegisterFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }
  
  onSubmit = event => {
    event.preventDefault();
    const { username, firstname, lastname, email, passwordOne} = this.state;
    
    this.props.firebase.usernames().once('value', (snap) => {
      if(snap.hasChild(username)) {
        this.setState({
          error: {
            message: "This Username has already been taken"
          }
        });
      } else {
        this.setState({ error: null });
        this.props.firebase
          .doCreateUserWithEmailAndPassword(email, passwordOne)
          .then(authUser => {
            return (this.props.firebase
              .user(authUser.user.uid)
              .set({
                username,
                firstname,
                lastname,
                email
              })
            && this.props.firebase
               .usernames()
               .update({
                [username]: authUser.user.uid
              })
            );
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
      }
    });
  }

  onChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  onBlur = event => {
    //TODO: This is becoming a bit of a beast. A refactor later on would be ideal
    const { name, value } = event.target;
    switch (name) {
      case "username":
        if(/^[a-z]+[a-z0-9_]*$/.test(value)) {
          this.setState({
            formErrors: {
              username: null
            }
          });
          break;
        }
        
        this.setState({ 
          formErrors: {
            username: "Invalid Username (ex. 'user123', 'user_name')"
          }
        });    
      break;

      case "firstname":
        if(/^[a-z ,.'-]+$/i.test(value)) {
          this.setState({
            formErrors: {
              firstname: null
            }
          });
          break;
        }
        this.setState({ 
          formErrors: {
            firstname: "Invalid First Name (ex. 'John', 'Jane')"
          }
        });    
      break;

      case "lastname":
        if(/^[a-z ,.'-]+$/i.test(value)) {
          this.setState({
            formErrors: {
              lastname: null
            }
          });
          break;
        }
        
        this.setState({ 
          formErrors: {
            lastname: "Invalid Last Name (ex. 'Doe', 'Johnson')"
          }
        });    
      break;
      
      case "email":
        if(/^([\w-.+]+@([\w-.]+)+[\w-]{2,4})?$/.test(value)) {
          this.setState({
            formErrors: {
              email: null
            }
          });
          break;
        }
        
        this.setState({ 
          formErrors: {
            email: "Invalid Email Address (ex. 'user123@example.com')"
          }
        });    
      break;
      default:
        // Do Nothing
      break;
    }
  }

  render() {
    const {
      username,
      firstname,
      lastname,
      email,
      passwordOne,
      passwordTwo,
      error,
      formErrors
    } = this.state;

    const invalidPassword = passwordOne !== passwordTwo || passwordOne === '';
    const formHasErrors = !Object.values(formErrors).every(o => o === null);

    return (
      <form onSubmit={this.onSubmit}>
        {error && <p className="mb-3 p-3 bg-pink-500 w-3/4 mx-auto rounded">{error.message}</p>}
        
        <label htmlFor="username" className="text-gray-400 text-left mt-3 inline-block w-3/4 font-bold uppercase">
          Username
        </label>
        <input
          className="block p-3 mx-auto rounded w-3/4 text-gray-800"
          name="username"
          value={username}
          onChange={this.onChange}
          onBlur={this.onBlur}
          type="text"
          placeholder="username123"
        />
        { formErrors.username ? 
          <div className="mb-3 text-pink-500 text-left inline-block w-3/4">
            { formErrors.username }
          </div>
          :
          <div></div>
        }

        <label htmlFor="firstname" className="text-gray-400 text-left mt-3 inline-block w-3/4 font-bold uppercase">
          First Name
        </label>
        <input
          className="block p-3 mx-auto mb-3 rounded w-3/4 text-gray-800"
          name="firstname"
          value={firstname}
          onChange={this.onChange}
          onBlur={this.onBlur}
          type="text"
          placeholder="John"
        />
        { formErrors.firstname ? 
          <div className="mb-3 text-pink-500 text-left inline-block w-3/4">
            { formErrors.firstname }
          </div>
          :
          <div></div>
        }
        
        <label htmlFor="lastname" className="text-gray-400 text-left mt-3 inline-block w-3/4 font-bold uppercase">
          Last Name
        </label>
        <input
          className="block p-3 mx-auto mb-3 rounded w-3/4 text-gray-800"
          name="lastname"
          value={lastname}
          onChange={this.onChange}
          onBlur={this.onBlur}
          type="text"
          placeholder="Doe"
        />
        { formErrors.lastname ? 
          <div className="mb-3 text-pink-500 text-left inline-block w-3/4">
            { formErrors.lastname }
          </div>
          :
          <div></div>
        }
        
        <label htmlFor="email" className="text-gray-400 text-left inline-block w-3/4 font-bold uppercase">
          Email Address
        </label>
        <input
          className="block p-3 mx-auto mb-3 rounded w-3/4 text-gray-800"
          name="email"
          value={email}
          onChange={this.onChange}
          onBlur={this.onBlur}
          type="email"
          placeholder="name@example.com"
        />
        { formErrors.email ? 
          <div className="mb-3 text-pink-500 text-left inline-block w-3/4">
            { formErrors.email }
          </div>
          :
          <div></div>
        }
        
        <label htmlFor="passwordOne" className="text-gray-400 text-left inline-block w-3/4 font-bold uppercase">
          Password
        </label>
        <input
          className="block p-3 mx-auto mb-3 rounded w-3/4 text-gray-800"
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
        />
        <label htmlFor="passwordTwo" className="text-gray-400 text-left inline-block w-3/4 font-bold uppercase">
          Confirm Password
        </label>
        <input
          className="block p-3 mx-auto mb-3 rounded w-3/4 text-gray-800"
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
        />
        <button
          className="primary-button"
          disabled={ invalidPassword || formHasErrors }
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
