import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { CustomToggle, CustomPacientes, CustomOnlyMenu, CustomMenu } from '../Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { Filtro } from '../Filtros/filtros';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

export function VerSobreturno({ show, onHide, setEstadoModal, estadoModal }) {
    const [selectedPaciente, setSelectedPaciente] = useState({key: ''});
    const [paciente, setPaciente] = useState([]);
    const [value, setValue] = useState('');
    const [selectedAdministrativo, setSelectedAdministrativo] = useState({key: ''});
    const [selectedAgenda, setSelectedAgenda] = useState({id: ''});
    const [agendas, setAgendas] = useState([]);
    const [horaFin, setHoraFin] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [fecha, setFecha] = useState('');

    const validarFecha = (fecha) => {
        const formato = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
        return formato.test(fecha);
    };
    
    const validarHora = (hora) => {
        const formato = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM
        return formato.test(hora);
    };
    

    const turnoAsignado = {
        "dni": selectedPaciente.key,
        "fecha": fecha,
        "horaInicio": horaInicio,
        "horaFin": horaFin,
        "esSobreturno": true,
        "monto": 0,
        "estado": "Asignado",
        "agenda": selectedAgenda.id,
        "administrativo": null,
    };

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
          setSelectedPaciente({ key: '' });
          setSelectedAdministrativo({ key: '' });
          setSelectedAgenda({ id: '' });
          setValue('');
        }
    }, [show]);    

    const Asignar = () => {
        setEstadoModal('Sobreturno asignado');
        onHide();
        fetch(`http://127.0.0.1:8000/turnos/`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(turnoAsignado)
        })
      }
    

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
                Asignado
            </Dropdown.Toggle>
        </Dropdown>
        <br />

        <h6>Fecha</h6>
        <FloatingLabel controlId="floatingInput" label="YYYY-MM-DD">
            <Form.Control 
                className="border border-dark"
                type="text"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
            />
        </FloatingLabel>

        <h6>Hora inicio</h6>
        <FloatingLabel controlId="floatingInput" label="HH-MM">
            <Form.Control 
                className="border border-dark"
                type="text"
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
            />
        </FloatingLabel>

        <h6>Hora fin</h6>
        <FloatingLabel controlId="floatingInput" label="HH-MM">
            <Form.Control
                className="border border-dark"
                type="text"
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
            />
        </FloatingLabel>


      </Modal.Body>
      <Modal.Footer className='bg'>
        <Button variant="warning" onClick={Asignar} 
            disabled={!selectedPaciente.key || !selectedAgenda || !selectedAdministrativo || !validarFecha(fecha) || !validarHora(horaInicio) || !validarHora(horaFin)}>
                Asignar turno</Button>
        <CloseButton onClick={() => onHide()}/>
      </Modal.Footer>
    </Modal>
  );
}


