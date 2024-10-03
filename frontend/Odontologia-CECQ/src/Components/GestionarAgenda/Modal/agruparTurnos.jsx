import { useEffect } from "react";

const AgruparTurnos = ({ dataTemplate, setTurnosPorDia }) => {
  useEffect(() => {
    if (dataTemplate) {
      const turnosAgrupados = {
        lunes: [],
        martes: [],
        miercoles: [],
        jueves: [],
        viernes: [],
      };

      dataTemplate.forEach((turno) => {
        switch (turno.diaSemana) {
          case 0:
            turnosAgrupados.lunes.push(turno);
            break;
          case 1:
            turnosAgrupados.martes.push(turno);
            break;
          case 2:
            turnosAgrupados.miercoles.push(turno);
            break;
          case 3:
            turnosAgrupados.jueves.push(turno);
            break;
          case 4:
            turnosAgrupados.viernes.push(turno);
            break;
          default:
            break;
        }
      });

      setTurnosPorDia(turnosAgrupados);
    }
  }, [dataTemplate, setTurnosPorDia]);
  return null; // Este componente no necesita renderizar nada
};

export default AgruparTurnos;