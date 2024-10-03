import { deleteData } from '../../../Request/delete';
import { useState, useEffect } from 'react';
import { useFetch } from '../../../Request/fetch';
import { Estado } from '../../BuscarTurno/CrudTurno/modalAsignado';
import { handleChange, handleModify } from '../../GestionarUsuario/verificarFormulario';

import { TextField, Container, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import Grid from '@mui/material/Grid2';

export function ModalModificarUsuario({ open, onClose, setEstadoModal, usuarioSeleccionado }) {
  const administrativo = useFetch(usuarioSeleccionado ? `/auth/administrativos/${usuarioSeleccionado}/` : null);
  const [formData, setFormData] = useState({
    nombre: administrativo.first_name || '',
    apellido: administrativo.last_name || '',
    email: administrativo.email || '',
    cuil: administrativo.cuil || '',
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
          }} 
          variant="outlined" color='warning' id='button'>Modificar</Button>
          
          <Button onClick={() => {
            deleteData(`/auth/administrativos/${usuarioSeleccionado}/`);
            Estado(onClose(), setEstadoModal, 'Eliminado');
          }} variant="outlined" color="error">Eliminar usuario</Button>

          <Button onClick={() => onClose()} variant="outlined" id='button'>Cerrar</Button>
        </DialogActions>
    </Dialog>
  );
}
