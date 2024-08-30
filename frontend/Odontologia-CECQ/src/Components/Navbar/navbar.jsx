import './navbar.css';
import img from '../../assets/CECQIcon.png';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/authContext';

export default function Navbar() {
  const { logout } = useAuth(); 

  const handleLogout = () => {
    logout(); 
    window.location.href = '/'; 
  };

  return (
    <>
      <header className="bg-dark text-white">
        <nav className="navbar">
          <div className="row container-fluid">
            <div className="col-1 d-flex align-items-center justify-content-start">
              <button className="btn btn-secondary me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div id='imgcecq' className="d-flex align-items-center">
                <img src={img} className="img-fluid" alt="..." id="img-icon-brand" />
                <a id="CECQ" href="#">CECQ</a>
              </div>
            </div>

           
            
            <div className="col-1 d-flex justify-content-end">
              <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-person-fill-down fs-3"></i></a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">Nombre:</a></li>
                <li><a className="dropdown-item" href="#">Apellido:</a></li>
                <li><a className="dropdown-item" href="#">Cambiar contraseña</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" onClick={handleLogout}>Cerrar sesión</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <aside>
        <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header">
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="nav">
              <li className="nav-item">
              <Link className="nav-link p-3 fs-5" to="/verAgenda">
                <i className="bi bi-calendar-date-fill"></i> Ver agenda
              </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-3 fs-5" to="/buscarTurno">
                  <i className="bi bi-calendar-check-fill"></i> Buscar turno
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-3 fs-5" to="/buscarPaciente">
                  <i className="bi bi-search"></i> Buscar paciente
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link p-3 fs-5" to="/facturaciones">
                  <i className="bi bi-file-earmark-text-fill"></i> Facturación
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
}



