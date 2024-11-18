import { TextField,Alert, Container, Button, Dialog, DialogActions, DialogContent, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { turnoTemplate } from './turnoTemplate';
import { usePostData } from '../../../../Request/v2/post';

export function ModalCrearTemplate({ open, onClose, agendaSeleccionado, setEstado }) {

  const [formData, setFormData] = useState({
    diaSemana: '',
    horaInicio: '',
    horaFin: '',
  });

  const compararHoras = (horaInicio, horaFin) => {
    return horaInicio < horaFin;
  };
  const validarHora = (hora) => {
    const formato = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM
    return formato.test(hora);
  };

  const { postData, errorPost, loading } = usePostData();

  const handleSubmit = async (formData) => {
    postData(`/turnotemplates/`, turnoTemplate(formData, agendaSeleccionado))
    .then(() => {
      setEstado('Creado');
      onClose();
    })
    .catch((error) => {
      console.error('Error al crear la agenda:', errorPost);
  });
}

  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
        <DialogContent>
        {errorPost && <Alert severity="error" sx={{mb:2}}>{errorPost}</Alert>}
        <form>
          <Container id='container'>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <FormControl variant="standard" sx={{width:'100%'}}>
                    <InputLabel id="demo-simple-select-standard-label">Dia de semana</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={formData.diaSemana}
                      onChange={(event) => setFormData({ ...formData, diaSemana: event.target.value })}
                      label="Dia de semana"
                    >
                      <MenuItem value={0}>Lunes</MenuItem>
                      <MenuItem value={1}>Martes</MenuItem>
                      <MenuItem value={2}>Miercoles</MenuItem>
                      <MenuItem value={3}>Jueves</MenuItem>
                      <MenuItem value={4}>Viernes</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={6}>
                  <Typography>
                    Hora inicio
                  </Typography>
                  <TextField
                    variant="filled"
                    label='HH:MM'
                    multiline
                    maxRows={4}
                    name="horaInicio"
                    value={formData.horaInicio}
                    onChange={(event) => setFormData({ ...formData, horaInicio: event.target.value })}
                    fullWidth
                  />
                </Grid>

                <Grid size={6}>
                  <Typography>
                    Hora fin
                  </Typography>
                  <TextField
                    variant="filled"
                    label='HH:MM'
                    multiline
                    maxRows={4}
                    name="horaFin"
                    value={formData.horaFin}
                    onChange={(event) => setFormData({ ...formData, horaFin: event.target.value })}
                    fullWidth
                  />
                </Grid>
              </Grid>
          </Container>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            handleSubmit(formData);
          }} 
          variant="contained" color='success' id='button'
          disabled={formData.diaSemana === '' || !validarHora(formData.horaInicio) || !validarHora(formData.horaFin) || !compararHoras(formData.horaInicio, formData.horaFin)}
          >
            Crear turno 
          </Button>

          <Button onClick={() => onClose()} variant="contained" id='button'>Cerrar</Button>
        </DialogActions>
    </Dialog>
  );
}
