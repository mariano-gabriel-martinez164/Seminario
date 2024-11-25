import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

import {
  SelectorPacientes,
  SelectorAgenda,
} from "../../MaterialUI/selectores";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers";

import { useFetch } from "../../../Request/v2/fetch";


import { SelectorWrapper } from "./selectorWrapper";

function Formulario({ turno, newTurno, setNewTurno, esSobreturno, accion=null, setFormOK }) {
  const [selectedPaciente, setSelectedPaciente] = useState(turno.paciente);
  const [selectedAgenda, setSelectedAgenda] = useState(turno.agenda);

  // const [selectedOdontologo, setSelectedOdontologo] = useState(turno.odontologo);
  // const [selectedCentro, setSelectedCentro] = useState(turno.centro); 
  
  const agendasFetch = useFetch("/agendas/");
  
  const getCurrentAgenda = () => {
    if (selectedAgenda && agendasFetch.data) {
      return agendasFetch.data.find((agenda) => agenda.id === selectedAgenda);
    }
    return null;
  }
  // const selectedOdontologo = newTurno?.agenda ? getCurrentAgenda()?.odontologo : null;
  // const selectedCentro = newTurno?.agenda ? getCurrentAgenda()?.CentroOdontologico : null;

  const nombreyApellido = (x) => `${x.nombre} ${x.apellido}`;

  const handleAgendaChange = (agenda) => {
    setSelectedAgenda(agenda?.id);
    setNewTurno({
      ...newTurno,
      agenda: agenda?.id
    });
  }
  
  const handlePacienteChange = (paciente) => {
    const newPaciente = paciente && {dni: paciente.dni, nombre: paciente.nombre, apellido: paciente.apellido};
    setSelectedPaciente(newPaciente);
    setNewTurno({
      ...newTurno,
      paciente: newPaciente
    });
  }

  
  useEffect(() => {
    const verificarFormulario = () => {
      const areHoursValid = newTurno.horaInicio != null && newTurno.horaFin != null && newTurno.fecha != null && newTurno.horaInicio < newTurno.horaFin;
      const isActionSelected = accion != null && accion != '' && Object.hasOwn(newTurno, 'estado');
      const isPacienteSelected = selectedPaciente != null;
      const isAgendaSelected = selectedAgenda != null;
      
      // console.log('areHoursValid:',areHoursValid,'isActionSelected:',isActionSelected,'isPacienteSelected:',isPacienteSelected,'isAgendaSelected:',isAgendaSelected);
      if (esSobreturno) {return areHoursValid && isActionSelected && isPacienteSelected && isAgendaSelected;}
      else if (newTurno.estado === 'Asignado') {return areHoursValid && isPacienteSelected && isAgendaSelected;}
      else {return areHoursValid;}
    }
    console.log('formOK:',verificarFormulario());
    setFormOK(verificarFormulario());
  }, [newTurno, selectedPaciente, selectedAgenda, accion, setFormOK, esSobreturno, turno.estado]);


  return (
    <Grid size={2} px={5} gap={3} sx={{display:'flex',flexDirection:'column'}}>
      <SelectoresTiempo newTurno={newTurno} setNewTurno={setNewTurno} esSobreturno={esSobreturno}/>

      <SelectorWrapper
        placeholder="Paciente"
        defaultValue={selectedPaciente ? nombreyApellido(selectedPaciente) : ''}
        required={esSobreturno || newTurno.estado === 'Asignado'}
      >
        <SelectorPacientes
          selectedValue={selectedPaciente}
          setSelectedValue={handlePacienteChange}
          textFieldProps={{ 
            variant: "outlined", 
            label: "Paciente" , 
            error: (selectedPaciente==null), 
            helperText: (selectedPaciente==null) && 'Campo obligatorio'
          }}
        />
      </SelectorWrapper>

      <SelectorWrapper
        placeholder="Agenda"
        required={esSobreturno}
        defaultValue={
          agendasFetch?.data?.find((agenda) => agenda.id === selectedAgenda)?.nombre || ""
        }
      >
        <SelectorAgenda
          selectedValue={selectedAgenda}
          setSelectedValue={handleAgendaChange}
          textFieldProps={{ variant: "outlined", label: "Agenda" }}
        />
      </SelectorWrapper>

        

      <Grid gap={3} sx={{display:'flex',flexDirection:'row', justifyContent:'space-around' }}>
      <SelectorWrapper
        placeholder="Odontólogo"
        defaultValue={getCurrentAgenda()?.odontologo ? nombreyApellido(getCurrentAgenda()?.odontologo) : ''}
      />
      
      <SelectorWrapper
        placeholder="Centro"
        defaultValue={getCurrentAgenda() ? getCurrentAgenda().CentroOdontologico.nombre : ''}
      />
      </Grid>
      
    </Grid>
  );
}

export { Formulario };


import {format, parse} from 'date-fns';
function SelectoresTiempo({newTurno, setNewTurno, esSobreturno }) {

  const fecha = newTurno.fecha == null? null : parse(newTurno.fecha, 'yyyy-MM-dd', new Date());
  const horaInicio = newTurno.horaInicio == null? null : parse(newTurno.horaInicio, 'HH:mm:ss', new Date());
  const horaFin = newTurno.horaFin == null? null : parse(newTurno.horaFin, 'HH:mm:ss', new Date());



  const setFecha = (fecha) => {
    setNewTurno({
      ...newTurno,
      fecha: format(fecha, 'yyyy-MM-dd')
    });
    
  }

  const setHoraInicio = (horaInicio) => {
    setNewTurno({
      ...newTurno,
      horaInicio: format(horaInicio, 'HH:mm:ss')
    });
  }

  const setHoraFin = (horaFin) => {
    setNewTurno({
      ...newTurno,
      horaFin: format(horaFin, 'HH:mm:ss')
    });
  }

  const areHoursValid = horaInicio && horaFin && horaInicio < horaFin;
  const areFieldsEmpty = !fecha || !horaInicio || !horaFin;


  return (
    <Grid size={2} pl={2} gap={3} sx={{display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Fecha"
          value={fecha}
          onChange={(newValue) => setFecha(newValue)}
          format="dd/MM/yyyy"
          readOnly={!esSobreturno}
        />

        <TimePicker
          label="Hora de inicio"
          value={horaInicio}
          onChange={(newValue) => setHoraInicio(newValue)}
          readOnly={!esSobreturno}
        />

        <TimePicker
          label="Hora de fin"
          value={horaFin}
          onChange={(newValue) => setHoraFin(newValue)}
          readOnly={!esSobreturno}
          slotProps={{
            textField: {
              error: !areHoursValid && !areFieldsEmpty,
              helperText: !areHoursValid && !areFieldsEmpty && 'Duración inválida'
            }
          }}
        />
      </LocalizationProvider>
    </Grid>
  )
}