import { Button, Table, TableBody, TableHead, TableRow, ButtonGroup } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../MaterialUI/styledTable';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteData } from '../../../Request/delete';

export default function Tabla({ turnosPorDia }) {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  const maxTurnos = Math.max(
    turnosPorDia.lunes.length,
    turnosPorDia.martes.length,
    turnosPorDia.miercoles.length,
    turnosPorDia.jueves.length,
    turnosPorDia.viernes.length
  );

  const handleDelete = (turnoId) => {
    deleteData(`/turnotemplates/${turnoId}/`);
  }

  return (
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
    <TableHead>
      <TableRow>
        {days.map((day) => (
          <StyledTableCell key={day} align="center">
            {day}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {/* Iterar sobre el número máximo de turnos para crear tantas filas como sea necesario */}
      {[...Array(maxTurnos)].map((_, rowIndex) => (
        <StyledTableRow key={rowIndex}>
          <StyledTableCell align="center">
            {turnosPorDia.lunes[rowIndex]?.horaInicio ? (
              <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button variant="contained">
                  {`${turnosPorDia.lunes[rowIndex].horaInicio} - ${turnosPorDia.lunes[rowIndex].horaFin}`}
                </Button>
                <Button onClick={() => handleDelete(turnosPorDia.lunes[rowIndex].id)}>
                  <DeleteIcon />
                </Button>
              </ButtonGroup>
            ) : (
              ''
            )}
          </StyledTableCell>
          <StyledTableCell align="center">
            {turnosPorDia.martes[rowIndex]?.horaInicio ? (
              <Button variant="contained">
                {`${turnosPorDia.martes[rowIndex].horaInicio} - ${turnosPorDia.martes[rowIndex].horaFin}`}
              </Button>
            ) : (
              ''
            )}
          </StyledTableCell>
          <StyledTableCell align="center">
            {turnosPorDia.miercoles[rowIndex]?.horaInicio ? (
              <Button variant="contained">
                {`${turnosPorDia.miercoles[rowIndex].horaInicio} - ${turnosPorDia.miercoles[rowIndex].horaFin}`}
              </Button>
            ) : (
              ''
            )}
          </StyledTableCell>
          <StyledTableCell align="center">
            {turnosPorDia.jueves[rowIndex]?.horaInicio ? (
              <Button variant="contained">
                {`${turnosPorDia.jueves[rowIndex].horaInicio} - ${turnosPorDia.jueves[rowIndex].horaFin}`}
              </Button>
            ) : (
              ''
            )}
          </StyledTableCell>
          <StyledTableCell align="center">
            {turnosPorDia.viernes[rowIndex]?.horaInicio ? (
              <Button variant="contained">
                {`${turnosPorDia.viernes[rowIndex].horaInicio} - ${turnosPorDia.viernes[rowIndex].horaFin}`}
              </Button>
            ) : (
              ''
            )}
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
  )
}
