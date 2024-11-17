import { useState } from 'react';

export function useTurnoModal(modOnHide){
  const [estadoModal, setEstadoModal] = useState('');
  const [estado, setEstado] = useState('');
  
  const [modalShow, setModalShow] = useState(false);
  const [selectedTurno, setSelectedTurno] = useState('');
  const [modalKey, setModalKey] = useState(1); // Para forzar la actualización del modal
  const [alertKey, setAlertKey] = useState(1); // Para forzar la actualización del alert
  
  const handleClickTurno = (turno={}) => {
    setModalKey(modalKey + 1);
    setModalShow(true);
    setSelectedTurno(turno);
      setEstado(turno.estado);
    }
    const modalOnHide = (estado=null) => {
      setModalShow(false);
      setEstado('')
      modOnHide();
      setAlertKey(alertKey + 1);
      if (estado != null){
        setEstadoModal(estado);
      }
    }
    
    const getModalKey = () => { return modalKey+'m'; }
    const getAlertKey = () => { return alertKey+'a';}

  return {
    modalTurnoFeatures:{
      estadoModal,
      estado,
      modalShow,
      selectedTurno,
      getModalKey,
      getAlertKey,
      modalOnHide,
    },

    handleClickTurno,
  }
}