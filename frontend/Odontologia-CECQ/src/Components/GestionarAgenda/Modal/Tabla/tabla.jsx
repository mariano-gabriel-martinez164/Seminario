import { Table, TableBody, TableHead, TableRow } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../../../MaterialUI/styledTable';
import { deleteData } from '../../../../Request/delete';
import { ColumnaDia } from './columnaDia'; // Importa el nuevo componente

export default function Tabla({ turnosPorDia, setEstado }) {
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
            <ColumnaDia turnos={turnosPorDia.lunes} rowIndex={rowIndex} handleDelete={handleDelete} setEstado={setEstado}/>
            <ColumnaDia turnos={turnosPorDia.martes} rowIndex={rowIndex} handleDelete={handleDelete} setEstado={setEstado}/>
            <ColumnaDia turnos={turnosPorDia.miercoles} rowIndex={rowIndex} handleDelete={handleDelete} setEstado={setEstado}/>
            <ColumnaDia turnos={turnosPorDia.jueves} rowIndex={rowIndex} handleDelete={handleDelete} setEstado={setEstado}/>
            <ColumnaDia turnos={turnosPorDia.viernes} rowIndex={rowIndex} handleDelete={handleDelete} setEstado={setEstado}/>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  )
}
