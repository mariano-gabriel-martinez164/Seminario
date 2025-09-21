import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { initializeGoogleAuth, isGoogleAvailable } from './googleAuth';

const GoogleLoginButton = ({ onGoogleLogin, disabled = false }) => {
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const [initError, setInitError] = useState(null);

  useEffect(() => {
    // Inicializar Google Identity Services cuando el componente se monta
    const initGoogle = async () => {
      try {
        // Esperar un poco para que Google Identity Services se cargue
        let attempts = 0;
        const maxAttempts = 10;
        
        while (!isGoogleAvailable() && attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 500));
          attempts++;
        }
        
        if (!isGoogleAvailable()) {
          throw new Error('Google Identity Services no se cargó correctamente');
        }
        
        await initializeGoogleAuth();
        setIsGoogleReady(true);
        setInitError(null);
        console.log('Google Login Button listo');
      } catch (error) {
        console.error('Error inicializando Google Auth:', error);
        setInitError(error.message);
        setIsGoogleReady(false);
      }
    };

    initGoogle();
  }, []);

  const handleGoogleLogin = () => {
    if (!isGoogleReady) {
      console.error('Google Identity Services no está listo');
      return;
    }

    console.log('Iniciando sesión con Google...');
    
    if (onGoogleLogin) {
      onGoogleLogin();
    }
  };

  const isButtonDisabled = disabled || !isGoogleReady;

  return (
    <Box sx={{ mt: 2, mb: 1 }}>
      <Button
        fullWidth
        variant="outlined"
        onClick={handleGoogleLogin}
        disabled={isButtonDisabled}
        startIcon={<GoogleIcon />}
        sx={{
          borderColor: isGoogleReady ? '#4285f4' : '#ccc',
          color: isGoogleReady ? '#4285f4' : '#999',
          '&:hover': {
            borderColor: isGoogleReady ? '#3367d6' : '#ccc',
            backgroundColor: isGoogleReady ? 'rgba(66, 133, 244, 0.04)' : 'transparent',
          },
          textTransform: 'none',
          fontSize: '14px',
          fontWeight: 500,
          py: 1.5,
        }}
      >
        {!isGoogleReady && !initError 
          ? 'Cargando Google...' 
          : initError 
            ? 'Error en Google Auth' 
            : 'Continuar con Google'
        }
      </Button>
      
      {initError && (
        <Box sx={{ mt: 1, fontSize: '12px', color: 'error.main', textAlign: 'center' }}>
          Error: {initError}
        </Box>
      )}
    </Box>
  );
};

export default GoogleLoginButton;
