import { Fab, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Container, IconButton, Alert, OutlinedInput, InputAdornment, FormControl, FormHelperText } from "@mui/material/"
import Grid from "@mui/material/Grid2"
import AddIcon from "@mui/icons-material/Add"
import { StyledTableCell, StyledTableRow } from '../MaterialUI/styledTable.jsx';
import { useState, useEffect } from 'react'
import { useFetchSearch } from '../../Request//v2/fetch.js';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteData } from "../../Request/delete.js";
import SearchIcon from '@mui/icons-material/Search';
import CrearPrestacion from "./crearPrestacion.jsx";

export default function GestionarPrestacion() {
  const [modalShowCrear, setModalShowCrear] = useState(false);
  const [estado, setEstado] = useState('');
  const [prestacion, setPrestacion] = useState(''); 
  const parseData = (data) => data;
  const [ data, loading, error, searchData ] = useFetchSearch('/prestaciones/', 300, parseData);

  useEffect(() => {
      searchData(prestacion);
  }, [prestacion, estado]);

  const handleDelete = async (id) => {
    try {
      await deleteData(`/prestaciones/${id}/`);
      setEstado('eliminado');
    } catch (err) {
      console.error('Error eliminando prestacion:', err);
    }
  };

  return (
    <Container fixed sx={{ mt: 2 }}>
      <FormControl sx={{ width:'100%', mb:2 }} variant="outlined">
          <OutlinedInput
            endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
            placeholder="Buscar prestacion"
            value={prestacion}
            onChange={(e) => setPrestacion(e.target.value)}
          />
        </FormControl>
      
      <TableContainer component={Paper}>
        {loading && <Alert severity="info" sx={{width:'100%'}}>Cargando...</Alert>}
        {error && <Alert severity="error" sx={{width:'100%'}}>{error}</Alert>}
        {data && !loading && !error &&
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Precio</StyledTableCell>
            <StyledTableCell align="center">Opcion</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((prestacion) => (
            <StyledTableRow key={prestacion.codigo}>
              <StyledTableCell align="center">{prestacion.nombre}</StyledTableCell>
              <StyledTableCell align="center">{prestacion.precio}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton 
                onClick={() => handleDelete(prestacion.codigo)}
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
        Crear prestacion
      </Fab>

      {modalShowCrear && (
        <CrearPrestacion
          open={modalShowCrear}
          onClose={() => setModalShowCrear(false)}
          setEstado={setEstado}
        />
      )}
    </Container>
  )             
}