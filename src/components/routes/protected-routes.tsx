import { useWorkspaceStore } from '@/store/workspaceStore';
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const {activeWorkspace} = useWorkspaceStore()
  console.log("===activeWorkspace", activeWorkspace)
  if (!activeWorkspace) {
    // If connectionUrl doesn't exist, redirect to /connect
    return <Navigate to={"/connect?next=" + location.pathname || "/modeller" } replace />;
  }

  // If connectionUrl exists, render the children (protected component)
  return <>{children}</>;
};

export default ProtectedRoute;
