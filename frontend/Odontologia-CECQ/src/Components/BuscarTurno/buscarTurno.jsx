import './buscarTurno.css'
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { CustomToggle, CustomOnlyMenu } from './DropdownCustom/DropdownCustom';
import { mostrarFiltros, mostrarFiltrosArray } from './MostrarFiltros/mostrarFiltros';
import Button from 'react-bootstrap/Button';
import { handleSelect } from './HandleAndRemove/handleAndRemove';
import { Alert } from 'react-bootstrap';
import { VerSobreturno }  from './Sobreturno/sobreturno';
import { ModalRealizado } from './CrudTurno/modalRealizado';
import { ModalDisponible } from './CrudTurno/modalDisponible';
import { ModalCancelado } from './CrudTurno/modalCancelado';
import { ModalAsignado } from './CrudTurno/modalAsignado';
import { token } from '../../Request/fetch.js';
import { apiUrl } from '../../Request/fetch.js';

import { SelectorOdontologo, SelectorCentro, SelectorAdministrativo, SelectorAgenda, SelectorPaciente, SelectorRangoDeFechas } from './Filtros/filtros';
import { useDatesState } from './Filtros/hooks.js';

  export default function BuscarTurno() {

    const [modalShow, setModalShow] = useState(false);
    const [selectedTurno, setSelectedTurno] = useState('');
    const [turnos, setTurnos] = useState([]);
    const [estadoModal, setEstadoModal] = useState('');
    const [selectedTurnoTemplate, setSelectedTurnoTemplate] = useState({});
    const [modalSobreturnoShow, setModalSobreturnoShow] = useState(false);
    const [estado, setEstado] = useState('');


  return (
    <Container id='container' fluid>
        <Row>
          <MenuFiltros turnos={turnos} setTurnos={setTurnos} estadoModal={estadoModal}>
                <Button className='w-100' variant="primary" onClick={() => {setModalSobreturnoShow(true);}}>Crear sobreturno</Button>
                {modalSobreturnoShow && <VerSobreturno show={modalSobreturnoShow} onHide={() => setModalSobreturnoShow(false)} setEstadoModal={setEstadoModal}/>}
          </MenuFiltros>
          <Col id='col2' xs={8} >
          {estadoModal === 'Disponible' && <Alert variant='info' dismissible >Turno {estadoModal}</Alert>}
          {estadoModal === 'Asignado' && <Alert variant='warning' dismissible >Turno {estadoModal}</Alert>}
          {estadoModal === 'Cancelado' && <Alert variant='danger' dismissible >Turno {estadoModal}</Alert>}
          {estadoModal === 'Realizado' && <Alert variant='success' dismissible >Turno {estadoModal}</Alert>}
          {estadoModal === 'Sobreturno asignado' && <Alert variant='warning' dismissible >Sobreturno asignado</Alert>}

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Hora inicio</th>
                  <th>Hora fin</th>
                  <th>Paciente</th>
                  <th>Agenda</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {turnos.map((turno) => (
                  <tr key={turno.id || `${turno.paciente}-${turno.agenda}-${turno.fecha}`}>
                    <td>{turno.fecha}</td>
                    <td>{turno.horaInicio}</td>
                    <td>{turno.horaFin}</td>
                    <td>{turno.paciente?.nombre} {turno.paciente?.apellido}</td>
                    <td>{turno.agenda}</td>
                    {turno.estado === 'Realizado' ? <td className='bg-success bg-opacity-50 rounded'>{turno.estado}</td> :
                    turno.estado === 'Cancelado' ? <td className='bg-danger bg-opacity-50 rounded'>{turno.estado}</td> :
                    turno.estado === 'Asignado' ? <td className='bg-warning bg-opacity-50 rounded'>{turno.estado}</td> :
                    turno.estado === 'Disponible' ? <td className='bg-info bg-opacity-50 rounded'>{turno.estado}</td> :
                    <td>{turno.estado}</td>}
                    
                    <td>
                    <Button className='w-100' variant="primary" onClick={() => {
                      setModalShow(true);
                      if (turno.id !== null) {
                        setSelectedTurno(turno.id);
                        setSelectedTurnoTemplate({});
                        setEstado(turno.estado);
                      } else {
                        setSelectedTurnoTemplate(turno);
                        setSelectedTurno('');
                        setEstado(turno.estado);
                      }
                    }}>
                      Ver más...</Button>

                    </td>
                  </tr>
                ))}
              </tbody>

                {estado === 'Disponible' && modalShow ? ( 
                  <ModalDisponible show={modalShow} onHide={() => setModalShow(false)} turnoTemplate={selectedTurnoTemplate} setEstadoModal={setEstadoModal}/>
                ) : null}

                {estado === 'Realizado' && modalShow ? (
                  <ModalRealizado show={modalShow} onHide={() => setModalShow(false)} turnoClick={selectedTurno} />
                ) : null}

                {estado === 'Cancelado' && modalShow ? (
                  <ModalCancelado show={modalShow} onHide={() => setModalShow(false)} turnoClick={selectedTurno} turnoTemplate={selectedTurnoTemplate} setEstadoModal={setEstadoModal} />
                ) : null}

                {estado === 'Asignado' && modalShow ? (
                  <ModalAsignado show={modalShow} onHide={() => setModalShow(false)} turnoClick={selectedTurno} setEstadoModal={setEstadoModal} />
                ) : null}

            </Table>
          </Col>
        </Row>
      </Container>
  

  )
}


function MenuFiltros({ children, setTurnos, estadoModal }) {
  const [selectedPaciente, setSelectedPaciente] = useState({key: ''});
  const [selectedAgenda, setSelectedAgenda] = useState({key: ''});
  const [selectedOdontologo, setSelectedOdontologo] = useState({key: ''});
  const [selectedCentro, setSelectedCentro] = useState({key: ''});
  const [selectedAdministrativo, setSelectedAdministrativo] = useState({key: ''});

  const [selectedEstado, setSelectedEstado] = useState([]);
  const [selectedSobreturno, setSelectedSobreturno] = useState(null);

  const formatDate = (date) => date.toISOString().split('T')[0];
  const [startDate, setStartDate, endDate, setEndDate] = useDatesState();

  const estadosSeleccionados = selectedEstado.length > 0 ? selectedEstado.map((estado) => `&estado=${estado}`).join('') : '';
  const API_URL = `${apiUrl}/turnos/?fecha_inicio=${formatDate(startDate)}&fecha_fin=${formatDate(endDate)}&id_odontologo=${selectedOdontologo.key}&id_centro=${selectedCentro.key}&id_agenda=${selectedAgenda.key}&id_administrativo=${selectedAdministrativo.key}&id_paciente=${selectedPaciente.key}${estadosSeleccionados}&sobreturno=${selectedSobreturno}`;
  useEffect(() => {
    fetch(API_URL,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setTurnos(data);
      })
      .catch((error) => console.log(error));
  }, [API_URL, estadoModal, setTurnos]);
  
  return (
    <Col id='col1' xs={2} >
    <Row>
    <h6>Rango de fechas</h6>
      <SelectorRangoDeFechas
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate} 
      />
      <br />

      <h6>Paciente</h6>
      <SelectorPaciente selectedItem={selectedPaciente} setSelectedItem={setSelectedPaciente}/>
      <br />

      <h6>Odontologo</h6>
      <SelectorOdontologo selectedItem={selectedOdontologo} setSelectedItem={setSelectedOdontologo} />
      <br />

      <h6>Centro</h6>
      <SelectorCentro selectedItem={selectedCentro} setSelectedItem={setSelectedCentro}/>
      <br />

      <h6>Administrativo</h6>
      <SelectorAdministrativo selectedItem={selectedAdministrativo} setSelectedItem={setSelectedAdministrativo}/>
      <br />

      <h6>Agenda</h6>
      <SelectorAgenda selectedItem={selectedAgenda} setSelectedItem={setSelectedAgenda}/>
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
      </Row>
      <br />
      {children}
      <br />
      <br />
</Col>
  )




}