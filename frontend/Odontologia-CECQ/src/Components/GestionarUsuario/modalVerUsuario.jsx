import { deleteData } from '../../Request/delete';
import { Form, CloseButton, Modal, Button } from 'react-bootstrap';
import { handleChange, handleModify } from './verificarFormulario';
import { useState } from 'react';
import { useFetch } from '../../Request/fetch';
import { Estado } from '../BuscarTurno/CrudTurno/modalAsignado';

export function ModalVerUsuario({show, onHide, setEstadoModal, usuarioSeleccionado}) {
  const [validated, setValidated] = useState(false);
  const administrativo = useFetch(usuarioSeleccionado ? `/auth/administrativos/${usuarioSeleccionado}/` : null);
  const [formData, setFormData] = useState({
    nombre: administrativo.first_name || '',
    email: administrativo.email || '',
    apellido: administrativo.last_name || '',
    cuil: administrativo.cuil || '',
  });
  

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>

        <Form noValidate validated={validated} onSubmit={(event) => handleModify(event, setValidated, formData, usuarioSeleccionado)}>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder={administrativo.first_name}
              name="nombre"
              value={formData.nombre}
              onChange={(event) => handleChange(event, setFormData)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationCustom02">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder={administrativo.last_name}
              name="apellido"
              value={formData.apellido}
              onChange={(event) => handleChange(event, setFormData)}

            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="validationCustom05">
            <Form.Label>Cuil</Form.Label>
            <Form.Control
              type="text"
              placeholder={administrativo.cuil}
              name="cuil"
              value={formData.cuil}
              onChange={(event) => handleChange(event, setFormData)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder={administrativo.email}
              name="email"
              value={formData.email}
              onChange={(event) => handleChange(event, setFormData)}
            />
          </Form.Group>
          <Button type="submit" variant='warning'>Modificar usuario</Button>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => {
          deleteData(`/auth/administrativos/${usuarioSeleccionado}/`);
          Estado(onHide(), setEstadoModal, 'Eliminado');}
          } variant='danger'>Eliminar usuario
        </Button>
        <CloseButton onClick={() => onHide()}/>
      </Modal.Footer>
    </Modal>
  );
}