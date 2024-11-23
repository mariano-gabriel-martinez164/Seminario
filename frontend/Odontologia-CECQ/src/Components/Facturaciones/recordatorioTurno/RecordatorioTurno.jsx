import React, { useEffect } from "react";
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReciboPDF from "./RecordatorioTurnoPDF.jsx";
import { Button } from "@mui/material";
import { useFetch } from "../../../Request/v2/fetch";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

function RecordatorioTurno({turno}){
  const agendas = useFetch("/agendas/")
  const [agenda, setAgenda] = useState([])
  useEffect(() => {
    if (agendas.data){
      setAgenda(agendas.data.filter(ag => ag.id == turno.agenda))
    }
  },[agendas.data, agendas.loading]);
  
  if (agenda.length < 1){
    return (
    <Button variant="contained">
      <PictureAsPdfIcon /> Cargando..
    </Button>);
  }

  return (
    <PDFDownloadLink
      document={<ReciboPDF 
        centro = {agenda[0].CentroOdontologico}
        turno = {turno}
        odontologo = {agenda[0].odontologo}
      />}
      fileName="recordatorio-de-turno.pdf"
      style={{ textDecoration: "none" }}
    >
      <Button variant="contained">
        <PictureAsPdfIcon /> Descargar Recibo
      </Button>
    </PDFDownloadLink>
  );
}

export default RecordatorioTurno;
