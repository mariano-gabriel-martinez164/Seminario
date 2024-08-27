import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomToggle, CustomMenu, CustomCalendarMenu, CustomOnlyMenu, CustomPacientes } from '../Dropdown/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import './verInfoTurno.css';
import { useEffect, useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Alert } from 'react-bootstrap';
import MapaPiezas from './mapaPiezas';


export function VerTurno({show, onHide, turnoClick, setTurnoClick, turnoTemplate ,setEstadoModal, estadoModal}) {
  const [turno, setTurno] = useState({});
  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedPaciente, setSelectedPaciente] = useState({key: ''});
  const [paciente, setPaciente] = useState([]);
  const [value, setValue] = useState('');
  const [agendaDetails, setAgendaDetails] = useState({});
  const [piezasDentales, setPiezasDentales] = useState([]);
  
  const mapaPiezas = [
    [[55,51], [61,65]],
    [[18,11], [21,28]],
    [[48,41], [31,38]],
    [[85,81], [71,75]]
  ]

  const turnoTemplateAsignado = {
    "dni": selectedPaciente.key,
    "fecha": turnoTemplate.fecha,
    "horaInicio": turnoTemplate.horaInicio,
    "horaFin": turnoTemplate.horaFin,
    "esSobreturno": turnoTemplate.esSobreturno,
    "monto": 0,
    "estado": "Asignado",
    "agenda": turnoTemplate.agenda,
    "administrativo": null,
  };

  const turnoTemplateCancelar = {
    "dni": null,
    "fecha": turnoTemplate.fecha,
    "horaInicio": turnoTemplate.horaInicio,
    "horaFin": turnoTemplate.horaFin,
    "esSobreturno": turnoTemplate.esSobreturno,
    "monto": 0,
    "estado": "Cancelado",
    "agenda": turnoTemplate.agenda,
    "administrativo": null,
  };

  useEffect(() => {
    if (selectedEstado === 'Finalizado') {
      fetch('http://127.0.0.1:8000/piezasDentales/')
        .then((response) => response.json())
        .then((data) => {
          setPiezasDentales(data);
        });
    }
  }, [selectedEstado]);

  const Liberar = (id) => {
    setEstadoModal('Disponible');
    onHide();
    fetch(`http://127.0.0.1:8000/turnos/${id}/`,{
      method: 'Delete',
    })

  }
    
  const Asignar = () => {
    setEstadoModal('Asignado');
    onHide();
    fetch(`http://127.0.0.1:8000/turnos/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(turnoTemplateAsignado)
    })
  }

  const CancelarDisponible = () => {
    setEstadoModal('Cancelado');
    onHide();
    fetch(`http://127.0.0.1:8000/turnos/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(turnoTemplateCancelar)
    })
  }


  const Cancelar = (id) => {
    turno.estado = 'Cancelado';
    setEstadoModal('Cancelado');
    onHide();
    fetch(`http://127.0.0.1:8000/turnos/${id}/`,{
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(turno),
    })
  }



  useEffect(() => {
    if(value){
    fetch(`http://127.0.0.1:8000/pacientes/?search=${value}/`)
    .then((response) => response.json())
    .then((data) => {
        setPaciente(data.results);
    });
    } else {
      setPaciente([]);
    }  
  }, [value]);

  useEffect(() => {
    if (turnoClick) { 
      fetch(`http://127.0.0.1:8000/turnos/${turnoClick}/`)
        .then((response) => response.json())
        .then((data) => {
          setTurno(data);
    });
    } else {
      setTurno({}); 
    }
  }, [turnoClick]);
  
  useEffect(() => {
    if (turnoTemplate.id === null) {
      fetch(`http://127.0.0.1:8000/agendas/${turnoTemplate.agenda}/`)
        .then((response) => response.json())
        .then((data) => {
          setAgendaDetails(data);
        });
    }
  }, [turnoTemplate]);


  useEffect(() => {
    if (show) {
      setSelectedEstado('');
      setSelectedPaciente({ key: '' });
      setEstadoModal('');
      setAgendaDetails({});
      setTurnoClick(null);
    }
  }, [show]);    


  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >

      <Modal.Body className='bg'>
          <h6>Paciente</h6>
          <Dropdown>
          {turnoTemplate.id === null && 
          <Dropdown.Toggle variant="secondary" className='w-100 text-start'>
            {selectedPaciente.key ?   selectedPaciente.nombre + ' ' + selectedPaciente.apellido : turnoTemplate.id === null ? 'Seleccionar paciente...'  : turno?.paciente?.nombre + ' ' + turno?.paciente?.apellido}
          </Dropdown.Toggle>}
          
          {turnoTemplate.id !== null &&
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {selectedPaciente.key ?   selectedPaciente.nombre + ' ' + selectedPaciente.apellido : turno?.paciente?.nombre + ' ' + turno?.paciente?.apellido}
          </Dropdown.Toggle>} 
          
          {turnoTemplate.id === null && (<Dropdown.Menu as={CustomPacientes} valor={value} setValor={setValue} pacientes={paciente} setPacientes={setPaciente}>
            {paciente.map((paciente) => (
              <Dropdown.Item onClick = {() => setSelectedPaciente(
                {   key: paciente.dni, 
                  nombre: paciente.nombre, 
                  apellido: paciente.apellido
                })} 
                key={paciente.dni}>{paciente.nombre} {paciente.apellido} {paciente.dni ? '': ''}</Dropdown.Item>))}
          </Dropdown.Menu> )}
        </Dropdown>
        <br />

        <h6>Agenda</h6>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
          {turnoTemplate.id === null ? turnoTemplate.agenda : turno?.agenda?.id}
          </Dropdown.Toggle>
        </Dropdown>
        <br />
        
        <h6>Odontologo</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turnoTemplate.id === null ? agendaDetails?.odontologo?.nombre + ' ' + agendaDetails?.odontologo?.apellido : turno?.agenda?.odontologo?.nombre + ' ' + turno?.agenda?.odontologo?.apellido}
          </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Centro</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turnoTemplate.id === null ? agendaDetails?.CentroOdontologico?.nombre : turno?.agenda?.CentroOdontologico?.nombre}
          </Dropdown.Toggle>
        </Dropdown>
        <br />


        <h6>Estado</h6>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            {turnoTemplate.id === null ? turnoTemplate.estado : turno.estado}
          </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Sobreturno</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
          {turno.esSobreturno || turnoTemplate.esSobreturno? 'Si' : 'No'}
          </Dropdown.Toggle>
        </Dropdown>
        <br />
        
        <h6>Fecha</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turnoTemplate.id === null ? turnoTemplate.fecha : turno.fecha}
          </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Hora inicio - hora fin</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turnoTemplate.id === null ? turnoTemplate.horaInicio + '-' + turnoTemplate.horaFin  : turno.horaInicio + '-' + turno.horaFin}
          </Dropdown.Toggle>
        </Dropdown>

        {selectedEstado === 'Finalizado' && (
          <>
            <br />
            <Alert id='finalizar' variant='success' >Finalizar</Alert>
            <MapaPiezas mapaPiezas={mapaPiezas} selectedEstado={selectedEstado}/>
            <h6>Monto</h6>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control aria-label="Amount (to the nearest dollar)" />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
            
            <h6>Observaciones</h6>
            <InputGroup>
              <InputGroup.Text>Observaciones</InputGroup.Text>
              <Form.Control as="textarea" aria-label="With textarea" />
            </InputGroup>

            <Modal.Footer className="bg">
              <CloseButton onClick={() => onHide()}/>
            </Modal.Footer>
          </>
        )}
      </Modal.Body>

      { selectedEstado !== 'Finalizado' && (<Modal.Footer className='bg'>
        {turnoTemplate.id === null && 
        <>
        <Button onClick={(Asignar)} variant="warning" disabled={!selectedPaciente.key}>Asignar turno</Button>
        <Button onClick={(CancelarDisponible)} variant="danger">Cancelar turno</Button>
        </>}
        
        {turno.estado === 'Asignado' &&  (
          <>
            <Button onClick={() => Liberar(turno.id)} variant="info">Liberar turno</Button>
            <Button onClick={() => Cancelar(turno.id)} variant="danger">Cancelar turno</Button>
            <Button onClick={() => setSelectedEstado('Finalizado')} variant="success">Finalizar turno</Button>
          </>
          )}
          {turno.estado === 'Cancelado' && (
            <Button onClick={() => Liberar(turno.id)} variant="info">Liberar turno</Button>)}
        
        <CloseButton onClick={() => onHide()}/>
      </Modal.Footer>)}
    </Modal>
  );
}


