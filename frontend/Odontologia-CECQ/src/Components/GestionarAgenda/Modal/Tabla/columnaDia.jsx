import { Button, ButtonGroup, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { StyledTableCell } from '../../../MaterialUI/styledTable';

export function ColumnaDia({ turnos, rowIndex, handleDelete, setEstado }) {
  // Función para calcular la diferencia entre dos horas en minutos
  const calcularDiferenciaHoras = (horaInicio, horaFin) => {
    const [inicioHoras, inicioMinutos] = horaInicio.split(':').map(Number);
    const [finHoras, finMinutos] = horaFin.split(':').map(Number);
    
    const inicioEnMinutos = inicioHoras * 60 + inicioMinutos;
    const finEnMinutos = finHoras * 60 + finMinutos;
    
    return finEnMinutos - inicioEnMinutos;
  }

  return (
    <StyledTableCell align="center">
      {turnos[rowIndex]?.horaInicio ? (
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <Box
            sx={{
              padding: '8px',
              borderRadius: '4px',
              display: 'inline-block',
              height: `${calcularDiferenciaHoras(turnos[rowIndex].horaInicio, turnos[rowIndex].horaFin)}px`, // Ajusta la altura
              backgroundColor: '#f0f0f0',
            }}
          >
            {`${turnos[rowIndex].horaInicio} - ${turnos[rowIndex].horaFin}`}
          </Box>
          <Button onClick={() => {
            handleDelete(turnos[rowIndex].id);
            setEstado('Eliminado')
            }}>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      ) : (
        ''
      )}
    </StyledTableCell>
  );
}
