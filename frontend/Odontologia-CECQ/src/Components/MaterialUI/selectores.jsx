import { useState, useEffect } from 'react';
import { TextField, Autocomplete, CircularProgress } from '@mui/material';
import { useFetchDataOnDemand, useFetchSearch } from '../../Request/v2/fetch';
import { SelectorCalendario } from './selectorCalendario';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';

const AutocompleteAPIComponent = ({
  setSelectedValue,
  api_url,
  format,
  placeholder,
  getOptionKey = null,
  textFieldProps = {},
}) => {
  const [open, setOpen] = useState(false);
  const [fetched, setFetched] = useState(false);

  const { data, loading, error, fetchData } = useFetchDataOnDemand(api_url);

  const handleOpen = () => {
    setOpen(true);
    if (!fetched) {
      fetchData();
      setFetched(true);
    }
  };

  const handleClose = () => setOpen(false);

  if (error) return <div>
  <Alert severity="error">Error</Alert>
  </div>;

  return (
    <Autocomplete
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      options={data}
      loading={loading}
      getOptionLabel={(option) => format(option)}
      getOptionKey={getOptionKey}
      onChange={(event, newValue) => setSelectedValue(newValue)}
      noOptionsText="No hay resultados"
      renderInput={(params) => (
        <CustomTextField
          {...params}
          loading={loading}
          {...{ label: placeholder, ...textFieldProps }}
        />
      )}
    />
  );
};

function CustomTextField({ label, loading = false, ...params }) {
  const endAdornment = params.InputProps?.endAdornment || null;

  return (
    <TextField
      label={label}
      variant="standard"
      {...params}
      slotProps={{
        input: {
          ...params.InputProps,
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {endAdornment}
            </>
          ),
        },
      }}
    />
  );
}


function SelectorOdontologo({selectedValue, setSelectedValue, textFieldProps={}}) {
  const odontologoFormat = (odontologo) => `${odontologo.nombre} ${odontologo.apellido} - ${odontologo.matricula}`;
  return (
    <AutocompleteAPIComponent
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      api_url={"/odontologos/"}
      format={odontologoFormat}
      placeholder={"Seleccionar odontólogo"}
      textFieldProps={textFieldProps}
    />
  );
}

function SelectorCentro({selectedValue, setSelectedValue, textFieldProps={}}) {
  const centroFormat = (centro) => `${centro.nombre}`;
  return (
    <AutocompleteAPIComponent
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      api_url={"/centros/"}
      format={centroFormat}
      placeholder={"Seleccionar centro"}
      textFieldProps={textFieldProps}
    />
  );
}

function SelectorAdministrativo({selectedValue, setSelectedValue, textFieldProps={}}) {
  const administrativoFormat = (administrativo) => `${administrativo.first_name} ${administrativo.last_name}`;
  return (
    <AutocompleteAPIComponent
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      getOptionKey={(x)=>x.id}
      api_url={"/auth/administrativos/"}
      format={administrativoFormat}
      placeholder={"Seleccionar administrativo"}
      textFieldProps={textFieldProps}
    />
  );
}

function SelectorAgenda({ selectedValue, setSelectedValue, textFieldProps = {} }) {
  const agendaFormat = (agenda) => agenda.nombre || "-"; 
  
  return (
    <AutocompleteAPIComponent
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      api_url={"/agendas/"}
      getOptionKey={(x)=>x.id}
      format={agendaFormat}
      placeholder={"Seleccionar agenda"}
      textFieldProps={textFieldProps}
    />
  );
}

function SelectorPrestaciones({selectedValue, setSelectedValue, textFieldProps={}}) {
  const prestacionFormat = (prestacion) => `${prestacion.nombre}`;
  return (
    <AutocompleteAPIComponent
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      api_url={"/prestaciones/"}
      format={prestacionFormat}
      placeholder={"Seleccionar práctica"}
      textFieldProps={textFieldProps}
    />
  );
}



const SelectorPacientes = ({ setSelectedValue, sx = {}, textFieldProps = {} }) => {
  const [inputValue, setInputValue] = useState('');
  const parseData = (data) => data.results;
  const [data, loading, error, searchData] = useFetchSearch('/pacientes/', 300, parseData);

  useEffect(() => {
    if (inputValue) {
      searchData(inputValue);
    }
  }, [inputValue, searchData]);

  // Manejar errores del servidor
  if (error) {
    return (
      <CustomTextField
        label="Buscar paciente"
        error
        helperText="Error"
        {...textFieldProps}
      />
    );
  }

  return (
    <Autocomplete
      sx={{ ...sx }}
      options={Array.isArray(data) ? data : []} // Asegurarse de que `options` siempre sea un array
      getOptionLabel={(option) => `${option.apellido} ${option.nombre}` || ''}
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
          loading={loading}
          {...{ label: 'Buscar paciente', ...textFieldProps }}
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

  const setNew = (event, newValue) => {
    if (newValue) setSelectedValue(newValue.value);
    else setSelectedValue(null);
  }

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.key}
      onChange={setNew}
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
    {key: "Disponible", value: "Disponible", color: 'info'},
    {key: "Asignado", value: "Asignado", color: 'warning'},
    {key: "Cancelado", value: "Cancelado", color: 'error'},
    {key: "Realizado", value: "Realizado", color: 'success'},
  ];

  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option.key}
      onChange={(event, newValue) => setSelectedValue(newValue)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
            size="small"
            color={option.color}
            label={option.key}
            // {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <CustomTextField
          {...params}
          label="Estado/s"
        />
      )}
    />
  );
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
  SelectorEstados,
  SelectorPrestaciones
};