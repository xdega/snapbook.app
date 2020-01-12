import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import PhotosPage from './components/PhotosPage';
import AdminPage from './components/AdminPage';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';

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
        <Route path={ROUTES.PHOTOS} component={PhotosPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path="/profile/:username" component={ProfilePage} />
        {/* TODO: Direct this empty profile below to 404 */}
        <Route exact path="/profile/" component={ProfilePage} />
      </div>
      <Footer />
    </div>
  </Router>
);

const Footer = () => (
    <footer className="flex justify-center text-gray-700 mb-2">Web Fresh &trade; | &copy; { new Date().getFullYear() } </footer>
);

export default withAuthentication(App);
