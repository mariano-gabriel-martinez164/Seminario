import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar/navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BuscarPaciente from './Components/BuscarPaciente/buscarPaciente'
import BuscarTurno from './Components/BuscarTurno/buscarTurno'
import Facturaciones from './Components/Facturaciones/facturaciones'
import VerAgenda from './Components/VerAgenda/verAgenda'

// rfc: te hace la funcion automaticamente

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<VerAgenda/>}/>
        <Route path="/buscarPaciente" element={<BuscarPaciente/>}/>
        <Route path="/buscarTurno" element={<BuscarTurno/>}/>
        <Route path="/facturaciones" element={<Facturaciones/>}/>
      </Routes>
    </Router>
    
  )
}

export default App

