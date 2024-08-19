import './buscarTurno.css'
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { CustomToggle, CustomMenu, CustomCalendarMenu, CustomOnlyMenu } from './Dropdown/Dropdown';
import { handleSelect, uniqueArray} from './HandleAndRemove/handleAndRemove';
import { mostrarFiltros } from './MostrarFiltros/mostrarFiltros';
import {verTurno} from './VerInfoTurno/verInfoTurno';
import Button from 'react-bootstrap/Button';


  export default function buscarTurno() {
    const [selectedPatient, setSelectedPatient] = useState([]);
    const [selectedAgenda, setSelectedAgenda] = useState([]);
    const [selectedState, setSelectedState] = useState([]);
    const [selectedStartTime, setSelectedStartTime] = useState([]);
    const [modalShow, setModalShow] = React.useState(false);
    const [turnos, setTurnos] = useState([]);
    const API_URL = 'http://127.0.0.1:8000/turnos/';
    
    useEffect(() => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          setTurnos(data);
        })
        .catch((error) => console.log(error));
    }, []);
    
  return (
  
    <Container id='container' fluid>
        <Row>
          <Col id='col1' xs={2} >
              <Row>
                <h6>Paciente</h6>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar paciente...
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu as={CustomMenu}>
                    {uniqueArray(turnos, 'paciente').map((turno) => (
                      <Dropdown.Item  onClick = {() => handleSelect(selectedPatient, setSelectedPatient, turno.paciente)} key={turno.id} >{turno.paciente}</Dropdown.Item>))}
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedPatient, setSelectedPatient)}
                <br />

                <h6>Agenda</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    Seleccionar agenda...
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu as={CustomMenu}>
                    {uniqueArray(turnos, 'agenda').map((turno) => (
                      <Dropdown.Item onClick = {() => handleSelect(selectedAgenda, setSelectedAgenda, turno.agenda)} key={turno.id} >{turno.agenda}</Dropdown.Item>))}
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedAgenda, setSelectedAgenda)}
                <br />

                <h6>Estado</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    Seleccionar estado...
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu as={CustomMenu}>
                    {uniqueArray(turnos, 'estado').map((turno) => (
                      <Dropdown.Item onClick = {() => handleSelect(selectedState, setSelectedState, turno.estado)} key={turno.id} >{turno.estado}</Dropdown.Item>))}
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedState, setSelectedState)}
                <br />
                
                <h6>Hora inicio</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    Seleccionar hora inicio...
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu as={CustomMenu}>
                    {uniqueArray(turnos, 'horaInicio').map((turno) => (
                      <Dropdown.Item onClick = {() => handleSelect(selectedStartTime, setSelectedStartTime, turno.horaInicio)} key={turno.id} >{turno.horaInicio}</Dropdown.Item>))}
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedStartTime, setSelectedStartTime)}
                <br />

                <h6>Rango de fechas</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    Seleccionar rango de fechas...
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomCalendarMenu}>
                    
                  </Dropdown.Menu>
                </Dropdown>
                </Row>
          </Col>
          <Col id='col2' xs={8} >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Hora inicio</th>
                  <th>Hora fin</th>
                  <th>Fecha</th>
                  <th>Paciente</th>
                  <th>Agenda</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {turnos.map((turno) => (
                  <tr key={turno.id}>
                    <td>{turno.horaInicio}</td>
                    <td>{turno.horaFin}</td>
                    <td>{turno.fecha}</td>
                    <td>{turno.paciente}</td>
                    <td>{turno.agenda}</td>
                    <td>{turno.estado}</td>
                    {/* <td>
                      <Button variant="secondary" onClick={() => setModalShow(true)}>
                        Ver más...
                      </Button>
                      {verTurno({ 
                        show: modalShow, 
                        onHide: () => setModalShow(false),
                        duration: `${Math.round((new Date(turno.horaFin) - new Date(turno.horaInicio)) / 60000)} minutos`, 
                        date: turno.fecha, 
                        patient: turno.paciente, 
                        dentist: turno.administrativo, 
                        state: turno.estado 
                      })}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
  

  )
}
