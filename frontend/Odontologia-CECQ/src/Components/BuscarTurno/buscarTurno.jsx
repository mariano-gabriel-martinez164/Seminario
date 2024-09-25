import { useState, useEffect } from 'react';
import { VerSobreturno }  from './Sobreturno/sobreturno';
import { ModalRealizado } from './CrudTurno/modalRealizado';
import { ModalDisponible } from './CrudTurno/modalDisponible';
import { ModalCancelado } from './CrudTurno/modalCancelado';
import { ModalAsignado } from './CrudTurno/modalAsignado';

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
import { FabSobreturno } from '../CommonTurno/fabSobreturno.jsx';
import { TurnoAlerts } from '../CommonTurno/turnoAlerts.jsx';
import { TablaTurnos } from './tablaTurnos.jsx';
import { useMultipleFetch } from '../../Request/v2/fetch.js';


export default function BuscarTurno() {

    const [modalShow, setModalShow] = useState(false);
    const [selectedTurno, setSelectedTurno] = useState('');
    const [estadoModal, setEstadoModal] = useState('');
    const [selectedTurnoTemplate, setSelectedTurnoTemplate] = useState({});
    const [modalSobreturnoShow, setModalSobreturnoShow] = useState(false);
    const [estado, setEstado] = useState('');
    const [url, setUrl] = useState('');
    const [data, loading, error, fetchData] = useMultipleFetch();

    
    const handleClickTurno = (turno) => {
        setModalShow(true);
        if (turno.id !== null) {
          setSelectedTurno(turno.id);
          setSelectedTurnoTemplate({});
          setEstado(turno.estado);
        } else {
          setSelectedTurnoTemplate(turno);
          setSelectedTurno("");
          setEstado(turno.estado);
        }
      }

      useEffect(() => {
        fetchData(url);
      }, [url, fetchData]); 
      
      const modalOnHide = () => {
        setModalShow(false);
        setModalSobreturnoShow(false);
        // fetchData(url);
      }
      

  return (
    <>
      <TurnoAlerts estadoModal={estadoModal}/>
      
      <Grid container gap={4} mt={4}>
        <MenuFiltros
          setUrl={setUrl}
        />
        <Grid xs={8} size={9}>
          <TablaTurnos 
            turnos={data} 
            handleClickTurno={handleClickTurno} 
            loading={loading}
          />
        </Grid>
      </Grid>

      {estado === "Disponible" && modalShow ? (
        <ModalDisponible
          show={modalShow}
          onHide={modalOnHide}
          turnoTemplate={selectedTurnoTemplate}
          setEstadoModal={setEstadoModal}
        />
      ) : null}

      {estado === "Realizado" && modalShow ? (
        <ModalRealizado
          show={modalShow}
          onHide={modalOnHide}
          turnoClick={selectedTurno}
        />
      ) : null}

      {estado === "Cancelado" && modalShow ? (
        <ModalCancelado
          show={modalShow}
          onHide={modalOnHide}
          turnoClick={selectedTurno}
          turnoTemplate={selectedTurnoTemplate}
          setEstadoModal={setEstadoModal}
        />
      ) : null}

      {estado === "Asignado" && modalShow ? (
        <ModalAsignado
          show={modalShow}
          onHide={modalOnHide}
          turnoClick={selectedTurno}
          setEstadoModal={setEstadoModal}
        />
      ) : null}

      <FabSobreturno onClick={() => setModalSobreturnoShow(true)} />
      {modalSobreturnoShow && (
        <VerSobreturno
          show={modalSobreturnoShow}
          onHide={modalOnHide}
          setEstadoModal={setEstadoModal}
        />
      )}
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
