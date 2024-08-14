import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom'
import Navbar from './Components/Navbar/navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BuscarPaciente from './Components/BuscarPaciente/buscarPaciente'
import BuscarTurno from './Components/BuscarTurno/buscarTurno'
import Facturaciones from './Components/Facturaciones/facturaciones'
import VerAgenda from './Components/VerAgenda/verAgenda'
import Login from './Components/Login/login'
import HeaderLogin from './Components/HeaderLogin/headerLogin'


// rfc: te hace la funcion automaticamente

function App() {
  return (
    <Router>
      <RouteHandler />
    </Router>
  );
}

function RouteHandler() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div>
      {!isLoginPage && <Navbar />}
      {isLoginPage && <HeaderLogin/>}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verAgenda" element={<VerAgenda />} />
        <Route path="/buscarPaciente" element={<BuscarPaciente />} />
        <Route path="/buscarTurno" element={<BuscarTurno />} />
        <Route path="/facturaciones" element={<Facturaciones />} />
      </Routes>
    </div>
  );
}


export default App;
