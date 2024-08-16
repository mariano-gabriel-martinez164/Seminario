import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/CECQIcon.png'
import './login.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/verAgenda'); 
  };

return (
  <Container className="container">
    <Image src={Logo} Id="Image"/>
    <Form onSubmit={handleSubmit} className="bg">
      <FloatingLabel label= "Usuario..." className="mb-3 custom-floating-label" controlId="formBasicEmail">
        <Form.Control className="form-control-custom" placeholder="Usuario..." />
      </FloatingLabel>
      <FloatingLabel label= "Contraseña..." className="mb-3 " controlId="formBasicPassword">
        <Form.Control className="form-control-custom" type="password" placeholder="Contraseña..."/>
      </FloatingLabel>
      <Button variant="primary" type="submit" style={{ border: '2px solid blue'}}>
        Iniciar sesión
      </Button>
    </Form>
  </Container>
);
}
export default Login;