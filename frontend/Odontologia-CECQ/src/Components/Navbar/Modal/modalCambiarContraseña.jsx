import React, { useState } from 'react';
import { fetchContraseña } from '../../../Request/v2/fetchContraseña'; 
import {
  FormControl, TextField, InputLabel, OutlinedInput,
  InputAdornment, IconButton, Button, Container,
  Dialog, DialogActions, DialogContent, Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function ModalCambiarContraseña({ open, onClose }) {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    repeatPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    newPassword: '',
    repeatPassword: '',
  });
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMessage(''); 
    setErrorMessage(''); 
  };

  const validatePasswords = () => {
    const { newPassword, repeatPassword } = formData;
    let valid = true;
    let newPasswordError = '';
    let repeatPasswordError = '';

    if (newPassword.length < 8) {
      newPasswordError = 'La nueva contraseña debe tener al menos 8 caracteres.';
      valid = false;
    }

    if (newPassword !== repeatPassword) {
      repeatPasswordError = 'Las contraseñas no coinciden.';
      valid = false;
    }

    setErrors({
      newPassword: newPasswordError,
      repeatPassword: repeatPasswordError,
    });

    return valid;
  };

  const handleSubmit = async () => {
    const { oldPassword, newPassword } = formData;

    if (!validatePasswords()) {
      return;
    }

    const result = await fetchContraseña(oldPassword, newPassword);

    if (result.error) {
      setErrorMessage(result.error); 
      setSuccessMessage(''); 
    } else {
      setSuccessMessage('Contraseña cambiada exitosamente'); 
      setErrorMessage(''); 
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Container>
          {successMessage && (
            <Typography variant="h6" color="success.main" align="center" gutterBottom>
              {successMessage}
            </Typography>
          )}
          {errorMessage && ( 
            <Typography variant="h6" color="error.main" align="center" gutterBottom>
              {errorMessage}
            </Typography>
          )}
          <form>
            <FormControl fullWidth variant="outlined" margin="normal">
              <TextField
                label="Contraseña actual"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
              />
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="new-password">Contraseña nueva</InputLabel>
              <OutlinedInput
                id="new-password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                error={!!errors.newPassword} 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.newPassword && <p style={{ color: 'red' }}>{errors.newPassword}</p>}
            </FormControl>

            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel htmlFor="repeat-password">Repetir contraseña nueva</InputLabel>
              <OutlinedInput
                id="repeat-password"
                name="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                error={!!errors.repeatPassword} 
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {errors.repeatPassword && <p style={{ color: 'red' }}>{errors.repeatPassword}</p>}
            </FormControl>
          </form>
        </Container>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="outlined">
          Cambiar contraseña
        </Button>
        <Button onClick={onClose} variant="outlined">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
