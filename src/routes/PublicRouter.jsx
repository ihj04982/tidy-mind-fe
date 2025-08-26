import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import LoadingPage from '../layout/LoadingPage.jsx';

const PublicRouter = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  if (isLoading) return <LoadingPage />;
  return user ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRouter;
