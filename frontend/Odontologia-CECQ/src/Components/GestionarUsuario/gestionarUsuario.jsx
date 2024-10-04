import { Fab, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Alert, Container, Button } from "@mui/material/"
import AddIcon from "@mui/icons-material/Add"

import { useEffect, useState } from 'react'
import { ModalModificarUsuario } from './Modal/modalModificarUsuario.jsx';
import { ModalCrearUsuario } from './Modal/modalCrearUsuario.jsx';
import { StyledTableCell, StyledTableRow } from '../MaterialUI/styledTable.jsx';
import { useFetchDataOnDemand } from '../../Request/v2/fetch.js';


export default function GestionarUsuario() {

  const [estadoModal, setEstadoModal] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalShowModificar, setModalShowModificar] = useState(false);
  const [modalShowCrear, setModalShowCrear] = useState(false);
  const url = '/auth/administrativos/';
  const { data: administrativos, loading: isLoading, error, fetchData } = useFetchDataOnDemand(url);

  useEffect(() => {
    fetchData();
    setEstadoModal('');
  }, [url, estadoModal]);

  return (
    <Container fixed sx={{ mt: 2 }}>
      {estadoModal === 'Eliminado' && <Alert severity="error" onClose={() => {setEstadoModal('')}}>Usuario eliminado</Alert>}
      {estadoModal === 'Modificado' && <Alert severity="warning" onClose={() => {setEstadoModal('')}}>Usuario modificado</Alert>}
      {estadoModal === 'Creado' && <Alert severity="success" onClose={() => {setEstadoModal('')}}>Usuario creado</Alert>}
      {isLoading && <Alert severity="info">Cargando...</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      {administrativos && !isLoading && !error &&
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
          {administrativos?.map((administrativo) => (
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
    }
    <Fab
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        color="primary"
        variant="extended"
        onClick={() => {
          setModalShowCrear(true);
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Crear usuario
      </Fab>

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
