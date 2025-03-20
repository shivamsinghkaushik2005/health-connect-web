import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
  if (!user) {
    // Redirect to auth page if not logged in
    return <Navigate to="/auth" replace />;
  }

  // If logged in, render the protected component
  return children;
};

export default PrivateRoute; 