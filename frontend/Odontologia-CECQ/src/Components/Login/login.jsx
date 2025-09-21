import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { Alert, Box, Button, Container, TextField, Typography, IconButton, InputAdornment, Divider } from '@mui/material';
import { LockOutlined as LockOutlinedIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import './login.css'; 
import { fetchLogin } from '../../Request/v2/fetchLogin';
import GoogleLoginButton from './GoogleLoginButton';
import { handleGoogleAuth } from './googleAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setIsLoading(true);

    const errorMessage = await fetchLogin(username, password, login, navigate); 

    if (errorMessage) {
      setError(errorMessage); 
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      const result = await handleGoogleAuth();
      
      if (result.success) {
        // Usar el token y información del usuario obtenidos
        login(result.token, 'google', result.userInfo);
        
        // Mostrar mensaje de éxito temporal
        console.log('Login exitoso con Google:', result.userInfo);
        
        // Navegar al dashboard o página principal
        navigate('/'); // Ajusta la ruta según tu aplicación
        
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Error inesperado en la autenticación con Google');
      console.error('Error Google Auth:', error);
    }
    
    setIsLoading(false);
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev); 
  const handleMouseDownPassword = (event) => event.preventDefault();

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
            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
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
            
            {/* Google Login Section */}
            <Box sx={{ width: '100%', mt: 2 }}>
              <GoogleLoginButton 
                onGoogleLogin={handleGoogleLogin} 
                disabled={isLoading}
              />
              
              <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                <Divider sx={{ flex: 1 }} />
                <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
                  o continúa con
                </Typography>
                <Divider sx={{ flex: 1 }} />
              </Box>
            </Box>
            
            {/* Traditional Login Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
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
                type={showPassword ? 'text' : 'password'} 
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
                disabled={isLoading}
                sx={{ mt: 3, mb: 2 }}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>
              {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;



