import React, { useEffect } from "react";
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import RecivoPDF from "./RecivoV2/RecivoPDF.jsx";
import { Button } from "@mui/material";

export function Recivo(odontologo){
  const { data, loading, error } = useFetch("/agendas/?odontologo=" + odontologo?.matricula + "&CentroOdontologico=")
  const [centro, setCentro] = useState([]);

  useEffect(() => {
  }, [data]);

  return (
    <PDFDownloadLink
      document={<RecivoPDF />}
      fileName="recivo.pdf"
      style={{ textDecoration: "none" }}
    >
      <Button variant="contained">
        <PictureAsPdfIcon /> Descargar Recivo
      </Button>
    </PDFDownloadLink>
  );
}