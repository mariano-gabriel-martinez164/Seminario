import React from 'react'
import { useState } from 'react';
import './facturaciones.css'
import Grid from '@mui/material/Grid2'
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
import { useFetchTurnos } from '../../Request/v2/fetch.js';


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

  const { data, loading, error } = useFetchTurnos(
    range[0].startDate,
    range[0].endDate,

    odontologoID=odontologo?.id,
    estados='Realizado',
  );
  
  return (
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
          isWeek
        /> 
      </Grid>
      <Grid size={8}>
        <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <StyledTableRow>
                  {
                    ['odontologo', 'fecha', 'hora', 'paciente', 'agenda', 'monto', ''].map((header, index) => (
                      <StyledTableCell key={index}>{header}</StyledTableCell>
                    ))
                  }
                </StyledTableRow>
              </TableHead>
              <TableBody>
                
              </TableBody>
            </Table>
          </TableContainer>

      </Grid>
    </Grid>
  )
}

function GetOdontologoMatricula(Odnt){
  return Odnt?.matricula;
}