import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomToggle, CustomMenu, CustomCalendarMenu, CustomOnlyMenu } from './Dropdown/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';

export function verTurno(props) {
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
          <Dropdown.Toggle as={CustomToggle}>
            Seleccionar odontologo...
          </Dropdown.Toggle>
          
          <Dropdown.Menu as={CustomMenu}>
            <Dropdown.Item eventKey="1">Mariano</Dropdown.Item>
            <Dropdown.Item eventKey="2">Tomas</Dropdown.Item>
            <Dropdown.Item eventKey="3">Juan</Dropdown.Item>
            <Dropdown.Item eventKey="1">Santi</Dropdown.Item>
          </Dropdown.Menu>          
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            Seleccionar paciente...
          </Dropdown.Toggle>
          
          <Dropdown.Menu as={CustomMenu}>
            <Dropdown.Item eventKey="1">Mariano</Dropdown.Item>
            <Dropdown.Item eventKey="2">Tomas</Dropdown.Item>
            <Dropdown.Item eventKey="3">Juan</Dropdown.Item>
            <Dropdown.Item eventKey="1">Santi</Dropdown.Item>
          </Dropdown.Menu>          
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            Seleccionar estado...
          </Dropdown.Toggle>
          
          <Dropdown.Menu as={CustomMenu}>
            <Dropdown.Item eventKey="1">Completado</Dropdown.Item>
            <Dropdown.Item eventKey="2">Pendiente</Dropdown.Item>
          </Dropdown.Menu>          
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            Seleccionar duracion...
          </Dropdown.Toggle>
          
          <Dropdown.Menu as={CustomMenu}>
            <Dropdown.Item eventKey="1">15 minutos</Dropdown.Item>
            <Dropdown.Item eventKey="2">30 minutos</Dropdown.Item>
            <Dropdown.Item eventKey="3">45 minutos</Dropdown.Item>
            <Dropdown.Item eventKey="4">60 minutos</Dropdown.Item>
          </Dropdown.Menu>          
        </Dropdown>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Finalizar turno</Button>{' '}
        <Button variant="secondary">Cancelar turno</Button>{' '}
      </Modal.Footer>
    </Modal>
  );
}


