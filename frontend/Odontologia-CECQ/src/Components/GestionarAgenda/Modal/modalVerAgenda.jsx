import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Slide, IconButton, Toolbar, AppBar, Dialog, Box, Typography, Paper, TableContainer, Fab } from '@mui/material/';
import { useFetch, useFetchArray } from '../../../Request/fetch';
import { addDays } from 'date-fns';
import { useState } from 'react';
import Tabla from './tabla';
import AgruparTurnos from './agruparTurnos';
import AddIcon from '@mui/icons-material/Add';
import { ModalCrearTemplate } from './modalCrearTemplate';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalVerAgenda({open, onClose, agendaSeleccionado}) {

  const [modalShowCrear, setModalShowCrear] = useState(false);
  const dataAgenda = useFetch(`/agendas/${agendaSeleccionado}/`);
  
  const defaultRange = [{
    startDate: addDays(new Date(), 1 - new Date().getDay()),
    endDate: addDays(new Date(), 7 - new Date().getDay()),
    key: "selection",
  }];

  const dataTemplate = useFetchArray(`/turnotemplates/?agenda=${agendaSeleccionado}`);
  const [turnosPorDia, setTurnosPorDia] = useState({
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: [],
  });

  return (
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        {/* retorna null, es solo para cargar turnos por dia */}
        <AgruparTurnos dataTemplate={dataTemplate} setTurnosPorDia={setTurnosPorDia} />
        <AppBar sx={{ position: 'relative', backgroundColor:'white' }}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexDirection: 'column', 
            width: '100%' 
          }}
        >
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ fontWeight: 'bold', width: '100%', textAlign: 'center', mt: 2, mb: 2 }}
          >
            {dataAgenda?.odontologo?.nombre} - {dataAgenda?.CentroOdontologico?.nombre}
          </Typography>
        </Box>
                    
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column', 
          width: '100%' 
        }}>
        <TableContainer component={Paper} sx={{width:'80%'}}>
          <Tabla turnosPorDia={turnosPorDia}/>
        </TableContainer>
        </Box>
        <Fab
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        color="primary"
        variant="extended"
        onClick={() => {
          setModalShowCrear(true);
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Crear turno vacio
      </Fab>
      {modalShowCrear && (
        <ModalCrearTemplate
          open={modalShowCrear} 
          onClose={() => setModalShowCrear(false)}
        />
      )}
      </Dialog>
  );
}