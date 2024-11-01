import React, { useEffect } from "react";
import { useState } from "react";
import "./facturaciones.css";
import Grid from "@mui/material/Grid2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { StyledTableCell, StyledTableRow } from "../MaterialUI/styledTable.jsx";
import Paper from "@mui/material/Paper";
import { SelectorCalendario } from "../MaterialUI/selectorCalendario.jsx";
import addDays from "date-fns/addDays";
import { SelectorOdontologo } from "../MaterialUI/selectores.jsx";
import useFetchTurnos from "../../Request/v2/fetchTurnos.js";
import { format } from "date-fns";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Button, Box } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import RecivoPDF from "./Recivo/recivoPDF.jsx";
import { useFetch } from "../../Request/v2/fetch";

export default function facturaciones() {
  const defaultRange = [
    {
      startDate: addDays(new Date(), 1 - new Date().getDay()),
      endDate: addDays(new Date(), 7 - new Date().getDay()),
      key: "selection",
    },
  ];
  const [odontologo, setOdontologo] = useState("");
  const [range, setRange] = useState(defaultRange);
  const [turnos, setTurnos] = useState([]);
  const [monto, setMonto] = useState(0);
  const [agendas, setAgendas] = useState([]);

  let agendaURL = "/agendas/"
  if (odontologo){
    agendaURL+=`?odontologo=${odontologo?.matricula}`
  }

  const dataAgenda = useFetch(agendaURL);

  const { data, loading, error } = useFetchTurnos(
    range[0].startDate,
    range[0].endDate,
    "",
    odontologo?.matricula,
    "",
    "",
    "",
    null,
    ["Realizado"]
  );

  useEffect(() => {
    if (data) {
      setTurnos(
        data.map((turno) => {
          return {
            odontologo: odontologo?.nombre + " " + odontologo?.apellido,
            paciente: turno?.paciente.nombre + " " + turno?.paciente.apellido,
            fecha: turno?.fecha,
            agenda: turno?.agenda,
            monto: turno?.monto,
          };
        })
      );

      setMonto(
        data.reduce((montoTotal, turno) => {
          return montoTotal + turno?.monto;
        }, 0)
      );
    }

    if (dataAgenda.data) {
      setAgendas( dataAgenda.data.map((agenda) => {

        const montoAgenda = data.reduce((montoTotal, turno) => {
          if (turno?.agenda == agenda.id) {
            return montoTotal + turno?.monto;
          } else {
            return montoTotal;
          }
        }, 0);

        return {
          id: agenda?.id,
          monto: montoAgenda,
          centro: {
            nombre: agenda?.CentroOdontologico.nombre,
            direccion: agenda?.CentroOdontologico.direccion
          }
        }
      }));
    }
  }, [data]);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          my: 4,
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid size={3}>
          <SelectorOdontologo
            selectedValue={odontologo}
            setSelectedValue={setOdontologo}
          />
        </Grid>

        <Grid size={3}>
          <SelectorCalendario
            range={range}
            setRange={setRange}
            defaultRange={defaultRange}
          />
        </Grid>
        <Grid size={8}>
          <TableContainer component={Paper}>
            <Table aria-label="caption table">
              <TableHead>
                <StyledTableRow>
                  {["paciente", "fecha", "agenda", "monto"].map(
                    (header, index) => (
                      <StyledTableCell key={index}>{header}</StyledTableCell>
                    )
                  )}
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
                    <StyledTableCell>{turno.paciente}</StyledTableCell>
                    <StyledTableCell>
                      {format(turno.fecha, "MMM dd")}
                    </StyledTableCell>
                    <StyledTableCell>{turno.agenda}</StyledTableCell>
                    <StyledTableCell>
                      <AttachMoneyIcon fontSize="small" color="action" />
                      {turno.monto}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow>
                  <StyledTableCell>Total</StyledTableCell>
                  <StyledTableCell>
                    {format(range[0].startDate, "MMM-dd") +
                      " - " +
                      format(range[0].endDate, "MMM-dd")}
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>
                    <AttachMoneyIcon fontSize="small" color="action" />
                    {monto.toFixed(2)}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid size={8} sx={{ textAlign: "center" }}>
          <PDFDownloadLink
            document={
              <RecivoPDF
                range={range}
                agendas={agendas}
                odontologo={odontologo}
              />
            }
            fileName="recivo.pdf"
            style={{ textDecoration: "none" }}
          >
            <Button variant="contained">
              <PictureAsPdfIcon /> Descargar Recivo
            </Button>
          </PDFDownloadLink>
        </Grid>
      </Grid>
    </>
  );
}
