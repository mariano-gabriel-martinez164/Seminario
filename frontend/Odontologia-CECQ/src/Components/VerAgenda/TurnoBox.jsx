import ButtonBase from "@mui/material/ButtonBase";
import { parse, differenceInMinutes } from "date-fns";
import "./TurnoBox.css";

function TurnoBox(turno) {
  const { horaInicio, horaFin } = turno;
  const horario = `${horaInicio.slice(0, 5)} - ${horaFin.slice(0, 5)}`;
  const horaInicioDate = parse(horaInicio, "HH:mm:ss", new Date());
  const horaFinDate = parse(horaFin, "HH:mm:ss", new Date());
  const duracion = differenceInMinutes(horaFinDate, horaInicioDate);
  const paciente = turno.paciente
    ? `${turno.paciente.apellido}, ${turno.paciente.nombre[0]}.`
    : null;
  const estado = turno.esSobreturno ? `${turno.estado} - ST` : turno.estado;
  const coloresEstado = {
    Disponible: "primary",
    Asignado: "warning",
    Cancelado: "error",
    Realizado: "success",
  };
  console.log(turno.estado);
  console.log(coloresEstado[turno.estado]);

  const handleClick = () => {
    if (turno.id === null) {
      console.log("TurnoTemplate - Abrir creación de turno");
    } else {
      console.log(
        `Turno ${turno.id}, ${turno.estado} - Abrir modificación de turno`
      );
    }
  };

  return (
    <ButtonBase
      spacing={5}
      sx={{
        height: duracion*2,
        bgcolor: `${coloresEstado[turno.estado]}.light`,
        borderRadius: 2,
        // ":hover": {
        //   bgcolor:`${coloresEstado[turno.estado]}.main`,
        //   cursor:'pointer',
        //   }
      }}
      className="turnoBox"
      onClick={handleClick}
    >
      <p>{paciente}</p>
      <p>{horario}</p>
      <p>{estado}</p>
    </ButtonBase>
  );
}

export default TurnoBox;
