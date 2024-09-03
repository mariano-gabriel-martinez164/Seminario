import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomToggle } from '../DropdownCustom/DropdownCustom';
import Dropdown from 'react-bootstrap/Dropdown';
import './modal.css';
import { useEffect, useState } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Alert } from 'react-bootstrap';
import MapaPiezas from './mapaPiezas';
import { mostrarFiltrosArray } from '../MostrarFiltros/mostrarFiltros';
import { postData } from '../../../Request/post';
import { deleteData } from '../../../Request/delete';
import { putData } from '../../../Request/put';
import { useFetch } from '../../../Request/fetch.js';


export const Estado = (onHide, setEstadoModal, estado) => {
  setEstadoModal(estado);
  onHide;
}

export function ModalAsignado({show, onHide, turnoClick, setEstadoModal}) {

  const [selectedEstado, setSelectedEstado] = useState('');
  const [selectedTurnoPieza, setSelectedTurnoPieza] = useState([]);
  const [buttonColors, setButtonColors] = useState({});
  
  const [monto, setMonto] = useState('');
  const [observaciones, setObservaciones] = useState('');
  
  const turno = useFetch(turnoClick ? `/turnos/${turnoClick}/` : null);
  const handleMontoChange = (e) => {
    setMonto(e.target.value);
  };

  const handleObservacionesChange = (e) => {
    setObservaciones(e.target.value);
  };

  const mapaPiezas = [
    [[55,51], [61,65]],
    [[18,11], [21,28]],
    [[48,41], [31,38]],
    [[85,81], [71,75]]
  ]

  const turnoPiezaFinalizado = selectedTurnoPieza.map(item => ({
    "turno": item.turno,
    "pieza": item?.pieza?.codigo,
    "prestacion": item?.prestacion?.codigo
  }));


  useEffect(() => {
    if (show) {
      setSelectedTurnoPieza([]);
    }
  }, [show]);    

  const handleLiberarTurno = () => {
    deleteData(`/turnos/${turno.id}/`);
    Estado(onHide(), setEstadoModal, 'Disponible');
  };

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
        
        {selectedEstado === 'Realizado' && (
          <>
            <br />
            <Alert id='finalizar' variant='success' >Finalizar</Alert>
            <MapaPiezas mapaPiezas={mapaPiezas} selectedEstado={selectedEstado} turno={turno.id} setSelectedTurnoPieza={setSelectedTurnoPieza} setButtonColors={setButtonColors} buttonColors={buttonColors}/>
            {mostrarFiltrosArray(selectedTurnoPieza, setSelectedTurnoPieza, setButtonColors, buttonColors)}
            
            <h6>Monto</h6>
            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                value={monto}
                onChange={handleMontoChange}
              />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
            
            <h6>Observaciones</h6>
            <InputGroup>
              <InputGroup.Text>Observaciones</InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-label="With textarea"
                value={observaciones}
                onChange={handleObservacionesChange}
              />
            </InputGroup>

            <Modal.Footer className="bg">
              <Button onClick={() =>{
                    turno.estado = 'Realizado';
                    turno.monto = String(monto);
                    turno.observaciones = observaciones;
                    postData(`/turnos/piezas/`, turnoPiezaFinalizado);
                    putData(`/turnos/${turno.id}/`, turno)
                    Estado(onHide(), setEstadoModal, 'Realizado')
              }} variant="success">Finalizar turno</Button>
            </Modal.Footer>
          </>
        )}
      </Modal.Body>

      <Modal.Footer className='bg'>
    
        <Button onClick={handleLiberarTurno} variant="info">Liberar turno</Button>
        <Button onClick={() => {
            turno.estado = 'Cancelado'; putData(`/turnos/${turno.id}/`, turno);
            Estado(onHide(), setEstadoModal, 'Cancelado')}} 
            variant="danger">Cancelar turno</Button>
        <Button onClick={() => setSelectedEstado('Realizado')} variant="success">Finalizar turno</Button>
        
        <CloseButton onClick={() => onHide()}/>
      </Modal.Footer>
    </Modal>
  );
}

