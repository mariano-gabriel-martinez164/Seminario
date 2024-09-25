import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { Alert, Box, Button, Container, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { LockOutlined as LockOutlinedIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import './login.css'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); 
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault(); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/gettoken/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        login(token);
        navigate('/verAgenda');
      } else {
        setError('Error de autenticación');
      }
    } catch (error) {
      setError('Error al realizar la solicitud');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',   
        alignItems: 'center',       
        minHeight: '87vh',    
      }}
    >
      <Container component="main" maxWidth="xs" sx={{ mx: 'auto' }}>
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparencia ajustada
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
              />
               <TextField
                margin="normal"
                required
                fullWidth
                label="Contraseña"
                type={showPassword ? 'text' : 'password'} // Cambia entre 'text' y 'password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar sesión
              </Button>
              {error && <Alert severity="error">{error}</Alert>}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
