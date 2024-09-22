import { useState, useEffect } from 'react';
import { TextField, Autocomplete, CircularProgress } from '@mui/material';
import { useFetchDataOnDemand, useFetchSearch } from '../../Request/v2/fetch';
import { SelectorCalendario } from './selectorCalendario';

const AutocompleteAPIComponent = ({ setSelectedValue, api_url, format, placeholder, getOptionKey=null}) => {
  const [open, setOpen] = useState(false);
  const [fetched, setFetched] = useState(false);

  const { data, loading, error, fetchData } = useFetchDataOnDemand(api_url); 

  // Cuando se abre el Autocomplete, se llama a la API solo la primera vez.
  const handleOpen = () => {
    setOpen(true);
    if (!fetched) {
      fetchData();
      setFetched(true);
    }
  };

  const handleClose = () => setOpen(false);

  if (error) return <div>Error: {error}</div>;

  return (
      <Autocomplete
        open={open} onOpen={handleOpen} onClose={handleClose}
        options={data} loading={loading}
        getOptionLabel={(option) => format(option)}
        getOptionKey={getOptionKey}
        onChange={(event, newValue) => setSelectedValue(newValue)}
        noOptionsText="No hay resultados"
        renderInput={(params) => (
          <CustomTextField
            {...params}
            label={placeholder}
            loading={loading}
          />

        )}
      />
  );
};

function CustomTextField({ label, loading = false, ...params }) {
  return (
    <TextField
      {...params}
      label={label}
      variant="standard"
      slotProps={{ input: {
        ...params.InputProps,
        endAdornment: (
          <>
            {loading ? <CircularProgress color="inherit" size={20} /> : null}
            {params.InputProps.endAdornment}
          </>
        ),
      }}}
    />
  );
}

function SelectorOdontologo({selectedValue, setSelectedValue}) {
  const odontologoFormat = (odontologo) => `${odontologo.nombre} ${odontologo.apellido} - ${odontologo.matricula}`;
  return (
    <AutocompleteAPIComponent
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      api_url={"/odontologos/"}
      format={odontologoFormat}
      placeholder={"Seleccionar odontólogo"}
    />
  );
}

function SelectorCentro({selectedValue, setSelectedValue}) {
  const centroFormat = (centro) => `${centro.nombre}`;
  return (
    <AutocompleteAPIComponent
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      api_url={"/centros/"}
      format={centroFormat}
      placeholder={"Seleccionar centro"}
    />
  );
}

function SelectorAdministrativo({selectedValue, setSelectedValue}) {
  const administrativoFormat = (administrativo) => `${administrativo.nombre} ${administrativo.apellido}`;
  return (
    <AutocompleteAPIComponent
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      getOptionKey={(x)=>x.id}
      api_url={"/auth/administrativos/"}
      format={administrativoFormat}
      placeholder={"Seleccionar administrativo"}
    />
  );
}

function SelectorAgenda({selectedValue, setSelectedValue}) {
  const agendaFormat = (agenda) => `${agenda.id}`;
  return (
    <AutocompleteAPIComponent
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      api_url={"/agendas/"}
      format={agendaFormat}
      placeholder={"Seleccionar agenda"}
    />
  );
}



const SelectorPacientes = ({ setSelectedValue }) => {
  const [inputValue, setInputValue] = useState('');

  const parseData = (data) => data.results;
  const [data, loading, error, searchData] = useFetchSearch('/pacientes/', 300, parseData);

  useEffect(() => {
    if (inputValue) {
      searchData(inputValue);
    } 
  }, [inputValue, searchData]);

  if (error) return <div>Error: {error}</div>;

  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option) => option.apellido +' '+option.nombre || ''}
      getOptionKey={(option) => option.dni}
      filterOptions={(x) => x}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);

      }}
      onChange={(event, newValue) => {
        setSelectedValue(newValue);
      }}
      
      renderInput={(params) => (
        <CustomTextField
        {...params}
        label='Buscar paciente'
        loading={loading}
      />
      )}
    />
  );
};


function SelectorSobreTurno({ setSelectedValue }) {
  const options = [
    {key: "Si", value:true}, 
    {key: "No", value:false}
  ];

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.key}
      onChange={(event, newValue) => setSelectedValue(newValue)}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          label="Es sobreturno"  
        /> )}
    />
  )
}


function SelectorEstados({ setSelectedValue }) {
  const options = [
    {key: "Pendiente", value: "Pendiente"},
    {key: "Confirmado", value: "Confirmado"},
    {key: "Cancelado", value: "Cancelado"},
    {key: "Realizado", value: "Realizado"}
  ];

  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option.key}
      onChange={(event, newValue) => setSelectedValue(newValue)}
      renderInput={(params) => (
        <CustomTextField
          {...params}
          label="Estado/s"
        />
      )}
  />);
}

import { addDays } from 'date-fns';
function Test() {
  const [selectedValue, setSelectedValue] = useState(null);
  const defaultRange = [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]
  const [range, setRange] = useState(defaultRange);

  return (
    <div>
      <SelectorOdontologo selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      <SelectorCentro selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      <SelectorAdministrativo selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      <SelectorAgenda selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
      <SelectorPacientes setSelectedValue={setSelectedValue} />
      <SelectorSobreTurno setSelectedValue={setSelectedValue} />
      <SelectorEstados setSelectedValue={setSelectedValue} />
      <h1>Valores:</h1>
      <p>{selectedValue ? JSON.stringify(selectedValue) : 'No hay valor seleccionado'}</p>

      <SelectorCalendario
        range={range}
        setRange={setRange}
        defaultRange={defaultRange}
      /> 
      <SelectorCalendario
        range={range}
        setRange={setRange}
        defaultRange={defaultRange}
        isWeek
      /> 
    </div>
  );
}

export default Test;
export {
  SelectorOdontologo,
  SelectorCentro,
  SelectorAdministrativo,
  SelectorAgenda,
  SelectorPacientes,
  SelectorSobreTurno,
  SelectorEstados
  
};