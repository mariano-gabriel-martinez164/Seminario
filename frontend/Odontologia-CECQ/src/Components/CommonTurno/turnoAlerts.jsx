import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import estadosChips from './estadosChips';

export function TurnoAlerts({estadoModal}){
  const keys = Object.keys(estadosChips);
  if (!keys.includes(estadoModal)) return null;
  const color = estadosChips[estadoModal];
  const texto = estadoModal === 'Sobreturno asignado' ? 'Sobreturno asignado' : `Turno ${estadoModal}`;
  return (
    <Snackbar open={true} autoHideDuration={5000}>
    <Alert severity={color}>
      {texto}
    </Alert>
  </Snackbar>
  )
}

export default TurnoAlerts;