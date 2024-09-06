import { useState } from 'react';
import { TextField, Autocomplete, CircularProgress } from '@mui/material';


const useFetchDataOnDemand = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000'+url);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};




const AutocompleteAPIComponent = ({selectedValue, setSelectedValue, api_url, format, placeholder}) => {
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
        onChange={(event, newValue) => setSelectedValue(newValue)}
        noOptionsText="No hay resultados"
        renderInput={(params) => (
          <CustomTextField
            {...params}
            placeholder={placeholder}
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

export { SelectorOdontologo, SelectorCentro, SelectorAdministrativo, SelectorAgenda };

