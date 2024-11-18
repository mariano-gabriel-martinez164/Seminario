import { Dialog, Typography, DialogActions, DialogContent, Button, Box } from '@mui/material/';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { deleteData } from "../../Request/delete.js";

export default function ModalEliminar({ open, onClose, seleccionado, este, setEstadoModal, url }) {
  const handleEliminar = async (id) => {
    await deleteData(url + `${id}/`);
    onClose();
    setEstadoModal('Eliminado');
  };

  return (
    <Dialog
      open={open}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <ErrorOutlineIcon color="warning" sx={{ fontSize: 100 }} />
          <Typography variant="h5" component="div" align="center" mt={2}>
            ¿Estás seguro que deseas eliminar {este}?
          </Typography>
          <Typography align="center" mt={1}>
            Esta acción no se puede deshacer.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button variant="contained" onClick={onClose}>Cancelar</Button>
        <Button variant="contained" 
        onClick={() => (handleEliminar(seleccionado))} 
        color="error">Eliminar</Button>
      </DialogActions>
    </Dialog>
  );
}
