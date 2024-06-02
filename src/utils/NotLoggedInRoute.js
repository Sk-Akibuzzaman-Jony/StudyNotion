import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotLoggedInRoute = ({ redirectPath = '/dashboard/my-profile' }) => {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default NotLoggedInRoute;
