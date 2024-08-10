import React from 'react'
import './buscarTurno.css'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function buscarTurno() {
  return (
    
      <Container id='container' fluid>
        <Row>
          
          <Col id='col1' xs={2} >
              <Row id='row'>
                <h2 id='h2'>Turnos</h2>
              </Row>
              <Row>
                <a id="dropdownMenuButton" className="nav-link dropdown-toggle m-1" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Odontólogo</a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                  <li><a className="dropdown-item" href="#">Odontólogo 1</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Odontólogo 2</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Odontólogo 3</a></li>
                </ul>
                <p>Filtro 1</p>
                <p>Filtro 2</p>
                <p>Filtro 3</p>
                <p>Filtro 4</p>
                <p>Filtro 5</p>
                <p>Filtro 6</p>
                <p>Filtro 7</p>
                <p>Filtro 8</p>
                
              </Row>
            
          </Col>
          <Col id='col2' xs={8} >
            <Form>
              <Form.Control className='my-3'
                placeholder='Buscar turno'
                />
            </Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Duracion</th>
                  <th>Fecha de inicio</th>
                  <th>Paciente</th>
                  <th>Odontologo</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>30 minutos</td>
                  <td>10/08/2024</td>
                  <td>Tomas</td>
                  <td>Mariano</td>
                  <td>Completado</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
   

  )
}
 