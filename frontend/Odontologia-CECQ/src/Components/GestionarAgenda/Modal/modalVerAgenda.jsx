import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Slide, IconButton, Toolbar, AppBar, Dialog, Box, Typography, Paper, TableContainer, Fab } from '@mui/material/';
import { useFetch } from '../../../Request/fetch';
import { useState, useEffect } from 'react';
import Tabla from './Tabla/tabla';
import AgruparTurnos from './agruparTurnos';
import AddIcon from '@mui/icons-material/Add';
import { ModalCrearTemplate } from './TurnoTemplate/modalCrearTemplate';
import { apiUrl, token } from '../../../Request/fetch';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalVerAgenda({open, onClose, agendaSeleccionado}) {

  const [modalShowCrear, setModalShowCrear] = useState(false);
  const dataAgenda = useFetch(`/agendas/${agendaSeleccionado}/`);
  const [ dataTemplate, setDataTemplate ] = useState(null);
  const [estado, setEstado] = useState(null);
  
  useEffect(() => { 
    if (dataAgenda) {
      fetch(`${apiUrl}/turnotemplates/?agenda=${agendaSeleccionado}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
          }
        })
        .then((response) => response.json())
        .then((data) => setDataTemplate(data));
        setEstado(null);
    }
  }, [dataAgenda, estado]);

    
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
          <Tabla turnosPorDia={turnosPorDia} setEstado={setEstado}/>

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
          agendaSeleccionado={agendaSeleccionado}
          setEstado={setEstado}
        />
      )}
      </Dialog>
  );
}