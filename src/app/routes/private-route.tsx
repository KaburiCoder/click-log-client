import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute: FC = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
