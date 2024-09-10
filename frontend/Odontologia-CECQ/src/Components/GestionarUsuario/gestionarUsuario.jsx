import { Button, Container, Alert, TableRow, TableHead, TableContainer, TableBody, Table, Paper, styled, TableCell, tableCellClasses } from '@mui/material';
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

      const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

  return (
    <Container fixed sx={{ mt: 2 }}>
      {estadoModal === 'Eliminado' && <Alert severity="error" onClose={() => {setEstadoModal('')}}>Usuario eliminado</Alert>}
      {estadoModal === 'Modificado' && <Alert severity="warning" onClose={() => {setEstadoModal('')}}>Usuario modificado</Alert>}
      {estadoModal === 'Creado' && <Alert severity="success" onClose={() => {setEstadoModal('')}}>Usuario creado</Alert>}
      
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="center">Apellido</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Cuil</StyledTableCell>
            <StyledTableCell align="center">Agenda</StyledTableCell>
            <StyledTableCell align="center">Opciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {administrativos.map((administrativo) => (
            <StyledTableRow key={administrativo.id}>
              <StyledTableCell component="th" scope="row">
                {administrativo.first_name}
              </StyledTableCell>
              <StyledTableCell align="center">{administrativo.last_name}</StyledTableCell>
              <StyledTableCell align="center">{administrativo.email}</StyledTableCell>
              <StyledTableCell align="center">{administrativo.cuil}</StyledTableCell>
              <StyledTableCell align="center">{administrativo.centro}</StyledTableCell>
              <StyledTableCell align="center">
                <Button onClick={() => {
                  setModalShowModificar(true);
                  setUsuarioSeleccionado(administrativo.id);
                }} className='w-100' variant="contained"> Opciones</Button>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
     </TableContainer>
      <Button onClick={() => setModalShowCrear(true)} sx={{ mt: 1 }} variant="contained">
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