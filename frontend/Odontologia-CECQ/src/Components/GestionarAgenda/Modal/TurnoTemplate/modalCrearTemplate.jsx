import { 
  Alert, 
  Container, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  Typography, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl 
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { turnoTemplate } from './turnoTemplate';
import { usePostData } from '../../../../Request/v2/post';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { format } from 'date-fns';

export function ModalCrearTemplate({ open, onClose, agendaSeleccionado, setEstado }) {
  const [formData, setFormData] = useState({
    diaSemana: '',
    horaInicio: null,
    horaFin: null,
  });

  const compararHoras = (horaInicio, horaFin) => {
    return horaInicio && horaFin && horaInicio < horaFin;
  };

  const formatHora = (hora) => {
    if (!hora) return null;
    return format(hora, 'HH:mm'); // Convierte a formato HH:MM
  };

  const { postData, errorPost, loading } = usePostData();

  const handleSubmit = async (formData) => {
    const formattedData = {
      ...formData,
      horaInicio: formatHora(formData.horaInicio),
      horaFin: formatHora(formData.horaFin),
    };

    postData(`/turnotemplates/`, turnoTemplate(formattedData, agendaSeleccionado))
      .then(() => {
        setEstado('Creado');
        onClose();
      })
      .catch((error) => {
        console.error('Error al crear la agenda:', errorPost);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Typography 
          variant="h6" 
          sx={{ backgroundColor: '#343a40', color: 'white', p: 2, mb: 2, borderRadius: '8px' }}
        >
          Agregar odontólogo
        </Typography>
        {errorPost && <Alert severity="error" sx={{ mb: 2 }}>{errorPost}</Alert>}

        <form>
          <Container id="container">
            <Grid container spacing={2}>
              <Grid size={12}>
                <FormControl variant="standard" sx={{ width: '100%' }}>
                  <InputLabel id="dia-semana-label">Día de semana</InputLabel>
                  <Select
                    labelId="dia-semana-label"
                    id="dia-semana-select"
                    value={formData.diaSemana}
                    onChange={(event) => 
                      setFormData({ ...formData, diaSemana: event.target.value })
                    }
                    label="Día de semana"
                  >
                    <MenuItem value={0}>Lunes</MenuItem>
                    <MenuItem value={1}>Martes</MenuItem>
                    <MenuItem value={2}>Miércoles</MenuItem>
                    <MenuItem value={3}>Jueves</MenuItem>
                    <MenuItem value={4}>Viernes</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid size={6}>
                  <TimePicker
                    label="Hora de inicio"
                    value={formData.horaInicio}
                    onChange={(newValue) => 
                      setFormData({ ...formData, horaInicio: newValue })
                    }
                  />
                </Grid>

                <Grid size={6}>
                  <TimePicker
                    label="Hora de fin"
                    value={formData.horaFin}
                    onChange={(newValue) => 
                      setFormData({ ...formData, horaFin: newValue })
                    }
                  />
                </Grid>
              </LocalizationProvider>
            </Grid>
          </Container>
        </form>
      </DialogContent>

      <DialogActions>
        <Button 
          onClick={() => {
            handleSubmit(formData);
          }} 
          variant="contained" 
          color="success" 
          id="button"
          disabled={
            formData.diaSemana === '' || 
            !formData.horaInicio || 
            !formData.horaFin || 
            !compararHoras(formData.horaInicio, formData.horaFin)
          }
        >
          Crear 
        </Button>

        <Button 
          onClick={() => onClose()} 
          variant="contained" 
          id="button"
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
