// src/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If the user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/LoginForm" />;
  }

  // If user is authenticated, render the child component
  return children;
};

export default PrivateRoute;
