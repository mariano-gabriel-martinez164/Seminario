import './buscarTurno.css'
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { CustomToggle, CustomCalendarMenu, CustomOnlyMenu, CustomPacientes } from './DropdownCustom/DropdownCustom';
import { mostrarFiltros, mostrarFiltrosArray } from './MostrarFiltros/mostrarFiltros';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import { handleSelect } from './HandleAndRemove/handleAndRemove';
import { Filtro } from './Filtros/filtros';
import { Alert } from 'react-bootstrap';
import { VerSobreturno }  from './Sobreturno/sobreturno';
import { useFetchArray } from '../Hooks/fetch';
import { ModalRealizado } from './CrudTurno/modalRealizado';
import { ModalDisponible } from './CrudTurno/modalDisponible';
import { ModalCancelado } from './CrudTurno/modalCancelado';
import { ModalAsignado } from './CrudTurno/modalAsignado';

  export default function BuscarTurno() {
    const [selectedPaciente, setSelectedPaciente] = useState({key: ''});
    const [selectedAgenda, setSelectedAgenda] = useState({key: ''});
    const [selectedEstado, setSelectedEstado] = useState([]);
    const [selectedOdontologo, setSelectedOdontologo] = useState({key: ''});
    const [selectedCentro, setSelectedCentro] = useState({key: ''});
    const [selectedSobreturno, setSelectedSobreturno] = useState(null);
    const [selectedAdministrativo, setSelectedAdministrativo] = useState({key: ''});
    const [modalShow, setModalShow] = useState(false);
    const [selectedTurno, setSelectedTurno] = useState('');
    const [turnos, setTurnos] = useState([]);
    const [value, setValue] = useState('');
    const [estadoModal, setEstadoModal] = useState('');
    const [selectedTurnoTemplate, setSelectedTurnoTemplate] = useState({});
    const [modalSobreturnoShow, setModalSobreturnoShow] = useState(false);
    const [estado, setEstado] = useState('');

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

    const paciente = useFetchArray(`http://127.0.0.1:8000/pacientes/?search=${value}`);

    const estadosSeleccionados = selectedEstado.length > 0 ? selectedEstado.map((estado) => `&estado=${estado}`).join('') : '';
    const API_URL = `http://127.0.0.1:8000/turnos/?fecha_inicio=${formatDate(startDate)}&fecha_fin=${formatDate(endDate)}&id_odontologo=${selectedOdontologo.key}&id_centro=${selectedCentro.key}&id_agenda=${selectedAgenda.key}&id_administrativo=${selectedAdministrativo.key}&id_paciente=${selectedPaciente.key}${estadosSeleccionados}&sobreturno=${selectedSobreturno}`;
    useEffect(() => {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          setTurnos(data);
        })
        .catch((error) => console.log(error));
    }, [API_URL, estadoModal]);
    
  return (
    <Container id='container' fluid>
        <Row>
          <Col id='col1' xs={2} >
              <Row>
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
                <br />

                <h6>Paciente</h6>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar paciente...
                  </Dropdown.Toggle>

                  <Dropdown.Menu as={CustomPacientes} valor={value} setValor={setValue}>
                    {paciente.map((paciente) => (
                      <Dropdown.Item onClick = {() => setSelectedPaciente(
                      {   key: paciente.dni, 
                          nombre: paciente.nombre, 
                          apellido: paciente.apellido
                      })} 
                      key={paciente.dni}>{paciente.nombre} {paciente.apellido} {paciente.dni ? '': ''}</Dropdown.Item>))}
                  </Dropdown.Menu> 
                </Dropdown>
                <br />
                {mostrarFiltros(selectedPaciente, setSelectedPaciente)}
                <br />

                <h6>Odontologo</h6>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar odontologo...
                  </Dropdown.Toggle>
                  <Filtro setSelectedItem={setSelectedOdontologo} api_url={'http://127.0.0.1:8000/odontologos/'} itemKey={'matricula'} valor1={'nombre'} valor2={'apellido'}/>

                </Dropdown>
                <br />
                {mostrarFiltros(selectedOdontologo, setSelectedOdontologo)}
                <br />

                <h6>Centro</h6>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                    Seleccionar centro...
                  </Dropdown.Toggle>
                  <Filtro setSelectedItem={setSelectedCentro} api_url={'http://127.0.0.1:8000/centros/' } itemKey={'id'} valor1={'nombre'} valor2={''}/>
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
                </Row>
                <br />
                <Button className='w-100' variant="primary" onClick={() => {setModalSobreturnoShow(true);}}>Crear sobreturno</Button>
                {modalSobreturnoShow && <VerSobreturno show={modalSobreturnoShow} onHide={() => setModalSobreturnoShow(false)} setEstadoModal={setEstadoModal}/>}
          </Col>
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
