import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { useFetchUser } from '../../Request/v2/fetchUser';

const ProtectedRoutes = ({ routes }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { admin } = useFetchUser();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      {routes.map(({ path, Component, adminOnly }) => (
        <Route
          key={path}
          path={path}
          element={
            isAuthenticated ? (
              adminOnly && !admin ? (
                <Navigate to="/verAgenda" />
              ) : (
                Component
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default ProtectedRoutes;


