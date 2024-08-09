import React from 'react';
import './navbar.css';
import img from '../../assets/CECQIcon.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <header className="bg-dark text-white">
        <nav className="navbar">
          <div className="row container-fluid">
            <div className="col-1 d-flex justify-content-center">
              <button className="btn btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="col-1 d-flex justify-content-end">
              <img src={img} className="img-fluid" alt="..." id="img-icon-brand" />
              <a id="CECQ" href="#">CECQ</a>
            </div>
            <div className="col-7">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Ingrese una fecha" aria-label="Search" />
                <button className="btn btn-outline-success btn-light" type="submit">Buscar</button>
              </form>
            </div>
            <div className="col-1 d-flex justify-content-end dropdown">
              <a id="dropdownMenuButton" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Odontólogo</a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                <li><a className="dropdown-item" href="#">Odontólogo 1</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Odontólogo 2</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Odontólogo 3</a></li>
              </ul>
            </div>
            <div className="col-1 d-flex justify-content-center">
              <a className="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="bi bi-person-fill-down fs-3"></i></a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">Nombre:</a></li>
                <li><a className="dropdown-item" href="#">Apellido:</a></li>
                <li><a className="dropdown-item" href="#">Cambiar contraseña</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Cerrar sesión</a></li>
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
              <Link className="nav-link p-3 fs-5" to="/">
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



