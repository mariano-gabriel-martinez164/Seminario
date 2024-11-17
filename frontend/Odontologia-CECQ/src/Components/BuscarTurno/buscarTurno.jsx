import { useState, useEffect } from 'react';
// import { VerSobreturno }  from './Sobreturno/sobreturno';

import {
  SelectorOdontologo,
  SelectorCentro,
  SelectorAdministrativo,
  SelectorAgenda,
  SelectorPacientes,
  SelectorEstados,
  SelectorSobreTurno,
} from '../MaterialUI/selectores.jsx';
import { SelectorCalendario } from '../MaterialUI/selectorCalendario.jsx';
import { construirUrlTurnos } from "../../Request/v2/fetchTurnos.js";
import { addDays } from 'date-fns';
import Grid from '@mui/material/Grid2';
import { TablaTurnos } from './tablaTurnos.jsx';
import { useMultipleFetch } from '../../Request/v2/fetch.js';

import { ModalTurnoFeatures } from '../CommonTurno/modals/modalTurnoFeatures.jsx';
import { useTurnoModal } from '../CommonTurno/modals/useTurnoModal.js';


  
  export default function BuscarTurno() {
  const [url, setUrl] = useState('');
  const [data, loading, error, fetchData] = useMultipleFetch();

  const {modalTurnoFeatures, handleClickTurno} = useTurnoModal(()=>fetchData(url));

  useEffect(() => {
    if (url) fetchData(url);
  }, [url, fetchData]); 
    


      
      

  return (
    <>
      <ModalTurnoFeatures
        modalTurnoFeatures={modalTurnoFeatures}
        handleClickTurno={handleClickTurno}
      />
      
      <Grid container gap={4} mt={4}>
        <MenuFiltros
          setUrl={setUrl}
        />
        <Grid xs={8} size={9}>
          <TablaTurnos 
            turnos={data} 
            handleClickTurno={handleClickTurno} 
            loading={loading}
            error={error}
          />
        </Grid>
      </Grid>


    </>
  );
}



function MenuFiltros({ setUrl }) {
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [selectedAgenda, setSelectedAgenda] = useState(null);
  const [selectedOdontologo, setSelectedOdontologo] = useState(null);
  const [selectedCentro, setSelectedCentro] = useState(null);
  const [selectedAdministrativo, setSelectedAdministrativo] = useState(null);
  const [selectedEstado, setSelectedEstado] = useState([]);
  const [selectedSobreturno, setSelectedSobreturno] = useState(null);

  const defaultRange = [{
    startDate: new Date(),
    endDate: addDays(new Date(),14),
    key: 'selection',
  }]; 
  const [range, setRange] = useState(defaultRange);

  useEffect(() => {
    const url = construirUrlTurnos(
      range,
      selectedAgenda,
      selectedOdontologo,
      selectedCentro,
      selectedAdministrativo,
      selectedPaciente,
      selectedSobreturno,
      selectedEstado,
    );
    setUrl(url);
    console.log(url);
  }, [range,
    selectedAgenda,
    selectedOdontologo,
    selectedCentro,
    selectedAdministrativo,
    selectedPaciente,
    selectedSobreturno,
    selectedEstado,
    setUrl
  ]);



  return (
    <Grid size={2} pl={2}>
      <SelectorCalendario
        range={range}
        setRange={setRange}
        defaultRange={defaultRange}
      />
      <SelectorPacientes
        selectedValue={selectedPaciente}
        setSelectedValue={setSelectedPaciente} 
      />
      <SelectorAgenda
        selectedValue={selectedAgenda}
        setSelectedValue={setSelectedAgenda} 
      />
      <SelectorOdontologo
        selectedValue={selectedOdontologo}
        setSelectedValue={setSelectedOdontologo} 
      />
      <SelectorCentro
        selectedValue={selectedCentro}
        setSelectedValue={setSelectedCentro} 
      />
      <SelectorAdministrativo
        selectedValue={selectedAdministrativo}
        setSelectedValue={setSelectedAdministrativo} 
      />
      <SelectorEstados
        selectedValue={selectedEstado}
        setSelectedValue={setSelectedEstado} 
      />
      <SelectorSobreTurno
        selectedValue={selectedSobreturno}
        setSelectedValue={setSelectedSobreturno} 
      />
    </Grid>
  );

}
