import React from 'react';
import { Navigate } from 'react-router-dom';

export type ProtectedRouteProps = {
  isAvailable: boolean;
  fallbackPath: string;
  outlet: JSX.Element;
};

export default function ProtectedRoute({
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
