import './buscarTurno.css'
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { CustomToggle, CustomMenu, CustomCalendarMenu, CustomOnlyMenu } from './Dropdown/Dropdown';
import { handleSelect} from './HandleAndRemove/handleAndRemove';
import { mostrarFiltros } from './MostrarFiltros/mostrarFiltros';
import {verTurno} from './VerInfoTurno/verInfoTurno';
  
  export default function buscarTurno() {
    const [selectedPatient, setSelectedPatient] = useState([]);
    const [selectedDentist, setSelectedDentist] = useState([]);
    const [selectedState, setSelectedState] = useState([]);
    const [selectedDuration, setSelectedDuration] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
  return (
  
    <Container id='container' fluid>
        <Row>
          
          <Col id='col1' xs={2} >
              <Row id='row'>
                <h2 id='h2'>Turnos</h2>
              </Row>
              <Row>
                <h6>Paciente</h6>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar paciente...
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu as={CustomMenu}>
                    <Dropdown.Item onClick = {() => handleSelect(selectedPatient, setSelectedPatient, 'Mariano')} eventKey="1">Mariano</Dropdown.Item>
                    <Dropdown.Item onClick = {() => handleSelect(selectedPatient, setSelectedPatient, 'Tomas')} eventKey="2">Tomas</Dropdown.Item>
                    <Dropdown.Item onClick = {() => handleSelect(selectedPatient, setSelectedPatient, 'Juan')} eventKey="3">Juan</Dropdown.Item>
                    <Dropdown.Item onClick = {() => handleSelect(selectedPatient, setSelectedPatient, 'Santi')} eventKey="1">Santi</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedPatient, setSelectedPatient)}
                <br />

                <h6>Odontologo</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    Seleccionar odontologo...
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu as={CustomMenu}>
                    <Dropdown.Item onClick={() => handleSelect(selectedDentist, setSelectedDentist, 'Mariano')} eventKey="1">Mariano</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect(selectedDentist, setSelectedDentist,'Tomas')} eventKey="2">Tomas</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect(selectedDentist, setSelectedDentist,'Juan')} eventKey="3">Juan</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect(selectedDentist, setSelectedDentist,'Santi')} eventKey="1">Santi</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedDentist, setSelectedDentist)}
                <br />

                <h6>Estado</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    Seleccionar estado...
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu as={CustomOnlyMenu}>
                    <Dropdown.Item onClick={() => handleSelect(selectedState, setSelectedState,'Completado')} eventKey="1">Completado</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect(selectedState, setSelectedState,'Pendiente')} eventKey="2">Pendiente</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedState, setSelectedState)}
                <br />
                
                <h6>Duracion</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    Seleccionar duracion...
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu as={CustomOnlyMenu}>
                    <Dropdown.Item onClick={() => handleSelect(selectedDuration, setSelectedDuration,'15 Minutos')} eventKey="1">15 minutos</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect(selectedDuration, setSelectedDuration,'30 minutos')} eventKey="2">30 minutos</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect(selectedDuration, setSelectedDuration,'45 minutos')} eventKey="3">45 minutos</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect(selectedDuration, setSelectedDuration,'60 minutos')} eventKey="4">60 minutos</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedDuration, setSelectedDuration)}
                <br />

                <h6>Rango de fechas</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    Seleccionar rango de fechas...
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomCalendarMenu}></Dropdown.Menu>
                </Dropdown>
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>30 minutos</td>
                  <td>10/08/2024</td>
                  <td>Tomas</td>
                  <td>Mariano</td>
                  <td>Completado</td>
                  <td>    
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                      Launch vertically centered modal
                    </Button>
              
                    <verTurno
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
  

  )
}
