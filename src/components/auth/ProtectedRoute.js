import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts';

/**
 * ProtectedRoute component that redirects to login if user is not authenticated
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render if authenticated
 * @param {boolean} [props.isAuthenticated] - Whether the user is authenticated (optional, will use context if not provided)
 * @returns {React.ReactNode} The protected route component
 */
const ProtectedRoute = ({ children, isAuthenticated: isAuthenticatedProp }) => {
  const location = useLocation();
  const { isAuthenticated: isAuthenticatedContext } = useAuth();
  
  // Use the prop if provided, otherwise use the context value
  const isAuthenticated = isAuthenticatedProp !== undefined ? isAuthenticatedProp : isAuthenticatedContext;

  if (!isAuthenticated) {
    // Redirect to login page but save the location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 