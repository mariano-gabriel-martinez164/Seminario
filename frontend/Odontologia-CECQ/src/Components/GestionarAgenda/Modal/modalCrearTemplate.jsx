import { deleteData } from '../../../Request/delete';
import { handleChange, handleModify } from '../../GestionarUsuario/verificarFormulario';

import { TextField, Container, Button, Dialog, DialogActions, DialogContent, Slide } from '@mui/material';
import Grid from '@mui/material/Grid2';

export function ModalCrearTemplate({ open, onClose }) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
        <DialogContent>
        <form>
          <Container id='container'>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <TextField
                    label='Dia de semana'
                    multiline
                    maxRows={4}
                    name="diaSemana"
                    // value={}
                    // onChange={(event) => handleChange(event, setFormData)}
                    fullWidth
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    label='Hora inicio'
                    multiline
                    maxRows={4}
                    name="horaInicio"
                    // value={}
                    // onChange={(event) => handleChange(event, setFormData)}
                    fullWidth
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    label='hora fin'
                    multiline
                    maxRows={4}
                    name="horaFin"
                    // value={}
                    // onChange={(event) => handleChange(event, setFormData)}
                    fullWidth
                  />
                </Grid>
              </Grid>
          </Container>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
          }} 
          variant="outlined" color='success' id='button'>Crear</Button>
          
          <Button onClick={() => onClose()} variant="outlined" id='button'>Cerrar</Button>
        </DialogActions>
    </Dialog>
  );
}
