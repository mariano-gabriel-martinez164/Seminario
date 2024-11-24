import { useState, useEffect } from 'react';
import { useFetch } from '../../../Request/v2/fetch';
import { Estado } from '../../BuscarTurno/CrudTurno/modalAsignado';
import { handleChange } from '../../GestionarUsuario/verificarFormulario';
import { usePutData } from '../../../Request/v2/put2';

import { TextField, Container, Button, Dialog, DialogActions, DialogContent, Alert, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export function ModalModificarUsuario({ open, onClose, setEstadoModal, usuarioSeleccionado, handleManejarUsuario }) {
  const { data: administrativo, loading: isLoading, error } = useFetch(`/auth/administrativos/${usuarioSeleccionado}/`);
  const [formData, setFormData] = useState({
    first_name: administrativo?.first_name,
    last_name: administrativo?.last_name,
    email: administrativo?.email,
    cuil: administrativo?.cuil,
  });

  useEffect(() => {
    if (administrativo) {
      setFormData({
        first_name: administrativo.first_name || '',
        last_name: administrativo.last_name || '',
        email: administrativo.email || '',
        cuil: administrativo.cuil || '',
      });
    }
  }, [administrativo]);

  const { putData, errorPut, loading } = usePutData();

  const handleButtonClick = () => {
    putData(`/auth/administrativos/${usuarioSeleccionado}/`, formData)
      .then(() => {
        Estado(onClose(), setEstadoModal, 'Modificado');
        handleManejarUsuario('Modificado');
      })
      .catch((err) => {
        console.error('Error modificando el usuario:', err);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} keepMounted aria-describedby="alert-dialog-slide-description">
      {isLoading && <Alert severity="info" sx={{ width: '100%' }}>Cargando...</Alert>}
      {error && <Alert severity="error" sx={{ width: '100%' }}>{error}</Alert>}
      {errorPut && <Alert severity="error" sx={{ width: '100%' }}>{errorPut}</Alert>}
      {administrativo && !isLoading && !error && (
        <>
          <DialogContent>
			  <form>
			    <Typography variant="h6" sx={{ backgroundColor: '#343a40', color: 'white', p: 2, mb: 3, borderRadius: '8px' }}>
					Editar Usuario
	  			</Typography>
                <Container id='container'>
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <TextField
                      label='nombre'
                      multiline
                      maxRows={4}
                      name="first_name"
                      value={formData.first_name}
                      onChange={(event) => handleChange(event, setFormData)}
                      fullWidth
                    />
                  </Grid>
                  <Grid size={6}>
                    <TextField
                      label='apellido'
                      multiline
                      maxRows={4}
                      name="last_name"
                      value={formData.last_name}
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
            <Button onClick={handleButtonClick} variant="contained" color="warning" id="button">
              Modificar
            </Button>
            <Button onClick={onClose} variant="contained" id="button">Cerrar</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
