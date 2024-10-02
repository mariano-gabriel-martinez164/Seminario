import { Fab, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Container, Button } from "@mui/material/"
import Grid from "@mui/material/Grid2"
import AddIcon from "@mui/icons-material/Add"
import { StyledTableCell, StyledTableRow } from '../MaterialUI/styledTable.jsx';
import { SelectorOdontologo, SelectorCentro } from '../MaterialUI/selectores'
import { useState, useEffect } from 'react'
import { apiUrl, token } from '../../Request/fetch.js';
import  ModalVerAgenda  from './Modal/modalVerAgenda.jsx';
import CrearAgenda from './crearAgenda.jsx';
import { set } from "date-fns";

export default function GestionarAgenda() {
  const [agenda, setAgenda] = useState(null);
  const [centro, setCentro] = useState(null);
  const [ odontologo, setOdontologo ] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowCrear, setModalShowCrear] = useState(false);
  const [agendaSeleccionado, setAgendaSeleccionado] = useState(null);
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/agendas/?odontologo=${odontologo?.matricula ?? ''}&CentroOdontologico=${centro?.id ?? ''}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      })
      .then(response => response.json())
      .then(data => setAgenda(data),
      setEstado(null)
    );
    }, [odontologo, centro, estado]);

  return (
    <Container fixed sx={{ mt: 2, width:'50%' }}>
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
                <Button onClick={() => {
                  setModalShow(true);
                  setAgendaSeleccionado(agenda.id);
                }} className='w-100' variant="contained"> Opciones</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
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