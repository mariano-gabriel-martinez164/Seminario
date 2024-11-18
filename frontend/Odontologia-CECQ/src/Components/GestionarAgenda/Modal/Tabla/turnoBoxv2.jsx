import { Box, IconButton } from "@mui/material";
import { parse, differenceInMinutes } from "date-fns";
import CloseIcon from '@mui/icons-material/Close';


function TurnoBoxv2({ turnos, handleDelete, setEstado }) {

  const renderTurnos = () => {

    return turnos.map((turno, index) => {
      const { horaInicio, horaFin } = turno;

      const horario = `${horaInicio.slice(0, 5)} - ${horaFin.slice(0, 5)}`;
      const horaInicioDate = parse(horaInicio, "HH:mm:ss", new Date());
      const horaFinDate = parse(horaFin, "HH:mm:ss", new Date());
      const duracion = differenceInMinutes(horaFinDate, horaInicioDate);

      return (
        <Box
          key={index}
          spacing={5}
          sx={{
            height: duracion * 2,
            borderRadius: 2,
            backgroundColor: "#f0f0f0",
            mt: 2,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative', // Añadir esto
          }}
          className="turnoBox"
        >
          <p>{horario}</p>
          
          <IconButton 
            onClick={() => {
              handleDelete(turno.id);
              setEstado('Eliminado');
            }} 
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      );
    });
  };

  return (
    <div>
      <div>
        <div>{renderTurnos()}</div>
      </div>
    </div>
  );
}

export default TurnoBoxv2;
