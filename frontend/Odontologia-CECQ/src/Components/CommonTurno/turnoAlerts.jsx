import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import estadosChips from './estadosChips';
import { useState } from 'react';

export function TurnoAlerts({estadoModal}){
  const [open, setOpen] = useState(true);
  const keys = Object.keys(estadosChips);
  if (!keys.includes(estadoModal)) return null;
  const color = estadosChips[estadoModal];
  const texto = estadoModal === 'Sobreturno asignado' ? 'Sobreturno asignado' : `Turno ${estadoModal}`;


  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={()=>setOpen(false)}>
    <Alert severity={color}>
      {texto}
    </Alert>
  </Snackbar>
  )
}

export default TurnoAlerts;