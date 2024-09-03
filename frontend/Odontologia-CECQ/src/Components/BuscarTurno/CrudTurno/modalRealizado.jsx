import Modal from 'react-bootstrap/Modal';
import { CustomToggle } from '../DropdownCustom/DropdownCustom';
import Dropdown from 'react-bootstrap/Dropdown';
import './modal.css';
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Alert } from 'react-bootstrap';
import { useFetch } from '../../Request/fetch';
import { apiUrl } from '../../Request/fetch';

export const Estado = (onHide, setEstadoModal, estado) => {
  setEstadoModal(estado);
  onHide;
}

export function ModalRealizado({show, onHide, turnoClick }) {
  
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
            {turno?.paciente?.nombre + ' ' + turno?.paciente?.apellido}
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
        {turno.estado === 'Realizado' && (
          <>
          <br />
          <Alert id='finalizar' variant='success' >Finalizado</Alert>
            {turno.turnosPieza.map((turnoPieza, index) => (
              <div key={index}>
              <br />
              <h6>Pieza {turnoPieza.pieza.codigo}: {turnoPieza.pieza.nombre} - Prestacion: {turnoPieza.prestacion.nombre}</h6>
              </div>
            ))}
            <br />
            <h6>Monto</h6>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                value={turno.monto}
                readOnly 
              />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
            
            <h6>Observaciones</h6>
            <InputGroup>
              <InputGroup.Text>Observaciones</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                value={turno.observaciones}
                readOnly 
              />
            </InputGroup>
            </>
            )}
        </Modal.Body>
        <Modal.Footer>
        <CloseButton onClick={() => onHide()}/>
      </Modal.Footer>
    </Modal>
  );
}
