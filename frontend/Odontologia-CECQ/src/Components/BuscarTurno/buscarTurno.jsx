import './buscarTurno.css'
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { CustomToggle, CustomMenu, CustomCalendarMenu, CustomOnlyMenu } from './Dropdown/Dropdown';
import { mostrarFiltros, mostrarFiltrosArray } from './MostrarFiltros/mostrarFiltros';
import {verTurno} from './VerInfoTurno/verInfoTurno';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { useFetch } from '../Fetchs/fetchs';
import { handleSelect } from './HandleAndRemove/handleAndRemove';

  export default function buscarTurno() {
    const [selectedPatient, setSelectedPatient] = useState("");
    const [selectedAgenda, setSelectedAgenda] = useState("");
    const [selectedState, setSelectedState] = useState([]);
    const [selectedOdontologo, setSelectedOdontologo] = useState("");
    const [selectedCentro, setSelectedCentro] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [selectedTurno, setSelectedTurno] = useState({});
    const [turnos, setTurnos] = useState([]);
    const today = new Date();
    const monthLater = new Date();
    monthLater.setMonth(today.getMonth() + 1);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(monthLater);
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    const areDatesEqual = (date1, date2) => {
      return date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0];
    };
    const estadosSeleccionados = selectedState.length > 0 ? selectedState.map((estado) => `&estado=${estado}`).join('') : '';
    const API_URL = `http://127.0.0.1:8000/turnos/?fecha_inicio=${formatDate(startDate)}&fecha_fin=${formatDate(endDate)}&id_odontologo=${selectedOdontologo}&id_centro=${selectedCentro}&id_agenda=${selectedAgenda}&id_administrativo=&id_paciente=${selectedPatient}${estadosSeleccionados}&sobreturno=unknown`;
    
    useEffect(() => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          setTurnos(data);
        })
        .catch((error) => console.log(error));
    }, [startDate, endDate, selectedPatient, selectedAgenda, selectedState, selectedCentro, selectedOdontologo]);
    
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
                    {useFetch('http://127.0.0.1:8000/pacientes/').map((paciente) => (
                      <Dropdown.Item onClick = {() => (setSelectedPatient( paciente.dni))} key={paciente.dni} >{paciente.dni}</Dropdown.Item>))}
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedPatient, setSelectedPatient)}
                <br />

                <h6>Odontologo</h6>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar odontologo...
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomMenu}>
                    {useFetch('http://127.0.0.1:8000/odontologos/').map((odontologo) => (
                      <Dropdown.Item onClick = {() => (setSelectedOdontologo( odontologo.matricula))} key={odontologo.matricula} >{odontologo.matricula}</Dropdown.Item>))}
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedOdontologo, setSelectedOdontologo)}
                <br />

                <h6>Centro</h6>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar centro...
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomMenu}>
                    {useFetch('http://127.0.0.1:8000/centros/').map((centro) => (
                      <Dropdown.Item onClick = {() => (setSelectedCentro( centro.id))} key={centro.id} >{centro.id}</Dropdown.Item>))}
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedCentro, setSelectedCentro)}
                <br />

                <h6>Administrativo</h6>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar administrativo...
                  </Dropdown.Toggle>
                </Dropdown>
                <h6>Agenda</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    Seleccionar agenda...
                  </Dropdown.Toggle>
              
                  <Dropdown.Menu as={CustomMenu}>
                    {useFetch('http://127.0.0.1:8000/agendas/').map((agenda) => (
                      <Dropdown.Item onClick = {() => (setSelectedAgenda(agenda.id))} key={agenda.id} >{agenda.id}</Dropdown.Item>))}
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
              
                  <Dropdown.Menu as={CustomOnlyMenu}>
                    <Dropdown.Item onClick={() => handleSelect(selectedState, setSelectedState, 'Disponible')} eventKey="1">Disponible</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect(selectedState, setSelectedState,'Asignado')} eventKey="2">Asignado</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect(selectedState, setSelectedState,'Cancelado')} eventKey="3">Cancelado</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect(selectedState, setSelectedState,'Realizado')} eventKey="4">Realizado</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltrosArray(selectedState, setSelectedState)}
                <br />
              
                <h6>Rango de fechas</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    Seleccionar rango de fechas...
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomCalendarMenu} setStartDate={setStartDate} setEndDate={setEndDate} startDate={startDate} endDate={endDate}>
                    
                  </Dropdown.Menu>
                </Dropdown>
                <span className='bg-light rounded m-2'>
                  {formatDate(startDate)} - {formatDate(endDate)} 
                  {(!areDatesEqual(startDate, new Date()) || !areDatesEqual(endDate, monthLater)) &&
                  <CloseButton onClick={() => {setStartDate(new Date); setEndDate(monthLater)}}></CloseButton>
                }
                </span>
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
                  <th>Paciente apellido</th>
                  <th>Agenda</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {turnos.map((turno) => (
                  <tr key={turno.id || `${turno.paciente}-${turno.agenda}-${turno.fecha}`}>
                    <td>{turno.horaInicio}</td>
                    <td>{turno.horaFin}</td>
                    <td>{turno.fecha}</td>
                    <td>{turno.paciente.dni}</td>
                    <td>{turno.paciente.apellido}</td>
                    <td>{turno.agenda}</td>
                    <td>{turno.estado}</td>
                    <td>
                      <Button variant="secondary" onClick={() => (setModalShow(true), setSelectedTurno(turno))}>
                        Ver más...
                      </Button>
                      {verTurno( modalShow, () => setModalShow(false), selectedTurno)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
  

  )
}
