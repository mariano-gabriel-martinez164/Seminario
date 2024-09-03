import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomToggle, CustomPacientes } from '../DropdownCustom/DropdownCustom';
import Dropdown from 'react-bootstrap/Dropdown';
import './modal.css';
import { useEffect, useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { postData } from '../../Hooks/post';
import { useFetch, useFetchArray } from '../../Hooks/fetch';
import { turnoFormato } from './turno';

export const Estado = (onHide, setEstadoModal, estado) => {
  setEstadoModal(estado);
  onHide;
}

export function ModalDisponible({show, onHide, turnoTemplate ,setEstadoModal}) {
  const [selectedPaciente, setSelectedPaciente] = useState({key: ''});
  const [value, setValue] = useState('');
    
  const paciente = useFetchArray(`http://127.0.0.1:8000/pacientes/?search=${value}`);
  const agendaDetails = useFetch(turnoTemplate.id === null ? `http://127.0.0.1:8000/agendas/${turnoTemplate.agenda}/` : null);


  useEffect(() => {
    if (show) {
      setSelectedPaciente({ key: '' });
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
          <Dropdown.Toggle variant="secondary" className='w-100 text-start'>
            {selectedPaciente.key ? selectedPaciente.nombre + ' ' + selectedPaciente.apellido : 'Seleccionar paciente...'}
          </Dropdown.Toggle>
          
          <Dropdown.Menu as={CustomPacientes} valor={value} setValor={setValue} pacientes={paciente}>
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

        <h6>Agenda</h6>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
          {turnoTemplate.agenda}
          </Dropdown.Toggle>
        </Dropdown>
        <br />
        
        <h6>Odontologo</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {agendaDetails?.odontologo?.nombre + ' ' + agendaDetails?.odontologo?.apellido}
          </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Centro</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {agendaDetails?.CentroOdontologico?.nombre}
          </Dropdown.Toggle>
        </Dropdown>
        <br />


        <h6>Estado</h6>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            {turnoTemplate.estado}
          </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Sobreturno</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
          No
          </Dropdown.Toggle>
        </Dropdown>
        <br />
        
        <h6>Fecha</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turnoTemplate.fecha}
          </Dropdown.Toggle>
        </Dropdown>
        <br />
          
        <h6>Hora inicio - hora fin</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turnoTemplate.horaInicio + '-' + turnoTemplate.horaFin}
          </Dropdown.Toggle>
        </Dropdown>

        
      </Modal.Body>

      <Modal.Footer className='bg'>
       
        <Button onClick={() => {
          
          postData('http://127.0.0.1:8000/turnos/', turnoFormato(selectedPaciente.key, turnoTemplate.fecha,
            turnoTemplate.horaInicio, turnoTemplate.horaFin, turnoTemplate.esSobreturno, 0, 'Asignado', turnoTemplate.agenda));
          Estado(onHide(), setEstadoModal, 'Asignado')}} 
          variant="warning" disabled={!selectedPaciente.key}>Asignar turno</Button>

        <Button onClick={() => {
          postData('http://127.0.0.1:8000/turnos/', turnoFormato(null, turnoTemplate.fecha,
            turnoTemplate.horaInicio, turnoTemplate.horaFin, turnoTemplate.esSobreturno, 0, 'Cancelado', turnoTemplate.agenda));
          Estado(onHide(), setEstadoModal, 'Cancelado')}} 
          variant="danger">Cancelar turno</Button>

        <CloseButton onClick={() => onHide()}/>
      </Modal.Footer>
    </Modal>
  );
}

