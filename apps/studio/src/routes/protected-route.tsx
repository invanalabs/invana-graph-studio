import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useConnectionStore } from '../store/connectionStore';
import { LOCALSTORAGE_KEYS } from '../constants';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { activeConnection } = useConnectionStore(LOCALSTORAGE_KEYS.CONNECTION)
  console.log("===activeWorkspace", activeConnection)
  if (!activeConnection) {
    // If connectionUrl doesn't exist, redirect to /connect
    return <Navigate to={"/?next=" + location.pathname || "/graphbook"} replace />;
  }

  // If connectionUrl exists, render the children (protected component)
  return <>{children}</>;
};

export default ProtectedRoute;
