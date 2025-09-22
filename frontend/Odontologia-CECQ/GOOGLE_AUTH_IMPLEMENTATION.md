# Guía de Implementación - Google Cloud Platform Auth

Este documento explica cómo completar la integración con Google Cloud Platform Auth Platform una vez que esté listo para implementar la funcionalidad real.

## 🚀 IMPLEMENTACIÓN COMPLETA DEL BACKEND

### Archivos del Backend Modificados/Creados:

1. **`backend/requirements.txt`** - Agregadas dependencias:
   ```
   google-auth==2.23.3
   requests==2.31.0
   ```

2. **`backend/custom_auth/views.py`** - Nueva vista `GoogleAuthView`:
   - Valida access tokens de Google
   - Crea automáticamente usuarios nuevos
   - Genera tokens JWT para autenticación
   - Maneja usuarios existentes

3. **`backend/custom_auth/urls.py`** - Nuevo endpoint:
   ```
   path('google/', views.GoogleAuthView.as_view(), name='google_auth')
   ```

### Flujo de Autenticación Implementado:

1. **Frontend**: Usuario hace clic en "Continuar con Google"
2. **Google**: Abre popup de OAuth2 y retorna access_token
3. **Frontend**: Envía access_token y userInfo al backend (`/auth/google/`)
4. **Backend**: 
   - Valida el token con Google APIs
   - Busca usuario existente por email
   - Si no existe, crea nuevo usuario automáticamente
   - Genera/retorna token JWT
5. **Frontend**: Recibe token JWT y autentica al usuario
6. **Usuario autenticado**: Puede acceder a `/auth/administrativos/me/`

### Instalación de Dependencias:

**Opción 1 - Manual:**
```bash
cd backend
pip install google-auth==2.23.3 requests==2.31.0
```

**Opción 2 - Script automático:**
```powershell
# En Windows PowerShell
.\install_google_deps.ps1
```

---

## Estado Actual

✅ **Completado:**
- Componente `GoogleLoginButton` creado con Google Identity Services
- Lógica completa migrada a Google Identity Services (`googleAuth.js`)
- Contexto de autenticación actualizado para manejar múltiples métodos
- Interfaz de usuario preparada con botón de Google y separador
- Estados de carga y manejo de errores
- **Google Client ID configurado: `173969532924-hjdn8tkorl80ph65qemo40n7v8utglbm.apps.googleusercontent.com`**
- Variables de entorno configuradas
- **Google Identity Services (nueva API) implementada**
- Migración completa desde bibliotecas deprecadas
- **✅ BACKEND IMPLEMENTADO: Endpoint `/auth/google/` creado**
- **✅ INTEGRACIÓN COMPLETA: Frontend conectado al backend**
- **✅ REGISTRO AUTOMÁTICO: Usuarios de Google se registran automáticamente**
- **✅ TOKENS JWT: Generación de tokens de autenticación para usuarios de Google**

🔄 **Pendiente de Implementación:**
- Configurar orígenes autorizados en Google Cloud Console (si aún no está hecho)
- Instalar dependencias del backend (`google-auth`, `requests`)
- Ejecutar migraciones si es necesario

## Pasos para Implementar GCP Auth

### 1. Configuración en Google Cloud Console

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Auth Platform
4. Configura el OAuth 2.0:
   - Ve a "Credenciales" > "Crear credenciales" > "ID de cliente OAuth 2.0"
   - Tipo de aplicación: "Aplicación web"
   - Orígenes autorizados: `http://localhost:5173` (para desarrollo)
   - URIs de redirección autorizados: `http://localhost:5173/auth/callback`

### 2. Instalar Dependencias

```bash
npm install @google-cloud/identity-platform
# o si prefieres usar la biblioteca de Google Sign-In:
npm install google-auth-library
```

### 3. Configuración del Frontend (ACTUALIZADO - Google Identity Services)

El frontend ya está actualizado con la nueva API. Código de ejemplo:

```javascript
// Configuración actualizada con Google Identity Services
const GOOGLE_CLIENT_ID = '173969532924-hjdn8tkorl80ph65qemo40n7v8utglbm.apps.googleusercontent.com';

export const initializeGoogleAuth = () => {
  return new Promise((resolve, reject) => {
    if (typeof window.google === 'undefined') {
      reject(new Error('Google Identity Services no está cargada'));
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const handleGoogleAuth = async () => {
  return new Promise((resolve, reject) => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID,
      scope: 'email profile openid',
      callback: async (response) => {
        // Procesar respuesta y obtener información del usuario
      },
    });
    client.requestAccessToken();
  });
};
```

### 4. Configuración del Backend

Crea un endpoint en Django para validar tokens de Google:

```python
# En views.py
from google.oauth2 import id_token
from google.auth.transport import requests

def google_auth(request):
    token = request.data.get('idToken')
    
    try:
        # Verificar el token
        idinfo = id_token.verify_oauth2_token(
            token, requests.Request(), GOOGLE_CLIENT_ID
        )
        
        # Obtener información del usuario
        email = idinfo['email']
        name = idinfo['name']
        
        # Crear o encontrar usuario
        user, created = User.objects.get_or_create(
            email=email,
            defaults={'username': email, 'first_name': name}
        )
        
        # Generar JWT token
        jwt_token = generate_jwt_token(user)
        
        return Response({
            'token': jwt_token,
            'user': {
                'email': email,
                'name': name,
            }
        })
    except ValueError:
        return Response({'error': 'Token inválido'}, status=400)
```

### 5. Variables de Entorno

Crea un archivo `.env` en el frontend:

```
VITE_BASE_URL=http://127.0.0.1:8000
VITE_GOOGLE_CLIENT_ID=173969532924-hjdn8tkorl80ph65qemo40n7v8utglbm.apps.googleusercontent.com
```

### 6. Cargar Google Identity Services

Actualizado en `index.html`:

```html
<head>
  <!-- Google Identity Services (Nueva biblioteca) -->
  <script src="https://accounts.google.com/gsi/client" async defer></script>
</head>
```

## Archivos Modificados

- ✅ `src/Components/Login/GoogleLoginButton.jsx` - Componente del botón
- ✅ `src/Components/Login/googleAuth.js` - Lógica de autenticación
- ✅ `src/Components/Login/authContext.jsx` - Contexto actualizado
- ✅ `src/Components/Login/login.jsx` - Componente principal actualizado
- ✅ `src/Components/Login/login.css` - Estilos adicionales

## Notas Importantes

1. **Seguridad**: Nunca expongas el client secret en el frontend
2. **CORS**: Configura correctamente los orígenes permitidos en GCP
3. **HTTPS**: En producción, usa HTTPS para todas las URLs
4. **Tokens**: Los tokens de Google deben validarse siempre en el backend
5. **Usuarios**: Decide cómo manejar usuarios que existen con email/password y luego usan Google

## Testing

Para probar la implementación:

1. Asegúrate de que el backend valide correctamente los tokens
2. Prueba con cuentas de Google reales
3. Verifica el flujo de logout
4. Confirma que los permisos de usuario se manejen correctamente

## Contacto

Si necesitas ayuda con la implementación, revisa la documentación oficial de:
- [Google Identity Platform](https://cloud.google.com/identity-platform/docs)
- [Google Sign-In for Websites](https://developers.google.com/identity/sign-in/web)
