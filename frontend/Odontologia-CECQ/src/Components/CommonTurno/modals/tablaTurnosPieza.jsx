import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {StyledTableCell, StyledTableRow} from '../../MaterialUI/styledTable.jsx';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { useMemo } from 'react';


export function TablaTurnosPieza({piezas, prestaciones ,turnosPieza, setTurnosPieza}) {


  const data = useMemo(() => {
    const getPrestacion = (codigo) => {return prestaciones.find(p => p.codigo === codigo);}
    const getPieza = (codigo) => {return piezas.find(p => p.codigo === codigo);}

    if (!turnosPieza) return [];
    return turnosPieza.map((tp, i) => {
      const pieza = getPieza(tp.pieza);
      const prestacion = getPrestacion(tp.prestacion);
      return {
        id: i,
        pieza: `(${pieza.codigo}) ${pieza.nombre}`,
        practica: prestacion.nombre,
        monto: prestacion.precio,
    }})

  }, [turnosPieza, piezas, prestaciones]);

  const handleDelete = (id) => {
    setTurnosPieza(turnosPieza.filter(t => t !== turnosPieza[id]));
  }

  return (
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align="center">Pieza Dental</StyledTableCell>
          <StyledTableCell align="center">Práctica</StyledTableCell>
          <StyledTableCell align="center">Monto</StyledTableCell>
          <StyledTableCell align="center"></StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((d) => (
          <StyledTableRow key={d.id}>
            <StyledTableCell align="center">{d.pieza}</StyledTableCell>
            <StyledTableCell align="center">{d.practica}</StyledTableCell>
            <StyledTableCell align="center">{d.monto}</StyledTableCell>
            <StyledTableCell align="center">
            <IconButton aria-label="delete" onClick={()=>handleDelete(d.id)}>
              <DeleteIcon />
            </IconButton>
            </StyledTableCell>
          </StyledTableRow>
        ))}
        {data.length === 0 && (
          <StyledTableRow>
            <StyledTableCell align="center" colSpan={4}>No Hay prácticas seleccionadas. Seleccione la/s pieza/s dental/es y luego la práctica que se realizó en ellas. </StyledTableCell>
          </StyledTableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>

  )

}