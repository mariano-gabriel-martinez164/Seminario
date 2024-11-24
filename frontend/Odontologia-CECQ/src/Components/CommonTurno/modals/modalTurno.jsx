import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Slide from '@mui/material/Slide';

import { Formulario } from './formularioTurno';
import { PanelTurnosPieza } from './panelTurnosPieza';

import RecordatorioTurno from '../../Facturaciones/recordatorioTurno/RecordatorioTurno';

const options = {
  'Disponible':{
    'transiciones':['Asignado', 'Cancelado'],
    'seleccionarPaciente':true,
    'color':'primary',
    'verbo':'Liberar',
  },
  'Asignado':{
    'transiciones':['Disponible', 'Cancelado', 'Realizado'],
    'seleccionarPaciente':false,
    'color':'warning',
    'verbo':'Asignar',
  },
  'Cancelado':{
    'transiciones':['Disponible'],
    'seleccionarPaciente':false,
    'color':'error',
    'verbo':'Cancelar',
  },
  'Realizado':{
    'transiciones':[],
    'seleccionarPaciente':false,
    'color':'success',
    'verbo':'Completar',
  },
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ModalTurno({ open, onHide, turno={}}) {

  const esSobreturno = Object.keys(turno).length === 0;
  // const esTurnoTemplate = turno?.id === null;
  const transicionesSobreturno = ['Asignado'];

  const [selectedEstado, setSelectedEstado] = useState(null);
  const [formOK, setFormOK] = useState(false);
  const [paso, setPaso] = useState(1);
  
  const [newTurno, setNewTurno] = useState(()=>{
    if (esSobreturno) {
      return {
        "id": null,
        "paciente": null,
        "fecha": null,
        "horaInicio": null,
        "horaFin": null,
        "esSobreturno": true,
        "monto": 0.0,
        "estado": null,
        "agenda": 2,
        "administrativo": null
      }
    }
    
    const newTurno = {...turno};
    delete newTurno['estado'];
    return newTurno;
  });
  
  const handleEstadoChange = (estado) => {
    setSelectedEstado(estado);
    setNewTurno({
      ...newTurno,
      estado: estado
    });
  }

  const [turnosPieza, setTurnosPieza] = useState([]);
  const setMonto = (monto) => {
    setNewTurno({
      ...newTurno,
      monto: monto
    });
  }

  const activarBotonConstancia = () => {
    if (turno.estado == 'Asignado') return true;
    if (turno.estado == 'Disponible' && formOK) return true;
    return false;
  }

  return(
    <Dialog open={open} onClose={onHide} fullScreen TransitionComponent={Transition}>
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onHide}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">Modificar el Estado de un Turno</Typography>
          {/* <Button autoFocus color="inherit" disabled onClick={onHide}>save</Button> */}
        </Toolbar>
      </AppBar>

      <Grid mt={2} gap={2}>
        <Grid mt={2} display={paso!=1&&'none'}>
          <Typography align='center' variant='h6'>Selecciona una acción:</Typography>
          <Botonera 
            listaEstados={esSobreturno ? transicionesSobreturno : options[turno.estado].transiciones} 
            estadoActual={turno.estado}
            setEstado={handleEstadoChange}
            selectedEstado={selectedEstado}
          />

          {/* {JSON.stringify(newTurno)}
          {selectedEstado} */}
          <Formulario 
            turno={turno} 
            newTurno={newTurno} 
            setNewTurno={setNewTurno} 
            esSobreturno={esSobreturno}
            accion={selectedEstado}
            setFormOK={setFormOK}
          />

          <Grid mt={2} sx={{display:'flex', justifyContent:'center'}}>
            <RecordatorioTurno turno={newTurno} enabled={activarBotonConstancia()} />
          </Grid>

        </Grid>
        {paso == 2 && <Grid mt={2} display={paso!=2&&'none'}>
          <PanelTurnosPieza
            idTurno={newTurno.id}
            turnosPieza={turnosPieza}
            setTurnosPieza={setTurnosPieza}
            monto={newTurno.monto}
            setMonto={setMonto}
          />
        </Grid>}
      </Grid>

        <Grid mt={2} gap={2} p={5} display={'flex'} justifyContent={'right'}>
          <BotonInferior
            formOK={formOK}
            newTurno={newTurno}
            turnosPieza={turnosPieza}
            paso={paso}
            setPaso={setPaso}
            onHide={onHide}
          />
        </Grid>

  </Dialog>
  )
}


function Botonera({listaEstados, setEstado, estadoActual, selectedEstado }) {

  const varianteBoton = (estado) => {
    return estado===estadoActual || estado==selectedEstado ? 'contained' : 'outlined'
  }

  
  const clickBoton = (estado) => {
    setEstado(estado);
  }
  
  // console.log(selectedEstado)

  return(
    <Grid container gap={2} justifyContent="center" my={2}>
      {Object.keys(options).map((estado) => (
        <Button 
          key={estado} 
          onClick={()=>clickBoton(estado)} 
          variant={varianteBoton(estado)}
          color={options[estado].color}
          disabled={!listaEstados.includes(estado)}
        >{options[estado].verbo} turno</Button>
      ))}
    </Grid>
  )
}


import { postDataWithResponse } from '../../../Request/post';
import { putDataWithResponse } from '../../../Request/put';
import { deleteData } from '../../../Request/delete';
function BotonInferior({formOK, newTurno, paso, setPaso, turnosPieza, onHide}) {
  // console.log('formOK:',formOK);
  // console.log('newTurno:',newTurno);

  const esCompletar = newTurno.estado === 'Realizado';
  const esTurnoTemplate = newTurno.id === null;

  const enviarTurno = async () => {
    let updatedTurno = {...newTurno};
    if (newTurno.paciente != null) {
      console.log(newTurno.paciente.dni)
      updatedTurno = { ...newTurno, dni: newTurno.paciente.dni };
      console.log('updatedTurno:',updatedTurno);
      delete updatedTurno['paciente'];
    }
    if (!newTurno.id) {delete newTurno['id'];}

    console.log('Se envió el turno:',newTurno);

    try {
      // Asignar o cancelar un turnoTemplate
      if (esTurnoTemplate) await postDataWithResponse('/turnos/', updatedTurno);
      // liberar turno
      else if (updatedTurno.estado === 'Disponible') await deleteData(`/turnos/${updatedTurno.id}/`);
      // Asignar, cancelar o completar un turno
      else await putDataWithResponse(`/turnos/${updatedTurno.id}/`, updatedTurno);

      if (esCompletar && turnosPieza.length > 0) {
        await postDataWithResponse('/turnos/piezas/', turnosPieza);
      }

      // cerrar modal
      onHide(updatedTurno.estado);
    } catch (error) {
      console.error('Error al enviar el turno:', error);
    }
  }

  
  if (!esCompletar) return(
    <Button 
      variant="contained" 
      color="primary" 
      disabled={!formOK || newTurno.estado == null}
      onClick={enviarTurno}
    >Guardar</Button>
  )
  else if (esCompletar && paso==1) return(
    <Button 
      variant="contained" 
      color="primary" 
      onClick={()=>setPaso(2)}
    >Siguiente</Button>
  )
  else if (esCompletar && paso==2) return(<>
    <Button
      variant="outlined"
      color="primary"
      onClick={()=>setPaso(1)}
    >Volver</Button>

    <Button 
      variant="contained" 
      color="primary" 
      onClick={enviarTurno}
    >Guardar</Button>
  </>)
}