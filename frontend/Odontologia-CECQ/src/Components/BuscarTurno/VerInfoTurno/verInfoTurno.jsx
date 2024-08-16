import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomToggle, CustomMenu, CustomCalendarMenu, CustomOnlyMenu } from '../Dropdown/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';

export function verTurno(props) {
  const [selectedPatient, setSelectedPatient] = useState(props.patient);
  const [selectedDentist, setSelectedDentist] = useState([props.dentist]);
  const [selectedState, setSelectedState] = useState([props.state]);
  const [selectedDuration, setSelectedDuration] = useState([props.duration]);
  return (
    <Modal
    {...props}
    size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Turno
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>  
        <Dropdown>
          <h6>Paciente</h6>
          <Dropdown.Toggle as={CustomToggle}>
            {selectedPatient}
          </Dropdown.Toggle>
          
          <Dropdown.Menu as={CustomMenu}>
            <Dropdown.Item onClick = {() => setSelectedPatient('Mariano')} eventKey="1">Mariano</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedPatient('Tomas')} eventKey="2">Tomas</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedPatient('Juan')} eventKey="3">Juan</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedPatient('Santi')} eventKey="1">Santi</Dropdown.Item>
          </Dropdown.Menu>          
        </Dropdown>
        <br />
        <Dropdown>
          <h6>Odontologo</h6>
          <Dropdown.Toggle as={CustomToggle}>
            {selectedDentist}
          </Dropdown.Toggle>
          
          <Dropdown.Menu as={CustomMenu}>
            <Dropdown.Item onClick={() => setSelectedDentist('Mariano')} eventKey="1">Mariano</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedDentist('Tomas')} eventKey="2">Tomas</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedDentist('Juan')} eventKey="3">Juan</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedDentist('Santi')} eventKey="1">Santi</Dropdown.Item>
          </Dropdown.Menu>          
        </Dropdown>
        <br />
        <Dropdown>
          <h6>Estado</h6>
          <Dropdown.Toggle as={CustomToggle}>
            {selectedState}
          </Dropdown.Toggle>
          
          <Dropdown.Menu as={CustomOnlyMenu}>
            <Dropdown.Item onClick={() => setSelectedState('Completado')} eventKey="1">Completado</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedState('Pendiente')} eventKey="2">Pendiente</Dropdown.Item>
          </Dropdown.Menu>          
        </Dropdown>
        <br />
        <Dropdown>
          <h6>Duracion</h6>
          <Dropdown.Toggle as={CustomToggle}>
            {selectedDuration}
          </Dropdown.Toggle>
          
          <Dropdown.Menu as={CustomOnlyMenu}>
            <Dropdown.Item onClick={() => setSelectedDuration('15 Minutos')} eventKey="1">15 minutos</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedDuration('30 Minutos')} eventKey="2">30 minutos</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedDuration('45 Minutos')} eventKey="3">45 minutos</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedDuration('60 Minutos')} eventKey="4">60 minutos</Dropdown.Item>
          </Dropdown.Menu>          
        </Dropdown>
        <br />
        <Dropdown>
          <h6>Fecha</h6>
          <Dropdown.Toggle as={CustomToggle}>
            Seleccionar rango de fechas...
          </Dropdown.Toggle>
          <Dropdown.Menu as={CustomCalendarMenu}></Dropdown.Menu>
        </Dropdown>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Modificar turno</Button>{' '}
        <Button variant="secondary">Cancelar turno</Button>{' '}
        <Button variant="secondary">Finalizar turno</Button>{' '}
      </Modal.Footer>
    </Modal>
  );
}


