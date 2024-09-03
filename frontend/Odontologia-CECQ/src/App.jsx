import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BuscarPaciente from './Components/BuscarPaciente/buscarPaciente';
import BuscarTurno from './Components/BuscarTurno/buscarTurno';
import Facturaciones from './Components/Facturaciones/facturaciones';
import VerAgenda from './Components/VerAgenda/verAgenda';
import Login from './Components/Login/login';
import HeaderLogin from './Components/HeaderLogin/headerLogin';
import { AuthProvider, useAuth } from './Components/Login/authContext';
import ProtectedRoutes from './Components/Login/ProtectedRoute';
import { useEffect } from 'react';

function App() {
  return (
    <AuthProvider>
      <Router>
        <RouteHandler />
      </Router>
    </AuthProvider>
  );
}

function RouteHandler() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (isLoginPage && isAuthenticated) {
      logout(); 
    }
  }, [isLoginPage, isAuthenticated, logout]);


  const protectedRoutes = [
    { path: '/verAgenda', Component: <VerAgenda /> },
    { path: '/buscarPaciente', Component: <BuscarPaciente /> },
    { path: '/buscarTurno', Component: <BuscarTurno /> },
    { path: '/facturaciones', Component: <Facturaciones /> },
  ];

  return (
    <div>
      {!isLoginPage && <Navbar />}
      {isLoginPage && <HeaderLogin />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<ProtectedRoutes routes={protectedRoutes} />} />
      </Routes>
    </div>
  );
}

export default App;
