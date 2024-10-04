import React from 'react';
import { Stack, Box, Divider, Paper } from '@mui/material/';
import TurnoBoxv2 from './turnoBoxv2';
import { deleteData } from '../../../../Request/delete';

export default function Tabla({ turnosPorDia, setEstado }) {
  
  const getDayHeaders = () => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    return days.map((day, index) => {
      return (
        <Box
          key={index}
          sx={{flex: 1, pt: 1, display: 'flex', justifyContent: 'center',}}>
          <h3>{day}</h3>
        </Box>
      );
    });
  };
  
  const handleDelete = (turnoId) => {
    deleteData(`/turnotemplates/${turnoId}/`);
  }

  const getTurnos = () => {
    return Object.keys(turnosPorDia).map((dia, index) => (
      <Box key={index} sx={{ flex: 1, p: 1 }}> 
        <TurnoBoxv2 turnos={turnosPorDia[dia]} handleDelete={handleDelete} setEstado={setEstado}/> 
      </Box>
    ));
  };

  return (
    <Paper elevation={3} sx={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      width: '100%',
    }}>
      <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={0}
      sx={{ 
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        bgcolor: '#343a40',
        color: 'white',
        borderRadius: '5px 5px 0 0',
      }}
    >
      {getDayHeaders()}
    </Stack>

    <Stack
    direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={0}
    sx={{ 
      width:'100%',
      justifyContent:'center',
      textAlign:'center',
      minHeight:'50vh',
    }}
    >
      {getTurnos()}
    </Stack>
  </Paper>
  );
}
