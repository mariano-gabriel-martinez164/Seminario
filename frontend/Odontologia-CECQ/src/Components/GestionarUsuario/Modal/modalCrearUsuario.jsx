import { useState } from 'react';
import { handleChange, isFormValid } from '../../GestionarUsuario/verificarFormulario';
import { FormControl, Alert,TextField, InputLabel, OutlinedInput, InputAdornment, FormHelperText,
  IconButton, Button, Container, Dialog, DialogActions, DialogContent, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';
import { usePostData } from '../../../Request/v2/post';
import { usuarioFormato } from '../usuario';


export function ModalCrearUsuario({ open, onClose, handleManejarUsuario }) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    apellido: '',
    cuil: '',
    contraseña: '',
    repeatPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { postData, errorPost, loading } = usePostData();

  const handleSubmit = async (formData) => {
    if (!isFormValid(formData)) return; // Validación del formulario
      postData('/auth/administrativos/', usuarioFormato(formData))
      .then(() => {
        handleManejarUsuario('Creado');
      })
      .catch((error) => {
      console.error('Error al crear el usuario:', errorPost);
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
		  
	  <Typography variant="h6" sx={{ backgroundColor: '#343a40', color: 'white', p: 2, mb: 2, borderRadius: '8px' }}>
			Crear Usuario
	  </Typography>

		<Container id='container'>
			<form>		
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

              <Grid size={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={(event) => handleChange(event, setFormData)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Contraseña"
                  />
                  <FormHelperText>Minimo 8 caracteres</FormHelperText>
                </FormControl>
              </Grid>

              <Grid size={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-repeat-password">Repetir Contraseña</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-repeat-password"
                    type={showPassword ? 'text' : 'password'}
                    name="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={(event) => handleChange(event, setFormData)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Repetir Contraseña"
                  />
                  <FormHelperText>Minimo 8 caracteres</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </Container>
      </DialogContent>

      <DialogActions>
        <Button 
          onClick={() => {
            handleSubmit(formData);
          }}
          variant="contained"
          color='success'
          id='button'
          disabled={!isFormValid(formData)}
        >
          Crear
        </Button>
        <Button onClick={() => onClose()} variant="contained" id='button'>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
