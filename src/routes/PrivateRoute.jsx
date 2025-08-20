import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const user = true; // 추후 변경
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
