import { format } from 'date-fns';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {StyledTableCell, StyledTableRow} from '../MaterialUI/styledTable.jsx';

import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import estadosChips from '../CommonTurno/estadosChips.js';

export function TablaTurnos({ turnos, handleClickTurno, loading }) {
  const formatHour = (hour) => {
    const [hourString, minuteString] = hour.split(':');
    return `${hourString.padStart(2, '0')}:${minuteString.padStart(2, '0')}`;
    
  }
  if (!turnos) return null;
  
  return (
    <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <StyledTableRow>
          {
            ['Fecha', 'Hora', 'Paciente', 'Agenda', 'Estado', ''].map((header, index) => (
              <StyledTableCell key={index}>{header}</StyledTableCell>
            ))
          }
        </StyledTableRow>
      </TableHead>
      <TableBody>
        {turnos.map((turno) => (
          <StyledTableRow
            key={
              turno.id ||
              `${turno.paciente}-${turno.agenda}-${turno.fecha}`
            }
          >
            <StyledTableCell>{format(turno.fecha, "MMM dd")}</StyledTableCell>
            <StyledTableCell>
              {formatHour(turno.horaInicio)} -{" "}
              {formatHour(turno.horaFin)}
            </StyledTableCell>
            <StyledTableCell>
              {
                turno.paciente
                && `${turno.paciente.apellido}, ${turno.paciente.nombre[0]}.`  

              }
            </StyledTableCell>
            <StyledTableCell>{turno.agenda}</StyledTableCell>
            <StyledTableCell>
              <Chip
                label={turno.estado}
                color={estadosChips[turno.estado]}
              />
            </StyledTableCell>

            <StyledTableCell>
              <Button
                color="primary"
                onClick={handleClickTurno.bind(this, turno)}
              >Ver más...</Button>
            </StyledTableCell>

          </StyledTableRow>
        ))}
      
        {
          turnos.length === 0 && !loading &&
          <StyledTableRow>
            <StyledTableCell colSpan={6}>
              No se encontraron turnos para la búsqueda realizada
            </StyledTableCell>
          </StyledTableRow>
        }
        {
          loading &&
          <StyledTableRow>
            <StyledTableCell colSpan={6}>
              Cargando...
            </StyledTableCell>
          </StyledTableRow>
        }
      </TableBody>
    </Table>
  </TableContainer>
);}