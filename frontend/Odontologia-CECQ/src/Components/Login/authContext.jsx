import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);


  const login = (newToken) => {
  setIsAuthenticated(true);
  setToken(newToken);
  localStorage.setItem('token', newToken);
  }
  const logout = () => {
  setIsAuthenticated(false);
  setToken(null);
  localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
