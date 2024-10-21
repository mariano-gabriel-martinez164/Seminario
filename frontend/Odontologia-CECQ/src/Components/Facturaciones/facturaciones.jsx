import React, { useEffect } from 'react'
import { useState } from 'react';
import './facturaciones.css';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {StyledTableCell, StyledTableRow} from '../MaterialUI/styledTable.jsx';
import Paper from '@mui/material/Paper';
import { SelectorCalendario } from '../MaterialUI/selectorCalendario.jsx';
import addDays from 'date-fns/addDays';
import { SelectorOdontologo } from '../MaterialUI/selectores.jsx';
import useFetchTurnos from '../../Request/v2/fetchTurnos.js';
import { format } from 'date-fns';
import { Button } from '@mui/material';
import { Recivo, RecivoPDF } from './Recivo/recivo.jsx'
import { Modal } from '@mui/material';
import { Box, Typography } from '@mui/material';

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
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [open, setOpen] = useState(false);
  
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
  }, [odontologo, range, data])

  const handleOpen = (turno) => {
    setSelectedTurno(turno);
    setOpen(true);
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setOpen(false);
    setSelectedTurno(null);
  };
  
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
                    ['odontologo', 'paciente', 'fecha', 'agenda', 'monto', '        '].map((header, index) => (
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
                    <StyledTableCell>
                      <Button variant='text' onClick={() => handleOpen(turno)}> Ver mas... </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
    </Grid>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        p: 4,
        borderRadius: 2,
        mx: 'auto',
        mt: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 400,
      }}
    >
        {selectedTurno==null ? (
          <></>
        ):(
          <Recivo
            origin={selectedTurno.paciente}
            destination={selectedTurno.odontologo}
            dateTime={format(selectedTurno.fecha, "MMM dd, yyyy")}
            reference={'lol'}
            amount={selectedTurno.monto}>
          </Recivo>
        )}
    </Modal>
    </>
  )
}