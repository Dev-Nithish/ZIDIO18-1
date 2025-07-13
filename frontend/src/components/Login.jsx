import React from 'react';
import { Navigate } from 'react-router-dom';

// This component redirects to the new auth selector
// Keep for backward compatibility
const Login = () => {
  return <Navigate to="/auth" replace />;
};

export default Login;