import React, { useEffect } from 'react'
import { useState } from 'react';
import './facturaciones.css';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {StyledTableCell, StyledTableRow} from '../MaterialUI/styledTable.jsx';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { SelectorCalendario } from '../MaterialUI/selectorCalendario.jsx';
import addDays from 'date-fns/addDays';
import { SelectorOdontologo } from '../MaterialUI/selectores.jsx';
import useFetchTurnos from '../../Request/v2/fetchTurnos.js';
import { format } from 'date-fns';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Divider from '@mui/material/Divider';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function facturaciones() {
  const defaultRange = [
    {
      startDate: addDays(new Date(), 1 - new Date().getDay()),
      endDate: addDays(new Date(), 7 - new Date().getDay()),
      key: "selection",
    },
  ];
  const [odontologo, setOdontologo] = useState('')
  const [range, setRange] = useState(defaultRange);
  const [turnos, setTurnos] = useState([]);
  
  const { data, loading, error } = useFetchTurnos(
    range[0].startDate,
    range[0].endDate,
    
    '',
    odontologo?.id,
    '',
    '',
    '',
    null,
    ['Realizado'],
  );
  
  useEffect(() =>{
    if(data){
      setTurnos(data.map( (turno) => {
        return {
          odontologo: odontologo?.nombre+' '+odontologo?.apellido,
          paciente: turno?.paciente.nombre+' '+turno?.paciente.apellido,
          fecha: turno?.fecha,
          agenda: turno?.agenda,
          monto: turno?.monto}
      }))
      console.log(turnos)
    }
  }, [odontologo, range])
  
  return (
    <>
    <Grid container spacing={2} sx={{my:4, alignItems:'center', display:'flex', justifyContent:'center'}}>
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
            <Table>
              <TableHead>
                <StyledTableRow>
                  {
                    ['odontologo', 'paciente', 'fecha', 'agenda', 'monto'].map((header, index) => (
                      <StyledTableCell key={index}>{header}</StyledTableCell>
                    ))
                  }
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {turnos.map((turno)=>(
                  <StyledTableRow key={
                    turno.id ||
                    `${turno.paciente}-${turno.agenda}-${turno.fecha}`
                  }>
                    <StyledTableCell>{turno.odontologo}</StyledTableCell>
                    <StyledTableCell>{turno.paciente}</StyledTableCell>
                    <StyledTableCell>{format(turno.fecha, "MMM dd")}</StyledTableCell>
                    <StyledTableCell>{turno.agenda}</StyledTableCell>
                    <StyledTableCell>{turno.monto}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
    </Grid>
      <Recivo origin='motomami' destination='mister xd' reference='donRandom' dateTime='9/11' amount='123'/>
    </>
  )
}


function Recivo (
  {origin,
  destination,
  reference,
  dateTime,
  amount}
) {
  return (
      <Card elevation={3} sx={{ maxWidth: 400, width: '80%' }}>
      <CardContent>
          <Typography variant="h5" component="h2" gutterBottom align="center" fontWeight="bold">
          Comprobante de Venta
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight="medium">Origen:</Typography>
                <Typography variant="body1">{origin}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <ArrowDownwardIcon/>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight="medium">Destino:</Typography>
                <Typography variant="body1">{destination}</Typography>
            </Box>
            <Divider sx={{ my: 2, borderBottomWidth: 2, bgcolor: 'rgba(0, 0, 0, 0.3)' }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight="medium">Tratamiento:</Typography>
                <Typography variant="body1">{reference}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle1" fontWeight="medium">Monto:</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AttachMoneyIcon fontSize="small" color="action" />
                <Typography variant="body1">{amount}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight="medium">Fecha:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarTodayIcon fontSize="small" color="action" />
                  <Typography variant="body1">{dateTime}</Typography>
                </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
                variant="contained"
                startIcon={<PictureAsPdfIcon />}
            >
                Descargar PDF
            </Button>
          </Box>
      </CardContent>
      </Card>
  );
}
