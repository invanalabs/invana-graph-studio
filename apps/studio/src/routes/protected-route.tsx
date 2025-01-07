import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useConnectionStore } from '../store/connectionStore';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { activeConnection } = useConnectionStore()
  console.log("===activeWorkspace", activeConnection)
  if (!activeConnection) {
    // If connectionUrl doesn't exist, redirect to /connect
    return <Navigate to={"/connect?next=" + location.pathname || "/graphbook"} replace />;
  }

  // If connectionUrl exists, render the children (protected component)
  return <>{children}</>;
};

export default ProtectedRoute;
