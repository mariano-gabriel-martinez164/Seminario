import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomToggle, CustomMenu, CustomCalendarMenu, CustomOnlyMenu } from '../Dropdown/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import './verInfoTurno.css';
export function verTurno(show, onHide, turno) {

  return (
    <Modal
      show={show}
      onHide={onHide}
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
      <h6>Paciente</h6>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
          {!turno.paciente ? 'Seleccionar paciente...' : turno.paciente}
          </Dropdown.Toggle>
      
          <Dropdown.Menu as={CustomMenu}>
            
          </Dropdown.Menu>
        </Dropdown>

        <h6>Fecha: {turno.fecha}</h6>
        <h6>Hora de inicio: {turno.horaInicio}</h6>
        <h6>Hora de fin: {turno.horaFin}</h6>
        <h6>Odontólogo: {turno.odontologo}</h6>
        <h6>Centro: {turno.centro}</h6>
        <h6>Agenda: {turno.agenda}</h6>
        <h6>Paciente: {turno.paciente}</h6>
        <h6>Estado: {turno.estado}</h6>
        <h6>Observaciones: {turno.observaciones}</h6>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Modificar turno</Button>{' '}
        <Button variant="secondary">Cancelar turno</Button>{' '}
        <Button variant="secondary">Finalizar turno</Button>{' '}
      </Modal.Footer>
    </Modal>
  );
}


