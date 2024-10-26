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
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [open, setOpen] = useState(false);
  const [monto, setMonto] = useState(0);

  const { data, loading, error } = useFetchTurnos(
    range[0].startDate,
    range[0].endDate,

    "",
    odontologo?.id,
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
      setMonto(() => {
        var total = 0;
        var indice = 0;
        while (data[indice] != null) {
          total += data[indice]?.monto;
          indice++;
        }
        return total;
      });
    }
  }, [odontologo, range, data]);

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
                  {[
                    "paciente",
                    "fecha",
                    "agenda",
                    "monto",
                  ].map((header, index) => (
                    <StyledTableCell key={index}>{header}</StyledTableCell>
                  ))}
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
                  {format(range[0].startDate,"MMM-dd") + " - " + format(range[0].endDate,"MMM-dd")}
                  </StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>
                    <AttachMoneyIcon fontSize="small" color="action" />{monto.toFixed(2)}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
