import React from 'react';
import { NavLink } from 'react-router-dom';

import LogoutLink from './Logout';
import * as ROUTES from '../constants/routes';
import { AuthUserContext } from './Session';

const Navigation = () => (
  <div>
    <header>
      <h1 className="text-blue-100 text-center p-3 text-3xl font-black tracking-wide">
        <span className="text-pink-500">FOTO</span>
        <span>BOOK</span>
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
  <ul className="text-white text-center uppercase font-bold mb-3">
    <li className="inline-block">
      <NavLink activeClassName="text-pink-500" to={ROUTES.HOME}>Home</NavLink>
    </li>
    <li className="ml-3 inline-block">
      <NavLink activeClassName="text-pink-500" to={ROUTES.ACCOUNT}>Account</NavLink>
    </li>
    <li className="ml-3 inline-block">
      <LogoutLink />
    </li>
  </ul>
);

const NavigationNoauth = () => (
  <ul className="text-white text-center uppercase font-bold mb-3">
    <li className="ml-3 inline-block">
      <NavLink activeClassName="text-pink-500" className="block text-white" to={ROUTES.LOGIN}>Log In</NavLink>
    </li>
  </ul>
);

export default Navigation;
