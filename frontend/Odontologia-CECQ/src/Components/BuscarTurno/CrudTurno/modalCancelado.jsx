import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomToggle } from '../DropdownCustom/DropdownCustom';
import Dropdown from 'react-bootstrap/Dropdown';
import './modal.css';
import CloseButton from 'react-bootstrap/CloseButton';
import { deleteData } from '../../Request/delete';
import { useFetch } from '../../Request/fetch';
import { apiUrl } from '../../Request/fetch';

export const Estado = (onHide, setEstadoModal, estado) => {
  setEstadoModal(estado);
  onHide;
}

export function ModalCancelado({show, onHide, turnoClick ,setEstadoModal}) {
  
  const turno = useFetch(turnoClick ? `${apiUrl}/turnos/${turnoClick}/` : null);

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
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turno?.paciente?.nombre ? turno?.paciente?.nombre + ' ' + turno?.paciente?.apellido : 'No asignado'}
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
        
        <h6>Odontologo</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turno?.agenda?.odontologo?.nombre + ' ' + turno?.agenda?.odontologo?.apellido}
          </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Centro</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turno?.agenda?.CentroOdontologico?.nombre}
          </Dropdown.Toggle>
        </Dropdown>
        <br />


        <h6>Estado</h6>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            {turno.estado}
          </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Sobreturno</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
          {turno.esSobreturno ? 'Si' : 'No'}
          </Dropdown.Toggle>
        </Dropdown>
        <br />
        
        <h6>Fecha</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turno.fecha}
          </Dropdown.Toggle>
        </Dropdown>
        <br />
          
        <h6>Hora inicio - hora fin</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {turno.horaInicio + '-' + turno.horaFin}
          </Dropdown.Toggle>
        </Dropdown>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {deleteData(`${apiUrl}/turnos/${turno.id}/`);
        Estado(onHide(), setEstadoModal, 'Disponible')}}
        variant="info">Liberar turno</Button>
        
        <CloseButton onClick={() => onHide()}/>
      </Modal.Footer>
    </Modal>
  );
}

