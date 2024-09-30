import React, { useState } from 'react';
import { FormControl, TextField, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, Container, Dialog, DialogActions, DialogContent, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Grid from '@mui/material/Grid2';

export function ModalCambiarContraseña({ open, onClose }) {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isFormValid = () => {
    return formData.newPassword.length >= 8 && formData.newPassword === formData.repeatNewPassword;
  };

  const handleSubmit = () => {

    console.log("Formulario enviado", formData);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent>
        <Container>
          <form>
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="current-password">Contraseña actual</InputLabel>
                  <OutlinedInput
                    id="current-password"
                    type={showPassword ? 'text' : 'password'}
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
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
                    label="Contraseña actual"
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="new-password">Contraseña nueva</InputLabel>
                  <OutlinedInput
                    id="new-password"
                    type={showPassword ? 'text' : 'password'}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
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
                    label="Contraseña nueva"
                  />
                  <FormHelperText>Mínimo 8 caracteres</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="repeat-new-password">Repetir contraseña nueva</InputLabel>
                  <OutlinedInput
                    id="repeat-new-password"
                    type={showPassword ? 'text' : 'password'}
                    name="repeatNewPassword"
                    value={formData.repeatNewPassword}
                    onChange={handleChange}
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
                    label="Repetir contraseña nueva"
                  />
                  <FormHelperText>Mínimo 8 caracteres</FormHelperText>
                </FormControl>
              </Grid>

            </Grid>
          </form>
        </Container>
      </DialogContent>

      <DialogActions>
        <Button 
          onClick={handleSubmit}
          variant="outlined" 
          disabled={!isFormValid()}
        >
          Cambiar contraseña
        </Button>
        <Button onClick={onClose} variant="outlined">Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
