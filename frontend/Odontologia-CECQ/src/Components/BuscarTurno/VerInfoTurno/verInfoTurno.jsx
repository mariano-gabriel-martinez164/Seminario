import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomToggle, CustomMenu, CustomCalendarMenu, CustomOnlyMenu, CustomPacientes } from '../Dropdown/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import './verInfoTurno.css';
import { useEffect, useState } from 'react';
import { mostrarFiltros } from '../MostrarFiltros/mostrarFiltros';
import { Alert } from 'react-bootstrap';

export function VerTurno({show, onHide, turnoClick}) {
  const [turno, setTurno] = useState({});
  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedPaciente, setSelectedPaciente] = useState({key: ''});
  const [paciente, setPaciente] = useState([]);
  const [value, setValue] = useState('');
  const [liberar, setLiberar] = useState(false);
  const [asignar, setAsignar] = useState(false);
  const [cancelar, setCancelar] = useState(false);

  const Liberar = () => {
    setLiberar(true);
    turno.estado = 'Disponible';
  }
    
  const Asignar = () => {
    setAsignar(true);
    turno.estado = 'Asignado';
  }

  const Cancelar = () => {
    setCancelar(true);
    turno.estado = 'Cancelado';
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
    if (show) {
      setSelectedEstado('');
      setSelectedPaciente({ key: '' });
      setLiberar(false);
      setAsignar(false);
      setCancelar(false);
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
      <Modal.Header closeButton className='bg' >
      </Modal.Header>
      <Modal.Body className='bg'>
        <h6>Paciente</h6>
        <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
          {turno?.paciente?.nombre === '' ? 'Seleccionar paciente...' : turno?.paciente?.nombre + ' ' + turno?.paciente?.apellido}
        </Dropdown.Toggle>

        {turno.estado === 'Disponible' && (<Dropdown.Menu as={CustomPacientes} valor={value} setValor={setValue} pacientes={paciente} setPacientes={setPaciente}>
          {paciente.map((paciente) => (
            <Dropdown.Item onClick = {() => setSelectedPaciente(
            {   key: paciente.dni, 
                nombre: paciente.nombre, 
                apellido: paciente.apellido
            })} 
            key={paciente.dni}>{paciente.nombre} {paciente.apellido} {paciente.dni ? '': ''}</Dropdown.Item>))}
        </Dropdown.Menu> )}
      {mostrarFiltros(selectedPaciente, setSelectedPaciente)}
      </Dropdown>
      <br />

        <h6>Odontologo</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turno?.agenda?.odontologo?.nombre === '' ? 'Seleccionar odontologo...' : turno?.agenda?.odontologo?.nombre + ' ' + turno?.agenda?.odontologo?.apellido}
          </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Centro</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turno?.agenda?.CentroOdontologico?.nombre === '' ? 'Seleccionar centro...' : turno?.agenda?.CentroOdontologico?.nombre}
          </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Agenda</h6>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            {turno?.agenda?.id}
          </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Estado</h6>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            {turno.estado === '' ? 'Seleccionar estado...' : turno.estado}
          </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Sobreturno</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
          {(turno.esSobreturno !== true && turno.esSobreturno !== false) ? 'Seleccionar sobreturno...' : turno.esSobreturno ? 'Es sobreturno' : 'No es sobreturno'}
          </Dropdown.Toggle>
        </Dropdown>
        <br />
        
        <h6>Fecha</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turno.fecha === '' ? 'Seleccionar fecha...' : turno.fecha}
          </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Hora inicio - hora fin</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turno.horaInicio} - {turno.horaFin}
          </Dropdown.Toggle>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer className='bg'>
      {liberar && <Alert variant='warning' dismissible >Turno liberado</Alert>}
      {asignar && <Alert variant='success' dismissible >Turno asignado</Alert>} 
      {cancelar && <Alert variant='danger' dismissible >Turno cancelado</Alert>} 
        {turno.estado === 'Disponible' && (
          <Button onClick={(Asignar)} variant="secondary">Asignar turno</Button>
          )}
        {turno.estado === 'Asignado' && (
          <>
            <Button onClick={(Liberar)} variant="secondary">Liberar turno</Button>
            <Button onClick={(Cancelar)} variant="secondary">Cancelar turno</Button>
            <Button variant="secondary">Finalizar turno</Button>
          </>
          )}
        
      </Modal.Footer>
    </Modal>
  );
}


