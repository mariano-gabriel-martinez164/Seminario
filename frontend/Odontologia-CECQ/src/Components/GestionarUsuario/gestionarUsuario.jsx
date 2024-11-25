import { Fab, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Alert, Container, IconButton, Chip } from "@mui/material/"
import AddIcon from "@mui/icons-material/Add"

import { useEffect, useState } from 'react'
import { ModalModificarUsuario } from './Modal/modalModificarUsuario.jsx';
import { ModalCrearUsuario } from './Modal/modalCrearUsuario.jsx';
import { StyledTableCell, StyledTableRow } from '../MaterialUI/styledTable.jsx';
import { useFetch, useFetchDataOnDemand } from '../../Request/v2/fetch.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteData } from "../../Request/delete.js";
import ModalEliminar from '../ModalEliminar/modalEliminar.jsx';



export default function GestionarUsuario() {

  const [estadoModal, setEstadoModal] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [modalShowModificar, setModalShowModificar] = useState(false);
  const [modalShowCrear, setModalShowCrear] = useState(false);
  const [modalShowEliminar, setModalShowEliminar] = useState(false);
  const [estadoEliminar, setEstadoEliminar] = useState('');
  const url = '/auth/administrativos/';
  const { data: administrativos, loading: isLoading, error, fetchData } = useFetchDataOnDemand(url);
  const { data: me, loading: isLoadingMe, error: errorMe } = useFetch('/auth/administrativos/me/');

  const { data: centros, loading: isLoadingCentro, error: errorCentro } = useFetch('/centros/');
  console.log(centros);

  useEffect(() => {
    setTimeout(async () => {
      await fetchData();
    }, 500);
    setEstadoEliminar('');
  }, [estadoEliminar]);

  const handleManejarUsuario = async (estado) => {
    setEstadoModal(estado);
    setModalShowCrear(false);
    setTimeout(async () => {
      await fetchData();
    }, 500);
  };

  return (
    <Container fixed sx={{ mt: 2 }}>
      {estadoModal === 'Eliminado' && <Alert severity="error" onClose={() => {setEstadoModal('')}}>Usuario eliminado</Alert>}
      {estadoModal === 'Modificado' && <Alert severity="warning" onClose={() => {setEstadoModal('')}}>Usuario modificado</Alert>}
      {estadoModal === 'Creado' && <Alert severity="success" onClose={() => {setEstadoModal('')}}>Usuario creado</Alert>}
      {isLoading && <Alert severity="info">Cargando...</Alert>}
      {error && <Alert severity="error">Error</Alert>}
      {administrativos && !isLoading && !error &&
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nombre</StyledTableCell>
            <StyledTableCell align="center">Apellido</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Cuil</StyledTableCell>
            <StyledTableCell align="center">Centro</StyledTableCell>
            <StyledTableCell align="center">Opciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {administrativos && administrativos.map((administrativo) => (
            administrativo ? (
            <StyledTableRow key={administrativo.id}>
              <StyledTableCell component="th" scope="row">
                {administrativo.first_name}
                {administrativo.id === me?.id && (
                  <Chip label="Tú" color="primary" size="small" sx={{ marginLeft: '8px' }} />
                )}
                {administrativo.is_staff && (
                  <Chip label="Referente" color="secondary" size="small" sx={{ marginLeft: '8px' }} />
                )}
              </StyledTableCell>
              <StyledTableCell align="center">{administrativo.last_name}</StyledTableCell>
              <StyledTableCell align="center">{administrativo.email}</StyledTableCell>
              <StyledTableCell align="center">{administrativo.cuil}</StyledTableCell>
              <StyledTableCell align="center">
                {
                  !errorCentro && centros.length > 0
                  ? centros.find((centro) => centro.id === administrativo.centro)?.nombre
                  : null
                }
              </StyledTableCell>


              <StyledTableCell align="center">
                {administrativo.id !== me?.id && (
                  <>
                <IconButton onClick={() => {
                  setModalShowModificar(true);
                  setUsuarioSeleccionado(administrativo.id);
                }}color="warning" variant="contained"> <EditIcon/></IconButton>
                <IconButton onClick={() => {
                  setModalShowEliminar(true);
                  setUsuarioSeleccionado(administrativo.id);
                }}color="error" variant="contained"> <DeleteIcon/></IconButton>
                  </>
              )}
              </StyledTableCell>

            </StyledTableRow>
            ) : null
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
          handleManejarUsuario={handleManejarUsuario}
        />
      )}
      {modalShowCrear && (
        <ModalCrearUsuario
          open={modalShowCrear} 
          onClose={() => setModalShowCrear(false)}
          handleManejarUsuario={handleManejarUsuario}
        />
      )}
      {modalShowEliminar && (
        <ModalEliminar
          open={modalShowEliminar} 
          onClose={() => setModalShowEliminar(false)}
          seleccionado={usuarioSeleccionado}
          este={"este usuario"}
          setEstadoModal={setEstadoModal}
          url={'/auth/administrativos/'}
          setEstadoEliminar={setEstadoEliminar}
        />
      )}
    </Container>
  )             
}
