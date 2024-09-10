import { Table } from 'react-bootstrap'
import { Button, Container, Alert } from '@mui/material';
import './gestionarUsuario.css'
import { useEffect, useState } from 'react'
import { apiUrl, token } from '../../Request/fetch.js';
import { ModalModificarUsuario } from './Modal/modalModificarUsuario.jsx';
import { ModalCrearUsuario } from './Modal/modalCrearUsuario.jsx';


export default function GestionarUsuario() {

  const [estadoModal, setEstadoModal] = useState('');
  const [creado, setCreado] = useState(false);
  const [administrativos, setAdministrativos] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalShowModificar, setModalShowModificar] = useState(false);
  const [modalShowCrear, setModalShowCrear] = useState(false);

  useEffect(() => {
      fetch(`${apiUrl}/auth/administrativos/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        })
        .then(response => response.json())
        .then(data => setAdministrativos(data)
      );
      setCreado(false);
      }, [estadoModal, creado]);

  return (
    <Container fixed id='container'>
      {estadoModal === 'Eliminado' && <Alert severity="error" onClose={() => {setEstadoModal('')}}>Usuario eliminado</Alert>}
      {estadoModal === 'Modificado' && <Alert severity="warning" onClose={() => {setEstadoModal('')}}>Usuario modificado</Alert>}
      {estadoModal === 'Creado' && <Alert severity="success" onClose={() => {setEstadoModal('')}}>Usuario creado</Alert>}
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cuil</th>
            <th>Email</th>
            <th>Centro</th>
            <th>Modificar</th>
          </tr>
        </thead>
        <tbody>
          {administrativos.map((administrativo) => (
            <tr key={administrativo.id}>
              <td>{administrativo.first_name}</td>
              <td>{administrativo.last_name}</td>
              <td>{administrativo.cuil}</td>
              <td>{administrativo.email}</td>
              <td>{administrativo.centro}</td>
              <td>
              <Button onClick={() => {
                setModalShowModificar(true);
                setUsuarioSeleccionado(administrativo.id);
              }} className='w-100' variant="contained"> Ver más...</Button>
              </td>
            </tr>
          ))}
        </tbody>

      </Table>
      <Button onClick={() => setModalShowCrear(true)} variant="contained">
        Crear usuario</Button>

      {modalShowModificar && (
        <ModalModificarUsuario
          open={modalShowModificar}
          onClose={() => setModalShowModificar(false)}
          setEstadoModal={setEstadoModal}
          usuarioSeleccionado={usuarioSeleccionado}
        />
      )}
      {modalShowCrear && (
        <ModalCrearUsuario
          open={modalShowCrear} 
          onClose={() => setModalShowCrear(false)}
          setEstadoModal={setEstadoModal}
        />
      )}
    </Container>
  )             
}