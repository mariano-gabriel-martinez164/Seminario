import { TurnoAlerts } from '../turnoAlerts';
import { ModalTurno } from './modalTurno';
import { FabSobreturno } from '../fabSobreturno';

export function ModalTurnoFeatures({
  modalTurnoFeatures, handleClickTurno
}) {
  return (<>
    <TurnoAlerts estadoModal={modalTurnoFeatures.estadoModal} key={modalTurnoFeatures.getAlertKey()}/>
    <ModalTurno 
      open={modalTurnoFeatures.modalShow} 
      onHide={modalTurnoFeatures.modalOnHide} 
      turno={modalTurnoFeatures.selectedTurno} 
      estado={modalTurnoFeatures.estado} 
      key={modalTurnoFeatures.getModalKey()}
    />
    <FabSobreturno onClick={()=>handleClickTurno()} />
  </>);
}