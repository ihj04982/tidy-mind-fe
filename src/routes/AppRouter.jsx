import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute.jsx';
import AppLayout from '../layout/AppLayout.jsx';
import LoginPage from '../pages/AuthPage/LoginPage/LoginPage.jsx';
import RegisterPage from '../pages/AuthPage/RegisterPage/RegisterPage.jsx';
import CalendarPage from '../pages/CalendarPage/CalendarPage.jsx';
import CollectionPage from '../pages/CollectionPage/CollectionPage';
import LandingPage from '../pages/LandingPage.jsx';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<AppLayout />}>
        <Route index element={<LandingPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="collections" element={<CollectionPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
