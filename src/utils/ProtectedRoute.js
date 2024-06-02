import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({role, children}) => {
  const { token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.profile);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.accountType !== role) {
    return <Navigate to="*" replace />;
  }

  return children;
};

export default ProtectedRoute;
