import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useConnectionStore } from '../store/connectionStore';
import { LANDING_ROUTE } from '@/constants';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { activeConnectionId } = useConnectionStore()
  if (!activeConnectionId) {
    // If connectionUrl doesn't exist, redirect to /connect
    return <Navigate to={"/connect?next=" + location.pathname || LANDING_ROUTE} replace />;
  }
  // If connectionUrl exists, render the children (protected component)
  return <>{children}</>;
};

export default ProtectedRoute;
