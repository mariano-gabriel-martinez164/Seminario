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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {StyledTableCell, StyledTableRow} from '../MaterialUI/styledTable.jsx';

import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

import { format } from 'date-fns';

const estadosChips = {
  'Disponible': 'info',
  'Asignado': 'warning',
  'Cancelado': 'error',
  'Realizado': 'success',
  'Sobreturno asignado': 'warning',
}

export default function BuscarTurno() {

    const [modalShow, setModalShow] = useState(false);
    const [selectedTurno, setSelectedTurno] = useState('');
    const [turnos, setTurnos] = useState([]);
    const [estadoModal, setEstadoModal] = useState('');
    const [selectedTurnoTemplate, setSelectedTurnoTemplate] = useState({});
    const [modalSobreturnoShow, setModalSobreturnoShow] = useState(false);
    const [estado, setEstado] = useState('');


    const formatHour = (hour) => {
      const [hourString, minuteString] = hour.split(':');
      return `${hourString.padStart(2, '0')}:${minuteString.padStart(2, '0')}`;
      
    }
    
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

      

  return (
    <>
      <TurnoAlerts estadoModal={estadoModal}/>
      
      <Grid container gap={4} mt={4}>
        <MenuFiltros
          turnos={turnos}
          setTurnos={setTurnos}
          estadoModal={estadoModal}
        />

        <Grid xs={8} size={9}>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <StyledTableRow>
                  {
                    ['Fecha', 'Hora', 'Paciente', 'Agenda', 'Estado', ''].map((header, index) => (
                      <StyledTableCell key={index}>{header}</StyledTableCell>
                    ))
                  }
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {turnos.map((turno) => (
                  <StyledTableRow
                    key={
                      turno.id ||
                      `${turno.paciente}-${turno.agenda}-${turno.fecha}`
                    }
                  >
                    <StyledTableCell>{format(turno.fecha, "MMM dd")}</StyledTableCell>
                    <StyledTableCell>
                      {formatHour(turno.horaInicio)} -{" "}
                      {formatHour(turno.horaFin)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {
                        turno.paciente
                        && `${turno.paciente.apellido}, ${turno.paciente.nombre[0]}.`  

                      }
                    </StyledTableCell>
                    <StyledTableCell>{turno.agenda}</StyledTableCell>
                    <StyledTableCell>
                      <Chip
                        label={turno.estado}
                        color={estadosChips[turno.estado]}
                      />
                    </StyledTableCell>

                    <StyledTableCell>
                      <Button
                        color="primary"
                        onClick={handleClickTurno.bind(this, turno)}
                      >Ver más...</Button>
                    </StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      {estado === "Disponible" && modalShow ? (
        <ModalDisponible
          show={modalShow}
          onHide={() => setModalShow(false)}
          turnoTemplate={selectedTurnoTemplate}
          setEstadoModal={setEstadoModal}
        />
      ) : null}

      {estado === "Realizado" && modalShow ? (
        <ModalRealizado
          show={modalShow}
          onHide={() => setModalShow(false)}
          turnoClick={selectedTurno}
        />
      ) : null}

      {estado === "Cancelado" && modalShow ? (
        <ModalCancelado
          show={modalShow}
          onHide={() => setModalShow(false)}
          turnoClick={selectedTurno}
          turnoTemplate={selectedTurnoTemplate}
          setEstadoModal={setEstadoModal}
        />
      ) : null}

      {estado === "Asignado" && modalShow ? (
        <ModalAsignado
          show={modalShow}
          onHide={() => setModalShow(false)}
          turnoClick={selectedTurno}
          setEstadoModal={setEstadoModal}
        />
      ) : null}

      <Fab
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
        color="primary"
        variant="extended"
        onClick={() => {
          setModalSobreturnoShow(true);
        }}
      >
        <AddIcon sx={{ mr: 1 }} />
        Crear sobreturno
      </Fab>
      {modalSobreturnoShow && (
        <VerSobreturno
          show={modalSobreturnoShow}
          onHide={() => setModalSobreturnoShow(false)}
          setEstadoModal={setEstadoModal}
        />
      )}
    </>
  );
}


import useFetchTurnos from "../../Request/v2/fetchTurnos.js";
import { addDays } from 'date-fns';
import Grid from '@mui/material/Grid2';
import { Fab } from '@mui/material';

function MenuFiltros({ setTurnos }) {
  const [selectedPaciente, setSelectedPaciente] = useState('');
  const [selectedAgenda, setSelectedAgenda] = useState('');
  const [selectedOdontologo, setSelectedOdontologo] = useState('');
  const [selectedCentro, setSelectedCentro] = useState('');
  const [selectedAdministrativo, setSelectedAdministrativo] = useState('');
  const [selectedEstado, setSelectedEstado] = useState([]);
  const [selectedSobreturno, setSelectedSobreturno] = useState(null);

  const defaultRange = [{
    startDate: new Date(),
    endDate: addDays(new Date(),7),
    key: 'selection',
  }]; 
  const [range, setRange] = useState(defaultRange);

  const { data, loading, error } = useFetchTurnos(
    range[0].startDate,
    range[0].endDate,

    selectedAgenda?.id,
    selectedOdontologo?.id,
    selectedCentro?.id,
    selectedAdministrativo?.id,
    selectedPaciente?.dni,
    selectedSobreturno?.value,
    selectedEstado?.map((estado) => estado.value),
  );

  useEffect(() => {
    if (data) {
      setTurnos(data);
    }
  }, [data, setTurnos]);

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

function TurnoAlerts({estadoModal}){
  const keys = Object.keys(estadosChips);
  if (!keys.includes(estadoModal)) return null;
  const color = estadosChips[estadoModal];
  const texto = estadoModal === 'Sobreturno asignado' ? 'Sobreturno asignado' : `Turno ${estadoModal}`;
  return (
    <Snackbar open={true}>
    <Alert severity={color}>
      {texto}
    </Alert>
  </Snackbar>
  )
}