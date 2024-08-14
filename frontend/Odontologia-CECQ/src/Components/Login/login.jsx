import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/CECQIcon.png'
import './login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/verAgenda'); 
  };

return (
  <Container className="container">
    <Image src={Logo} Id="Image"/>
    <Form onSubmit={handleSubmit} className="form-overlay">
      <Form.Group className="mb-4" controlId="formBasicEmail">
        <Form.Control className="form-control-custom" placeholder="Usuario..." />
      </Form.Group>
      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Control className="form-control-custom" type="password" placeholder="Contraseña..."/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Iniciar sesión
      </Button>
    </Form>
  </Container>
);
}
export default Login;