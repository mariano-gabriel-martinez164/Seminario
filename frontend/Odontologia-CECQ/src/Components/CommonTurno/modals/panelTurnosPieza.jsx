import { useState, useEffect, useMemo } from 'react';
import { useFetch } from '../../../Request/v2/fetch';

import { SelectorPrestaciones } from '../../MaterialUI/selectores';
import { TablaTurnosPieza } from './tablaTurnosPieza';

import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';



function PanelTurnosPieza({monto, setMonto, turnosPieza, setTurnosPieza, idTurno}) {
  const [piezasSeleccionadas, setPiezasSeleccionadas] = useState([]); // ids de las piezas clickeadas
  const piezas = useFetch('/piezasDentales/');
  const prestaciones = useFetch('/prestaciones/');
  // console.log(piezasSeleccionadas);
  console.log(turnosPieza);

  const [prestacionSeleccionada, setPrestacionSeleccionada] = useState(null);
  const [selectorKey, setSelectorKey] = useState(1);
  // console.log(prestacionSeleccionada);

  useEffect(() => {
    let total = 0.0;
    turnosPieza.forEach(t => {
      const prestacion = prestaciones.data.find(p => p.codigo == t.prestacion);
      total += parseFloat(prestacion.precio);
    });
    console.log(total);
    setMonto(total);
  }, [turnosPieza, prestaciones.data]); // eslint-disable-line


  const handleAdd = () => {
    if (prestacionSeleccionada == null) return;
    const newTurnosPieza = piezasSeleccionadas.map(pieza => ({
      turno: idTurno,
      pieza: pieza, 
      prestacion: prestacionSeleccionada.codigo
    }));
    // concatenar los nuevos turnos con los anteriores y eliminar duplicados
    const unique = [...new Set([...turnosPieza, ...newTurnosPieza]
      .map(t => JSON.stringify(t)))]
      .map(t => JSON.parse(t));
    setTurnosPieza(unique);

    setPiezasSeleccionadas([]);
    setPrestacionSeleccionada(null);
    setSelectorKey(selectorKey + 1);
  }

  const addButtonDisabled = piezasSeleccionadas.length == 0 || prestacionSeleccionada == null;


  return(
    <Grid mx={5}>
      <Typography align='center' variant='h6'>Complete las prácticas realizadas:</Typography>

      <BotoneraPiezas 
        piezas={piezas.data}
        piezasSeleccionadas={piezasSeleccionadas}
        setPiezasSeleccionadas={setPiezasSeleccionadas}
        turnosPieza={turnosPieza}
      />

      <Grid container sx={{gap:2, justifyContent:'center', py:4}}>
      <Grid width={'80%'}>
        <SelectorPrestaciones
          key={selectorKey}
          selectedValue={prestacionSeleccionada}
          setSelectedValue={setPrestacionSeleccionada}
          textFieldProps={{variant: 'outlined', fullWidth: true}}
        />
      </Grid>
      <Button variant={'contained'} color={'primary'}
        onClick={handleAdd}
        disabled={addButtonDisabled}
      >Añadir</Button>
      </Grid>

      <TablaTurnosPieza
        piezas={piezas.data}
        prestaciones={prestaciones.data}
        turnosPieza={turnosPieza}
        setTurnosPieza={setTurnosPieza}
      />

      <Grid justifyContent={'right'} display={'flex'}>


        <TextField
          label="Monto total"
          variant="outlined"
          type='number'
          slotProps={{input:{readOnly:true}}}
          value={monto}
          sx={{mt:2}}
          onChange={(e) => setMonto(e.target.value)}
        />
      </Grid>

      
    </Grid>
  )
}

export { PanelTurnosPieza };


import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

function useFullMapaPiezas(piezas) {
  return useMemo(()=>{
    const mapaPiezas = [
      [[55,51], [61,65]],
      [[18,11], [21,28]],
      [[48,41], [31,38]],
      [[85,81], [71,75]]
    ]
    
    const getPieza = (id) => {
      if (piezas != null) return piezas.find(pieza => pieza.codigo == id);
      return {codigo: id, nombre: '-'}
    }
    
    const expandirGrupo = (grupo) => {
      const [a,b] = grupo;
      const res = [];
      const direccion = a < b ? 1 : -1;
      for (let i = a; i != b+direccion; i+=direccion){
        res.push(getPieza(i));
      }
      return res;
    }
    const getFullMapa = () => {
      return mapaPiezas.map(fila => fila.map(grupo => expandirGrupo(grupo)));
    }
    return getFullMapa();
  }, [piezas]);

} 

function BotoneraPiezas({piezas, piezasSeleccionadas, setPiezasSeleccionadas, turnosPieza}){

  const fullMapaPiezas = useFullMapaPiezas(piezas);

  const togglePieza = (piezaID) => {
    if (piezasSeleccionadas.includes(piezaID)){
      setPiezasSeleccionadas(piezasSeleccionadas.filter(pieza => pieza !== piezaID));
    } else {
      setPiezasSeleccionadas([...piezasSeleccionadas, piezaID]);
    }
  }

  const botonActivo = (piezaID) => {
    const activos = turnosPieza.map(t => t.pieza);
    return activos.includes(piezaID);
  }

  return(
    <Paper elevation={2} sx={{p:4, minWidth:'850px', maxWidth:'100%',overflow:'auto'}}>
      {fullMapaPiezas.map((fila,i) => (
        <Grid key={i} container sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 1,
          pb: i==1 ? 1 : 0
        }}>
          {fila.map((grupo,j) => (
            <Grid key={j} >
              {grupo.map((pieza,k) => (
                <BotonPieza 
                  key={k} 
                  pieza={pieza} 
                  onClick={togglePieza} 
                  active={botonActivo(pieza.codigo)}
                  selected={piezasSeleccionadas.includes(pieza.codigo)}
                />
              ))}
            </Grid>
          ))}
        </Grid>
      )) }
    </Paper>
  );

}

function BotonPieza({pieza, onClick, active, selected}){
  // console.log(pieza);
  const getColor = () => {
    if (selected) return 'primary';
    if (active) return 'secondary';
    return 'default';
  }

  if (pieza == null) return null;
  return (
    <Tooltip title={pieza.nombre}>
      <Button 
        sx={{minWidth: 40}}
        onClick={() => onClick(pieza.codigo)}
        variant={'contained'}
        color={getColor()}
        >{pieza.codigo}</Button>
    </Tooltip>
  )
}