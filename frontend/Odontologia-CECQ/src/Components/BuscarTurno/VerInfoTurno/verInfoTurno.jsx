import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CustomToggle, CustomMenu, CustomCalendarMenu, CustomOnlyMenu } from '../Dropdown/Dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { useFetch } from '../../Fetchs/fetchs';
import { Filtro } from '../Filtros/filtros';
import './verInfoTurno.css';
import { useState } from 'react';

export function VerTurno({show, onHide, turno}) {
  const [selectedPaciente, setSelectedPaciente] = useState("");
  const [selectedOdontologo, setSelectedOdontologo] = useState("");

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
      <Dropdown>
        <h6>Paciente</h6>
        <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
          {turno?.paciente?.dni === "" ? "Seleccionar paciente..." : selectedPaciente === '' ? turno?.paciente?.dni: selectedPaciente}
        </Dropdown.Toggle>
          <Filtro selectedItem={selectedPaciente} setSelectedItem={setSelectedPaciente} api_url={'http://127.0.0.1:8000/pacientes/'} itemKey={'dni'} />
      </Dropdown>
      <br /><br />
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
          {selectedOdontologo === "" ? "Seleccionar odontólogo..." : selectedOdontologo}
        </Dropdown.Toggle>
        <Filtro selectedItem={selectedOdontologo} setSelectedItem={setSelectedOdontologo} api_url={'http://127.0.0.1:8000/odontologos/'} itemKey={'matricula'}/>
      </Dropdown>
        

        <h6>Fecha: {turno.fecha}</h6>
        <h6>Hora de inicio: {turno.horaInicio}</h6>
        <h6>Hora de fin: {turno.horaFin}</h6>
        <h6>Odontólogo: {turno.odontologo}</h6>
        <h6>Centro: {turno.centro}</h6>
        <h6>Agenda: {turno.agenda}</h6>
        <h6>Paciente: {turno?.paciente?.apellido}</h6>

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


