import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

const ProtectedRoutes = ({ routes }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={isAuthenticated ? Component : <Navigate to="/" />}
        />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ProtectedRoutes;


