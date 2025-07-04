import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
 
import React from 'react'


const PrivateRoute = React.memo(({ children }:any) => {
  const { isAuthenticated,} = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Save the attempted location for redirecting after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
});

export default PrivateRoute;