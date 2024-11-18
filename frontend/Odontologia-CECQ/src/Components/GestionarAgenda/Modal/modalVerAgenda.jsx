import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Slide, IconButton, Toolbar, AppBar, Dialog, Box, Typography, Paper, TableContainer, Fab, Alert } from '@mui/material/';
import { useFetch, useFetchDataOnDemand } from '../../../Request/v2/fetch';
import { useState, useEffect } from 'react';
import Tabla from './Tabla/tabla';
import AgruparTurnos from './agruparTurnos';
import AddIcon from '@mui/icons-material/Add';
import { ModalCrearTemplate } from './TurnoTemplate/modalCrearTemplate';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalVerAgenda({open, onClose, agendaSeleccionado}) {

  const [modalShowCrear, setModalShowCrear] = useState(false);
  const { data: dataAgenda, loading: isLoading, error } = useFetch(`/agendas/${agendaSeleccionado}/`);
  const [estado, setEstado] = useState(null);
  
  const url = `/turnotemplates/?agenda=${agendaSeleccionado}`;
  const { data: dataTemplate, loading: isLoading2, error2, fetchData}  = useFetchDataOnDemand(url);
 
  useEffect(() => {
    fetchData();
    setEstado('');
  }, [url, estado]);

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
        {isLoading && <Alert severity="info" sx={{width:'100%'}}>Cargando...</Alert>}
        {error && <Alert severity="error" sx={{width:'100%'}}>{error}</Alert>}
        {dataAgenda && !isLoading && !error && 
        <>
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
          {isLoading2 && <Alert severity="info" sx={{width:'100%'}}>Cargando...</Alert>}
          {error2 && <Alert severity="error" sx={{width:'100%'}}>{error}</Alert>}
          {dataTemplate && !isLoading2 && !error2 &&
            <Tabla turnosPorDia={turnosPorDia} setEstado={setEstado}/>
          }
        </TableContainer>
        </Box>
        </>
    }
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