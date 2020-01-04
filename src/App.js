import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import AccountPage from './components/AccountPage';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';

import * as ROUTES from './constants/routes';
import { withAuthentication } from './components/Session';

const App = () => (
  <Router>
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-grow">
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.REGISTER} component={RegisterPage} />
        <Route path={ROUTES.LOGIN} component={LoginPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotPasswordPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </div>
      <Footer />
    </div>
  </Router>
);

const Footer = () => (
    <footer className="flex justify-center text-gray-700">Web Fresh &trade; | &copy; { new Date().getFullYear() } </footer>
);

export default withAuthentication(App);
