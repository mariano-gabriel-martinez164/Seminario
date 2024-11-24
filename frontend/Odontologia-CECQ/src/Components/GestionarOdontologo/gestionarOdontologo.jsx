import { Container, Fab, Paper, Table, TableBody, TableContainer, TableHead, TableRow, IconButton, Alert,  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import { StyledTableCell } from '../MaterialUI/styledTable.jsx';
import { StyledTableRow } from '../MaterialUI/styledTable.jsx';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetchDataOnDemand } from '../../Request/v2/fetch.js';
import ModalEliminar from '../ModalEliminar/modalEliminar.jsx';
import { ModalCrearOdontologo } from './modalCrear.jsx';


export default function GestionaOdontologo() {

  const [estadoModal, setEstadoModal] = useState('');
  const [odontologoSeleccionado, setodontologoSeleccionado] = useState(null);
  const [modalShowModificar, setModalShowModificar] = useState(false);
  const [modalShowCrear, setModalShowCrear] = useState(false);
  const [modalShowEliminar, setModalShowEliminar] = useState(false);
  const [estadoEliminar, setEstadoEliminar] = useState('');
  const [estadoCrear, setEstadoCrear] = useState('');

  const url = '/odontologos/';
  const { data: odontologos, loading: isLoading, error, fetchData } = useFetchDataOnDemand(url);

  useEffect(() => {
    setEstadoEliminar('');
    setEstadoCrear('');
    setTimeout(async () => {
      await fetchData();
    }, 500);
  }, [estadoEliminar, estadoModal, estadoCrear]);

  return (
    <Container fixed sx={{ mt: 2 }}>
      {estadoModal === 'Eliminado' && <Alert severity="error" onClose={() => {setEstadoModal('')}}>Odontologo eliminado</Alert>}
      {estadoModal === 'Creado' && <Alert severity="success" onClose={() => {setEstadoModal('')}}>Odontologo creado</Alert>}
      {isLoading && <Alert severity="info">Cargando...</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      {odontologos && !isLoading && !error &&
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Matricula</StyledTableCell>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Apellido</StyledTableCell>
            <StyledTableCell align="center">Cuil</StyledTableCell>
            <StyledTableCell align="center">Opcion</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {odontologos && odontologos.map((odontologo) => (
            <StyledTableRow key={odontologo.matricula}>
              <StyledTableCell component="th" scope="row">{odontologo.matricula}</StyledTableCell>
              <StyledTableCell align="center">{odontologo.nombre}</StyledTableCell>
              <StyledTableCell align="center">{odontologo.apellido}</StyledTableCell>
              <StyledTableCell align="center">{odontologo.cuil}</StyledTableCell>
              <StyledTableCell align="center">
                  
                <IconButton onClick={() => {
                  setModalShowEliminar(true);
                  setodontologoSeleccionado(odontologo.matricula);
                }}color="error" variant="contained"> <DeleteIcon/></IconButton>
                  
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
        Agregar odontólogo
      </Fab>
      {modalShowCrear && (
        <ModalCrearOdontologo
          open={modalShowCrear} 
          onClose={() => setModalShowCrear(false)}
          setEstadoModal={setEstadoModal}
          setEstadoCrear={setEstadoCrear}
        />
      )}
      {modalShowEliminar && (
        <ModalEliminar
          open={modalShowEliminar} 
          onClose={() => setModalShowEliminar(false)}
          seleccionado={odontologoSeleccionado}
          este={"este odontologo"}
          setEstadoModal={setEstadoModal}
          url={'/odontologos/'}
          setEstadoEliminar={setEstadoEliminar}
        />
      )}
    </Container>

  );
}
