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
import { Recibo } from "./Recibo/recibo.jsx";
import Typography from "@mui/material/Typography";

export default function Facturaciones() {
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
            odontologo: {
              nombre: odontologo?.nombre,
              apellido: odontologo?.apellido,
            },
            paciente: {
              nombre: turno?.paciente.nombre,
              apellido: turno?.paciente.apellido,
            },
            id: turno?.id,
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
        <Grid size={12} xs={12} sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" component="h1" color="primary">
            Facturaciones
          </Typography>
        </Grid>
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
                      `${turno.paciente.nombre} ${turno.paciente.apellido}-${turno.agenda}-${turno.fecha}`
                    }
                  >
                    <StyledTableCell>
                      {turno.paciente.nombre} {turno.paciente.apellido}
                    </StyledTableCell>
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
                {monto != 0 ? (
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
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid size={8} sx={{ textAlign: "center" }}>
          <Recibo turnos={turnos} range={range} odontologo={odontologo} />
        </Grid>
      </Grid>
    </>
  );
}
