import React, { createContext, useContext, useState, useEffect } from 'react';
import { googleSignOut } from './googleAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authMethod, setAuthMethod] = useState(null); // 'traditional' | 'google'
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedAuthMethod = localStorage.getItem('authMethod');
    const storedUserInfo = localStorage.getItem('userInfo');
    
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setAuthMethod(storedAuthMethod || 'traditional');
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      }
    }
    setIsLoading(false); 
  }, []);

  const login = (newToken, method = 'traditional', userData = null) => {
    setIsAuthenticated(true);
    setToken(newToken);
    setAuthMethod(method);
    setUserInfo(userData);
    
    localStorage.setItem('token', newToken);
    localStorage.setItem('authMethod', method);
    if (userData) {
      localStorage.setItem('userInfo', JSON.stringify(userData));
    }
  };

  const logout = async () => {
    // Si es login con Google, también cerrar sesión de Google
    if (authMethod === 'google') {
      await googleSignOut();
    }
    
    setIsAuthenticated(false);
    setToken(null);
    setAuthMethod(null);
    setUserInfo(null);
    
    localStorage.removeItem('token');
    localStorage.removeItem('authMethod');
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      login, 
      logout, 
      authMethod, 
      userInfo,
      token 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);