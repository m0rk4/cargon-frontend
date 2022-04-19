import React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  isAvailable: boolean;
  fallbackPath: string;
  outlet: JSX.Element;
};

function ProtectedRoute({
  isAvailable,
  fallbackPath,
  outlet,
}: ProtectedRouteProps) {
  if (isAvailable) {
    return outlet;
  } else {
    return <Navigate to={{ pathname: fallbackPath }} replace />;
  }
}

export default ProtectedRoute;
