import React from 'react';
import { NavLink } from 'react-router-dom';

import LogoutLink from './Logout';
import * as ROUTES from '../constants/routes';
import { AuthUserContext } from './Session';

const Navigation = () => (
  <div>
    <header>
      <h1 className="text-center p-3 text-3xl font-black tracking-wide">
        <NavLink to={ROUTES.LANDING}>
          <span className="text-pink-500 mr-1">SNAP</span>
          <span className="text-blue-100">BOOK</span>
        </NavLink>
      </h1>
    </header>
    <nav>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <NavigationAuth /> : <NavigationNoauth />
        }
      </AuthUserContext.Consumer>
    </nav>
  </div>
);

const NavigationAuth = () => (
  <ul className="nav-menu">
    <li className="inline-block">
      <NavLink activeClassName="text-pink-500" className="nav-link" to={ROUTES.HOME}>Home</NavLink>
    </li>
    <li className="ml-3 inline-block">
      <NavLink activeClassName="text-pink-500" className="nav-link" to={ROUTES.PHOTOS}>My Photos</NavLink>
    </li>
    <li className="ml-3 inline-block">
      <LogoutLink />
    </li>
  </ul>
);

const NavigationNoauth = () => (
  <ul className="nav-menu">
    <li className="ml-3 inline-block">
      <NavLink activeClassName="text-pink-500" className="nav-link" to={ROUTES.LOGIN}>Log In</NavLink>
    </li>
    <li className="ml-3 inline-block">
      <NavLink activeClassName="text-pink-500" className="nav-link" to={ROUTES.REGISTER}>Register</NavLink>
    </li>
  </ul>
);

export default Navigation;
