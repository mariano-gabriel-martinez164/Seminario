import { Container, Col, Row, Form, Button, Table, InputGroup, Alert } from 'react-bootstrap'
import './gestionarUsuario.css'
import { useEffect, useState } from 'react'
import { Eye, EyeSlash } from 'react-bootstrap-icons'; 
import { handleChange, handleSubmit } from './verificarFormulario'
import { apiUrl } from '../../Request/fetch.js';
import { token } from '../../Request/fetch.js';
import { ModalVerUsuario } from './modalVerUsuario';


export default function GestionarUsuario() {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [eliminado, setEliminado] = useState('');
  const [creado, setCreado] = useState(false);
  const [administrativos, setAdministrativos] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    apellido: '',
    cuil: '',
    contraseña: ''
  });

  useEffect(() => {
      console.log('creado');
      fetch(`${apiUrl}/auth/administrativos/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        })
        .then(response => response.json())
        .then(data => setAdministrativos(data)
      );
      setCreado(false);
      setEliminado('');
      }, [eliminado, creado]);

  const verContraseña = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container id='container' fluid>
      <Row>
        <Col id='col1' xs={2}>
          <Form noValidate validated={validated} onSubmit={(event) => handleSubmit(event, setValidated, formData)}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={(event) => handleChange(event, setFormData)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un nombre válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={(event) => handleChange(event, setFormData)}

              />
              <Form.Control.Feedback type="invalid">
                Por favor ingrese un apellido válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustom05">
              <Form.Label>Cuil</Form.Label>
              <Form.Control
                type="text"
                placeholder="Cuil"
                name="cuil"
                value={formData.cuil}
                onChange={(event) => handleChange(event, setFormData)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                required
                name="email"
                value={formData.email}
                onChange={(event) => handleChange(event, setFormData)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingrese un email válido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="validationCustomUsername">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  aria-describedby="inputGroupPrepend"
                  required
                  name="contraseña"
                  value={formData.contraseña}
                  onChange={(event) => handleChange(event, setFormData)}
                  isInvalid={formData.contraseña.length > 0 && formData.contraseña.length < 8}
                />
                <InputGroup.Text onClick={verContraseña} style={{ cursor: 'pointer' }}>
                  {showPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  La contraseña debe tener al menos 8 caracteres.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>


            <Button onClick={() => setCreado(true)} className='w-100' type="submit">Crear usuario</Button>
          </Form>
        </Col>
        <Col id='col2' xs={8}>
          {eliminado === 'eliminado' && <Alert variant='danger'>Usuario eliminado</Alert>}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Cuil</th>
                <th>Email</th>
                <th>Centro</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {administrativos.map((administrativo) => (
                <tr key={administrativo.id}>
                  <td>{administrativo.first_name}</td>
                  <td>{administrativo.last_name}</td>
                  <td>{administrativo.cuil}</td>
                  <td>{administrativo.email}</td>
                  <td>{administrativo.centro}</td>
                  <td>
                  <Button onClick={() => {
                      setModalShow(true);
                      setUsuarioSeleccionado(administrativo.id);
                    }} className='w-100' variant="primary"> Ver más...</Button>
                  </td>
                </tr>
              ))}
            </tbody>

          </Table>
          {modalShow && <ModalVerUsuario show={modalShow} onHide={() => setModalShow(false)} setEstadoModal={setEliminado} usuarioSeleccionado={usuarioSeleccionado}/>}
        </Col>
      </Row>
    </Container>
  )
}
