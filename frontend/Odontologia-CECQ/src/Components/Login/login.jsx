import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/CECQIcon.png'
import './login.css'

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/verAgenda'); 
  };

return (
  <div className = "padre">
    <img src={Logo} className= "logocecq"/>
    <form onSubmit={handleSubmit}>
    <div className = "form">
        <input
          type="text"
          id="usuario"
          placeholder="Usuario..."
          required
          className="usuario"
        />
      <input
          type="password"
          id="contraseña"
          placeholder="Contraseña..."
          required
          className="contrasena"
        />
      <button type="submit" className="submit">
        Iniciar sesión
      </button>
     </div>
    </form>
  </div>
);
}
export default Login;