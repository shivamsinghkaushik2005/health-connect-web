import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/auth" replace />;
  }
  
  // Render children if authenticated
  return children;
};

export default PrivateRoute; 