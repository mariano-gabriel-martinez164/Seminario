import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/CECQIcon.png';
import './login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useAuth } from './authContext';
import { Alert } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/gettoken/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json(); 
        const token = data.token
        login(token); 
        navigate('/verAgenda');
      } else {
        const errorMessage = 'Error de autenticación'; 
        setError(errorMessage); 
      }
    } catch (error) {
      setError('Error al realizar la solicitud');
    }
  };

  return (
    <Container className="container">
      <Image src={Logo} id="Image" />
      <Form onSubmit={handleSubmit} className="bg">
        <FloatingLabel label="Usuario..." className="mb-3 custom-floating-label" controlId="formBasicEmail">
          <Form.Control
            className="form-control-custom"
            placeholder="Usuario..."
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </FloatingLabel>
        <FloatingLabel label="Contraseña..." className="mb-3" controlId="formBasicPassword">
          <Form.Control
            className="form-control-custom"
            type="password"
            placeholder="Contraseña..."
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </FloatingLabel>
        <Button variant="primary" type="submit" style={{ border: '2px solid blue' }}>
          Iniciar sesión
        </Button>
        {error && <Alert variant="danger" className="custom-alert-margin">{error}</Alert>}
      </Form>
    </Container>
  );
}

export default Login;