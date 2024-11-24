import ReciboPDF from "./reciboPDF";
import React, { useEffect } from "react";
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@mui/material";
import { useFetch } from "../../../Request/v2/fetch";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export function Recibo({ range, turnos, odontologo }) {
  const [agendas, setAgendas] = useState([]);

  let agendaURL = "/agendas/";
  if (odontologo) agendaURL += `?odontologo=${odontologo?.matricula}`;
  const dataAgendas = useFetch(agendaURL);

  useEffect(() => {
    if (dataAgendas.data) {
      setAgendas(
        dataAgendas.data.map((agenda) => {
          const montoAgenda = turnos.reduce((montoTotal, turno) => {
            if (turno?.agenda == agenda.id) {
              return montoTotal + turno?.monto;
            } else {
              return montoTotal;
            }
          }, 0);

          const agendaTurnos = turnos
            .map((turno) => {
              if (turno?.agenda == agenda.id) {
                return {
                  paciente: {
                    nombre: turno?.paciente.nombre,
                    apellido: turno?.paciente.apellido,
                  },
                  fecha: turno?.fecha,
                  monto: turno?.monto,
                  id: turno?.id,
                };
              } else {
                return null;
              }
            })
            .filter((turno) => turno != null);

          return {
            id: agenda?.id,
            monto: montoAgenda,
            turnos: agendaTurnos,
            centro: {
              nombre: agenda?.CentroOdontologico.nombre,
              direccion: agenda?.CentroOdontologico.direccion,
            },
          };
        })
      );
    }
  }, [dataAgendas.data, turnos]);

  if ((turnos.length < 1) | (odontologo == "")) {
    return <></>;
  }

  if ( odontologo != null ){
    return (
      <PDFDownloadLink
        document={
          <ReciboPDF range={range} agendas={agendas} odontologo={odontologo} />
        }
        fileName={`recibo-${odontologo.nombre}-${odontologo.apellido}.pdf`}
        style={{ textDecoration: "none" }}
      >
        {({ loading, url, error, blob }) =>
          loading ? (
            <Button variant="contained" disabled>
              <PictureAsPdfIcon /> Cargando..
            </Button>
          ) : (
            <Button variant="contained">
              <PictureAsPdfIcon /> Descargar Recibo
            </Button>
          )
        }
      </PDFDownloadLink>
    );
  }
}
