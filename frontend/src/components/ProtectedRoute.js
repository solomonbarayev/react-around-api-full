import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Loader from './Loader';

const ProtectedRoute = ({ loggedIn, children, isCheckingToken, ...props }) => {
  return isCheckingToken ? (
    <Loader />
  ) : loggedIn ? (
    <Route {...props}>{children}</Route>
  ) : (
    <Redirect to="/signin" />
  );
};

export default ProtectedRoute;
