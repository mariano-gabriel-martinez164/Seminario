import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export function FabSobreturno({ onClick }) {

  return (
  <Fab
    sx={{
      position: "fixed",
      bottom: 16,
      right: 16,
    }}
    color="primary"
    variant="extended"
    onClick={onClick}
  >
    <AddIcon sx={{ mr: 1 }} />
    Crear sobreturno
  </Fab>)
}

export default FabSobreturno;