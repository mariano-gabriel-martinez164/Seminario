import { useState, useEffect } from 'react';
import { useFetch } from '../../../Request/v2/fetch';
import { Estado } from '../../BuscarTurno/CrudTurno/modalAsignado';
import { handleChange, handleModify } from '../../GestionarUsuario/verificarFormulario';

import { TextField, Container, Button, Dialog, DialogActions, DialogContent, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';

export function ModalModificarUsuario({ open, onClose, setEstadoModal, usuarioSeleccionado, handleCrearUsuario }) {
  const { data: administrativo, loading: isLoading, error } = useFetch(`/auth/administrativos/${usuarioSeleccionado}/`);
  console.log(administrativo);
  const [formData, setFormData] = useState({
    nombre: administrativo?.first_name,
    apellido: administrativo?.last_name,
    email: administrativo?.email,
    cuil: administrativo?.cuil,
  });

  useEffect(() => {
    if (administrativo) {
      setFormData({
        nombre: administrativo.first_name || '',
        apellido: administrativo.last_name || '',
        email: administrativo.email || '',
        cuil: administrativo.cuil || '',
      });
    }
  }, [administrativo]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
        {isLoading && <Alert severity="info" sx={{width:'100%'}}>Cargando...</Alert>}
        {error && <Alert severity="error" sx={{width:'100%'}}>{error}</Alert>}
        {administrativo && !isLoading && !error &&
        <>
        <DialogContent>
        <form>
          <Container id='container'>
              <Grid container spacing={2}>
                
                <Grid size={6}>
                  <TextField
                    label='Nombre'
                    multiline
                    maxRows={4}
                    name="nombre"
                    value={formData.nombre}
                    onChange={(event) => handleChange(event, setFormData)}
                    fullWidth
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    label='Apellido'
                    multiline
                    maxRows={4}
                    name="apellido"
                    value={formData.apellido}
                    onChange={(event) => handleChange(event, setFormData)}
                    fullWidth
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label='Cuil'
                    multiline
                    maxRows={4}
                    name="cuil"
                    value={formData.cuil}
                    onChange={(event) => handleChange(event, setFormData)}
                    fullWidth
                  />
                </Grid>

                <Grid size={12}>
                  <TextField
                    label='Email'
                    multiline
                    maxRows={4}
                    name="email"
                    value={formData.email}
                    onChange={(event) => handleChange(event, setFormData)}
                    fullWidth
                    />
                </Grid>
              </Grid>
          </Container>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => {
            handleModify(formData, usuarioSeleccionado);
            Estado(onClose(), setEstadoModal, 'Modificado');
            handleCrearUsuario('Modificado');
          }} 
          variant="outlined" color='warning' id='button'>Modificar</Button>

          <Button onClick={() => onClose()} variant="outlined" id='button'>Cerrar</Button>
        </DialogActions>
        </>
    }
    </Dialog>
  );
}
