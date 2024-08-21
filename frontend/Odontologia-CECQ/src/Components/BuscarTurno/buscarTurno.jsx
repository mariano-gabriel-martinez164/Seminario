import './buscarTurno.css'
import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { CustomToggle, CustomMenu, CustomCalendarMenu, CustomOnlyMenu, CustomPacientes } from './Dropdown/Dropdown';
import { mostrarFiltros, mostrarFiltrosArray } from './MostrarFiltros/mostrarFiltros';
import { VerTurno } from './VerInfoTurno/verInfoTurno';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { useFetch } from '../Fetchs/fetchs';
import { handleSelect } from './HandleAndRemove/handleAndRemove';
import { Filtro } from './Filtros/filtros';

  export default function buscarTurno() {
    const [selectedPaciente, setSelectedPaciente] = useState({key: ''});
    const [selectedAgenda, setSelectedAgenda] = useState({key: ''});
    const [selectedEstado, setSelectedEstado] = useState([]);
    const [selectedOdontologo, setSelectedOdontologo] = useState({key: ''});
    const [selectedCentro, setSelectedCentro] = useState({key: ''});
    const [selectedSobreturno, setSelectedSobreturno] = useState(null);
    const [selectedAdministrativo, setSelectedAdministrativo] = useState({key: ''});
    const [modalShow, setModalShow] = useState(false);
    const [selectedTurno, setSelectedTurno] = useState({});
    const [turnos, setTurnos] = useState([]);
    const [value, setValue] = useState('');
    const [paciente, setPaciente] = useState([]);

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

    useEffect(() => {
    if(value){
    fetch(`http://127.0.0.1:8000/pacientes/?search=${value}`)
    .then((response) => response.json())
    .then((data) => {
        setPaciente(data.results);
    });
    } else {
      setPaciente([]);
    }  
  }, [value]);
  

    const estadosSeleccionados = selectedEstado.length > 0 ? selectedEstado.map((estado) => `&estado=${estado}`).join('') : '';
    const API_URL = `http://127.0.0.1:8000/turnos/?fecha_inicio=${formatDate(startDate)}&fecha_fin=${formatDate(endDate)}&id_odontologo=${selectedOdontologo.key}&id_centro=${selectedCentro.key}&id_agenda=${selectedAgenda.key}&id_administrativo=${selectedAdministrativo.key}&id_paciente=${selectedPaciente.key}${estadosSeleccionados}&sobreturno=${selectedSobreturno}`;
    useEffect(() => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          setTurnos(data);
        })
        .catch((error) => console.log(error));
    }, [startDate, endDate, selectedPaciente.key, selectedAgenda.key, selectedEstado, selectedCentro.key, selectedOdontologo.key, selectedSobreturno, selectedAdministrativo.key]);
    
  return (
  
    <Container id='container' fluid>
        <Row>
          <Col id='col1' xs={2} >
              <Row>
                <Dropdown>
                  <h6>Paciente</h6>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar paciente...
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomPacientes} valor={value} setValor={setValue} pacientes={paciente} setPacientes={setPaciente}>
                    {paciente.map((paciente) => (
                      <Dropdown.Item onClick = {() => setSelectedPaciente(
                      {   key: paciente.dni, 
                          nombre: paciente.nombre, 
                          apellido: paciente.apellido || null
                      })} 
                      key={paciente.dni} >{paciente.nombre} {paciente.apellido} </Dropdown.Item>))}
                  </Dropdown.Menu> 
                </Dropdown>
                <br /><br />
                {mostrarFiltros(selectedPaciente, setSelectedPaciente)}
                <br />

                <h6>Odontologo</h6>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar odontologo...
                  </Dropdown.Toggle>
                  <Filtro selectedItem={selectedOdontologo} setSelectedItem={setSelectedOdontologo} api_url={'http://127.0.0.1:8000/odontologos/'} itemKey={'matricula'} valor1={'nombre'} valor2={'apellido'}/>

                </Dropdown>
                <br />
                {mostrarFiltros(selectedOdontologo, setSelectedOdontologo)}
                <br />

                <h6>Centro</h6>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar centro...
                  </Dropdown.Toggle>
                  <Filtro selectedItem={selectedCentro} setSelectedItem={setSelectedCentro} api_url={'http://127.0.0.1:8000/centros/' } itemKey={'id'} valor1={'nombre'} valor2={''}/>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedCentro, setSelectedCentro)}
                <br />

                <h6>Administrativo</h6>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar administrativo...
                  </Dropdown.Toggle>
                  <Filtro selectedItem={selectedAdministrativo} setSelectedItem={setSelectedAdministrativo} api_url={'http://127.0.0.1:8000/auth/administrativos/' } itemKey={'id'} valor1={'first_name'} valor2={'last_name'}/>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedAdministrativo, setSelectedAdministrativo)}
                <br />

                <h6>Agenda</h6>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle}>
                    Seleccionar agenda...
                  </Dropdown.Toggle>
                  <Filtro selectedItem={selectedAgenda} setSelectedItem={setSelectedAgenda} api_url={'http://127.0.0.1:8000/agendas/' } itemKey={'id'} valor1={'id'} valor2={''}/>
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
                    <Dropdown.Item onClick={() => handleSelect(selectedEstado, setSelectedEstado, 'Disponible')} eventKey="1">Disponible</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect(selectedEstado, setSelectedEstado,'Asignado')} eventKey="2">Asignado</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect(selectedEstado, setSelectedEstado,'Cancelado')} eventKey="3">Cancelado</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect(selectedEstado, setSelectedEstado,'Realizado')} eventKey="4">Realizado</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltrosArray(selectedEstado, setSelectedEstado)}
                <br />
              
                <h6>Sobreturno</h6>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar...
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomOnlyMenu}>
                  <Dropdown.Item onClick={() => (setSelectedSobreturno(true))} eventKey="1">Si</Dropdown.Item>
                  <Dropdown.Item onClick={() => (setSelectedSobreturno(false))} eventKey="2">No</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <br />
                {mostrarFiltros(selectedSobreturno, setSelectedSobreturno)}
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
                    <td>{turno.paciente.nombre} {turno.paciente.apellido}</td>
                    <td>{turno.agenda}</td>
                    <td>{turno.estado}</td>
                    <td>
                      <Button variant="secondary" onClick={() => (setModalShow(true), setSelectedTurno(turno))}>
                        Ver más...
                      </Button>
                      <VerTurno show={modalShow} onHide={() => setModalShow(false)} turno={selectedTurno} />
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
