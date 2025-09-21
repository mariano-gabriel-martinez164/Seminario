// Configuración de Google Auth con la nueva Google Identity Services (GIS)
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

let isGoogleInitialized = false;

// Función para inicializar Google Identity Services
export const initializeGoogleAuth = () => {
  return new Promise((resolve, reject) => {
    // Verificar que google esté disponible
    if (typeof window.google === 'undefined') {
      reject(new Error('Google Identity Services no está cargada'));
      return;
    }

    try {
      // Inicializar Google Identity Services
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse, // Callback para el popup
      });

      isGoogleInitialized = true;
      console.log('Google Identity Services inicializado correctamente');
      resolve();
    } catch (error) {
      console.error('Error inicializando Google Identity Services:', error);
      reject(error);
    }
  });
};

// Callback para manejar la respuesta del credential (no se usa en nuestro caso de popup)
const handleCredentialResponse = (response) => {
  console.log('Credential response:', response);
};

// Función para manejar el login con Google usando popup
export const handleGoogleAuth = async () => {
  try {
    console.log('Iniciando proceso de autenticación con Google...');
    
    // Verificar que Google Identity Services esté inicializado
    if (!isGoogleInitialized || typeof window.google === 'undefined') {
      await initializeGoogleAuth();
    }

    // Crear una promesa para manejar el popup de OAuth
    return new Promise((resolve, reject) => {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'email profile openid',
        callback: async (response) => {
          try {
            if (response.error) {
              reject({
                error: response.error,
                details: response.error_description || 'Error en la autenticación'
              });
              return;
            }

            // Obtener información del usuario con el access token
            const userInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`);
            
            if (!userInfoResponse.ok) {
              throw new Error('Error obteniendo información del usuario');
            }

            const userInfo = await userInfoResponse.json();
            
            console.log('Usuario autenticado:', userInfo);
            
            // Aquí es donde enviarías el token al backend para validación
            // Por ahora retornamos datos simulados para que puedas probar
            
            // TODO: Descomentar cuando tengas el backend listo
            /*
            const backendResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/google/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                access_token: response.access_token,
                userInfo: userInfo 
              }),
            });
            
            if (!backendResponse.ok) {
              throw new Error('Error en la validación del backend');
            }
            
            const data = await backendResponse.json();
            resolve({
              success: true,
              token: data.token,
              userInfo: data.user,
              message: 'Autenticación exitosa'
            });
            */
            
            // Simulación temporal - remover cuando implementes el backend
            resolve({
              success: true,
              token: `google_token_simulation_${Date.now()}`,
              userInfo: {
                id: userInfo.id,
                name: userInfo.name,
                email: userInfo.email,
                imageUrl: userInfo.picture,
              },
              message: `¡Bienvenido ${userInfo.name}! Autenticación con Google exitosa.`
            });
            
          } catch (error) {
            reject({
              error: 'processing_error',
              details: error.message
            });
          }
        },
      });

      // Solicitar el token (abre el popup)
      client.requestAccessToken();
    });
    
  } catch (error) {
    console.error('Error en autenticación con Google:', error);
    
    // Manejar errores específicos
    if (error.error === 'popup_closed_by_user') {
      return {
        success: false,
        message: 'Autenticación cancelada por el usuario'
      };
    }
    
    if (error.error === 'idpiframe_initialization_failed') {
      return {
        success: false,
        message: 'Error de configuración: El origen no está autorizado. Por favor, registra tu dominio en Google Cloud Console.',
        error: error.error
      };
    }
    
    return {
      success: false,
      message: 'Error en la autenticación con Google: ' + (error.details || error.message),
      error: error.error || error.message
    };
  }
};

// Función para cerrar sesión de Google
export const googleSignOut = async () => {
  try {
    console.log('Cerrando sesión de Google...');
    
    // Con Google Identity Services, no hay un método directo de signOut
    // El logout se maneja principalmente en el lado del servidor
    // Aquí solo limpiamos el estado local
    
    isGoogleInitialized = false;
    
    console.log('Sesión de Google cerrada correctamente');
    
    return {
      success: true,
      message: 'Sesión de Google cerrada'
    };
  } catch (error) {
    console.error('Error cerrando sesión de Google:', error);
    return {
      success: false,
      message: 'Error cerrando sesión de Google',
      error: error.message
    };
  }
};

// Función para verificar si Google Identity Services está disponible
export const isGoogleAvailable = () => {
  return typeof window.google !== 'undefined' && 
         typeof window.google.accounts !== 'undefined';
};
