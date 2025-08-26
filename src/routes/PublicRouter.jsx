import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRouter = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRouter;
