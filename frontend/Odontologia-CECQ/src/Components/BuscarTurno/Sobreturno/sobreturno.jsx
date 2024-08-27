import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { CustomToggle, CustomPacientes, CustomOnlyMenu, CustomMenu } from '../Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { Filtro } from '../Filtros/filtros';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

export function VerSobreturno({ show, onHide }) {
    const [selectedPaciente, setSelectedPaciente] = useState({key: ''});
    const [paciente, setPaciente] = useState([]);
    const [value, setValue] = useState('');
    const [selectedAdministrativo, setSelectedAdministrativo] = useState({key: ''});
    const [selectedAgenda, setSelectedAgenda] = useState({id: ''});
    const [selectedEstado, setSelectedEstado] = useState('');
    const [agendas, setAgendas] = useState([]);

    useEffect(() => {
        if (show) {
            fetch('http://127.0.0.1:8000/agendas/')
            .then((response) => response.json())
            .then((data) => {
                setAgendas(data);
            });
        }
    }, [show]);
    
    useEffect(() => {
        if (show) {
          setSelectedEstado('');
          setSelectedPaciente({ key: '' });
          setSelectedAdministrativo({ key: '' });
          setSelectedAgenda({ id: '' });
          setValue('');
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
        <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {selectedPaciente.key === '' ? 'Seleccionar paciente...' : selectedPaciente.nombre + ' ' + selectedPaciente.apellido}
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomPacientes} valor={value} setValor={setValue} pacientes={paciente} setPacientes={setPaciente}>
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
                {selectedAgenda.id === '' ? 'Seleccionar agenda...' : selectedAgenda.id}
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu}>
                {agendas.map((agenda) => (
                <Dropdown.Item onClick = {() => setSelectedAgenda(agenda)} 
                key={agenda.id}>{agenda.id}</Dropdown.Item>))}
            </Dropdown.Menu> 
        </Dropdown>
        <br />

        <h6>Odontologo</h6>
        <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                {selectedAgenda.id === '' ? 'Seleccionar agenda...' : selectedAgenda?.odontologo?.nombre + ' ' + selectedAgenda?.odontologo?.apellido} 
            </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Centro</h6>
        <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
                {selectedAgenda.id === '' ? 'Seleccionar agenda...' : selectedAgenda?.CentroOdontologico?.nombre} 
            </Dropdown.Toggle>
        </Dropdown>
        <br />



        <h6>Administrativo</h6>
        <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>
            {selectedAdministrativo.key === '' ? 'Seleccionar administrativo...' : selectedAdministrativo.nombre + ' ' + selectedAdministrativo.apellido}
            </Dropdown.Toggle>
            <Filtro selectedItem={selectedAdministrativo} setSelectedItem={setSelectedAdministrativo} api_url={'http://127.0.0.1:8000/auth/administrativos/' } itemKey={'id'} valor1={'first_name'} valor2={'last_name'}/>
        </Dropdown>
        <br />

        <h6>Estado</h6>
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
            {selectedEstado === '' ? 'Seleccionar estado...' : selectedEstado}
            </Dropdown.Toggle>
        
            <Dropdown.Menu as={CustomOnlyMenu}>
            <Dropdown.Item onClick={() => setSelectedEstado('Asignado')} eventKey="2">Asignado</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedEstado('Cancelado')} eventKey="3">Cancelado</Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedEstado('Realizado')} eventKey="4">Realizado</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        <br />
        
        <h6>Sobreturno</h6>
        <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" as={CustomToggle}>Si</Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Fecha</h6>
        <FloatingLabel controlId="floatingInput" label="YYYY-MM-DD" className="mb-3">
            <Form.Control className="border border-dark"/>
        </FloatingLabel>

        <h6>Hora inicio</h6>
        <FloatingLabel controlId="floatingInput" label="HH-MM">
            <Form.Control className="border border-dark"/>
        </FloatingLabel>

        <h6>Hora fin</h6>
        <FloatingLabel controlId="floatingInput" label="HH-MM">
            <Form.Control className="border border-dark"/>
        </FloatingLabel>

      </Modal.Body>
      <Modal.Footer className='bg'>
        <Button variant="warning" disabled={!selectedPaciente.key}>Asignar turno</Button>
        <CloseButton onClick={() => onHide()}/>
      </Modal.Footer>
    </Modal>
  );
}


