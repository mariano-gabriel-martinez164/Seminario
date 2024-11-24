import { useState, useEffect } from 'react'
import './verAgenda.css'
import { SelectorCalendario } from '../MaterialUI/selectorCalendario'
import { SelectorAgenda } from '../MaterialUI/selectores'
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TurnoBox from './TurnoBox';
import Alert from '@mui/material/Alert';

import { addDays, format, eachDayOfInterval } from 'date-fns';
// import { differenceInDays, getDay } from 'date-fns';

import { useMultipleFetch } from '../../Request/v2/fetch';
import { construirUrlTurnos } from "../../Request/v2/fetchTurnos.js";
import { ModalTurnoFeatures } from '../CommonTurno/modals/modalTurnoFeatures.jsx';
import { useTurnoModal } from '../CommonTurno/modals/useTurnoModal.js';



export default function VerAgenda() {
  const defaultRange = [{
      startDate: addDays(new Date(), 1 - new Date().getDay()),
      endDate: addDays(new Date(), 7 - new Date().getDay()),
      key: "selection",
    }];
  const [range, setRange] = useState(defaultRange);
  const [agenda, setAgenda] = useState(null);
  const [url, setUrl] = useState('');
  

  // const isDateRangeValid = () => {
  //   const startsInMonday = getDay(range[0].startDate) === 1;
  //   const endInSunday = getDay(range[0].endDate) === 0;
  //   const is7Days = differenceInDays(range[0].endDate, range[0].startDate) === 6;
  //   return is7Days && startsInMonday && endInSunday;
  // }

  const [data, isLoading, error, fetchData] = useMultipleFetch();
  const {modalTurnoFeatures, handleClickTurno} = useTurnoModal(()=>{if(url) return fetchData(url)});

  useEffect(() => {
    if (agenda) {
      setUrl(construirUrlTurnos(range,agenda));
      if (url)fetchData(url);
    }
  }, [agenda, range, fetchData, url]);



  return (
    <MenuVerAgenda
      defaultRange={defaultRange}
      range={range}
      setRange={setRange}
      agenda={agenda}
      setAgenda={setAgenda}
    >
      <ModalTurnoFeatures
        modalTurnoFeatures={modalTurnoFeatures}
        handleClickTurno={handleClickTurno}
      />
      {agenda 
        ? <h3>{agenda.CentroOdontologico?.nombre} - {agenda.odontologo?.apellido}, {agenda.odontologo?.nombre}</h3>
        : <Alert severity="error" sx={{width:'70%'}}>Selecciona una agenda</Alert>
      }
      {isLoading && <Alert severity="info" sx={{width:'70%'}}>Cargando...</Alert>}
      {error && <Alert severity="error" sx={{width:'70%'}}>{error}</Alert>}
      {data && !isLoading && !error && agenda && <AgendaSemanal 
        data={data} 
        range={range}
        turnoBoxOnClick={handleClickTurno}  
      />}

    </MenuVerAgenda>
  )
}


export function MenuVerAgenda({children, defaultRange, range, setRange, agenda, setAgenda}) {

  return (
    <div>
      <Grid container spacing={2} sx={{my:4, alignItems:'center', display:'flex', justifyContent:'center'}}>
        <Grid size={3}>
          <SelectorAgenda
            selectedValue={agenda}
            setSelectedValue={setAgenda}
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

      </Grid>


      <Grid container spacing={2} sx={{
        alignItems:'center',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        width:'100%'
        }}>

        {children}
      </Grid>
      


    </div>
  )
}


function AgendaSemanal({data, range, turnoBoxOnClick}) {
  //console.log(data);

  const getDayHeaders = () => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    return days.map((day, index) => {
      const dayI = addDays(range[0].startDate, index);
      const today = format(new Date(), 'yyyy-MM-dd') == format(dayI, 'yyyy-MM-dd');
      return (
        <Box key={index} sx={{ flex: 1, pt:1 }}>
          <h3>{day}</h3>
          <p>{format(dayI, 'MMM dd')} {today && '(Hoy)'}</p>
        </Box>
      )
    })
  }

  const turnosPorDia = () => {
    const turnos = [];
    eachDayOfInterval({
      start:range[0].startDate, 
      end:addDays(range[0].endDate,-2)
    }).map((day) => {
      const turnosDia = data.filter(turno => turno.fecha === format(day, 'yyyy-MM-dd'));
      turnos.push(turnosDia);
    });
    return turnos;
  }


  return (
    <Paper elevation={3} sx={{
      width:'80%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
    }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
        sx={{ 
          width:'100%',
          justifyContent:'center',
          alignItems:'center',
          display:'flex',
          flexDirection:'row',
          textAlign:'center',
          bgcolor: '#343a40', //TODO cambiar color
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
          display:'flex',
          flexDirection:'row',
          textAlign:'center',
          minHeight:'50vh',
        }}
      >
        {turnosPorDia().map((turnosDia, index) => {
          return (
            <Box key={index} sx={{ flex: 1, pt:1 }}>
              {turnosDia.map((turno, index) => {
                return (
                  <TurnoBox key={index} {...turno} onClick={turnoBoxOnClick}/>
                )
              })}
            </Box>

        )})}

      </Stack>
    </Paper>
  )

}
