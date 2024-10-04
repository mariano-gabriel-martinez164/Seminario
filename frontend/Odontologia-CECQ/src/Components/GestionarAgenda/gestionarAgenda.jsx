import { Fab, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Container, IconButton, Alert } from "@mui/material/"
import Grid from "@mui/material/Grid2"
import AddIcon from "@mui/icons-material/Add"
import { StyledTableCell, StyledTableRow } from '../MaterialUI/styledTable.jsx';
import { SelectorOdontologo, SelectorCentro } from '../MaterialUI/selectores'
import { useState, useEffect } from 'react'
import { useFetchDataOnDemand } from '../../Request//v2/fetch.js';
import  ModalVerAgenda  from './Modal/modalVerAgenda.jsx';
import CrearAgenda from './crearAgenda.jsx';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteData } from "../../Request/delete.js";

export default function GestionarAgenda() {
  const [centro, setCentro] = useState(null);
  const [ odontologo, setOdontologo ] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowCrear, setModalShowCrear] = useState(false);
  const [agendaSeleccionado, setAgendaSeleccionado] = useState(null);
  const [estado, setEstado] = useState('');

  let url = `/agendas/?&`;
  if (odontologo?.matricula) url += `&odontologo=${odontologo.matricula}`;
  if (centro?.id) url += `&CentroOdontologico=${centro.id}`;
  const { data: agenda, loading: isLoading, error, fetchData } = useFetchDataOnDemand(url);

  useEffect(() => {
    fetchData();
    setEstado('');
  }, [url, estado]);

  const handleDelete = async (id) => {
    try {
      await deleteData(`/agendas/${id}/`);
      setEstado('eliminado');
    } catch (err) {
      console.error('Error eliminando agenda:', err);
    }
  };

  return (
    <Container fixed sx={{ mt: 2 }}>
      <Grid container spacing={2} sx={{mb:3}} >
        <Grid size={6}>
          <SelectorOdontologo
            selectedValue={odontologo}
            setSelectedValue={setOdontologo}
          /> 
        </Grid>
        <Grid size={6}>
          <SelectorCentro
            selectedValue={centro}
            setSelectedValue={setCentro} 
          />
        </Grid>
      </Grid>
      
      <TableContainer component={Paper}>
        {isLoading && <Alert severity="info" sx={{width:'100%'}}>Cargando...</Alert>}
        {error && <Alert severity="error" sx={{width:'100%'}}>{error}</Alert>}
        {agenda && !isLoading && !error &&
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Odontologo</StyledTableCell>
            <StyledTableCell align="center">Centro odontologico</StyledTableCell>
            <StyledTableCell align="center">Opciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agenda?.map((agenda) => (
            <StyledTableRow key={agenda.id}>
              <StyledTableCell align="center">{agenda?.odontologo?.nombre}</StyledTableCell>
              <StyledTableCell align="center">{agenda?.CentroOdontologico?.nombre}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton onClick={() => {
                  setModalShow(true);
                  setAgendaSeleccionado(agenda.id);
                }} color="warning" variant="contained"> <EditIcon/></IconButton>
                <IconButton 
                onClick={() => handleDelete(agenda.id)}
                  color="error">
                  <DeleteIcon/>
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      }
    </TableContainer>
    <Fab
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        color="primary"
        variant="extended"
        onClick={() => {setModalShowCrear(true)}}
      >
        <AddIcon sx={{ mr: 1 }} />
        Crear agenda
      </Fab>

      {modalShow && (
        <ModalVerAgenda
          open={modalShow}
          onClose={() => setModalShow(false)}
          agendaSeleccionado={agendaSeleccionado}
        />
      )}
      {modalShowCrear && (
        <CrearAgenda
          open={modalShowCrear}
          onClose={() => setModalShowCrear(false)}
          setEstado={setEstado}
        />
      )}

    </Container>
  )             
}