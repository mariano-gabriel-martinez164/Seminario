from django.shortcuts import render
from .serializers import AdministrativoSerializer, ChangePasswordSerializer, UpdateAdministrativoSerializer, AdministrativoIdSerializer
from .models import Administrativo
# Create your views here.
from rest_framework import generics
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
import requests  # Para hacer peticiones HTTP
import logging

logger = logging.getLogger(__name__)

class AdministrativoList(generics.ListCreateAPIView):
    queryset = Administrativo.objects.all()
    serializer_class = AdministrativoSerializer

class AdministrativoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Administrativo.objects.all()
    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return UpdateAdministrativoSerializer
        return AdministrativoSerializer

class AdministrativoData(generics.RetrieveAPIView):
    queryset = Administrativo.objects.all()
    serializer_class = AdministrativoIdSerializer
    permission_classes = (IsAuthenticated,)
    
    def get_object(self, queryset=None):
    # Retrieve the authenticated user from the request
        return self.request.user
    

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = get_user_model()
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        print(self.request.user)
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)

            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response({"status": "password set"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GoogleAuthView(APIView):
    """
    Vista para manejar la autenticación con Google OAuth2
    """
    permission_classes = [AllowAny]  # Permitir acceso sin autenticación
    
    def post(self, request):
        try:
            # Obtener el access token del request
            access_token = request.data.get('access_token')
            user_info = request.data.get('userInfo')
            
            if not access_token or not user_info:
                return Response({
                    'error': 'access_token y userInfo son requeridos'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Validar el access token con Google
            google_response = requests.get(
                f'https://www.googleapis.com/oauth2/v2/userinfo?access_token={access_token}',
                timeout=10
            )
            
            if google_response.status_code != 200:
                return Response({
                    'error': 'Token de Google inválido',
                    'details': google_response.text,
                    'status_code': google_response.status_code
                }, status=status.HTTP_401_UNAUTHORIZED)
            
            try:
                google_user_data = google_response.json()
            except ValueError as e:
                return Response({
                    'error': 'Respuesta inválida de Google',
                    'details': str(e)
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Verificar que el email coincida con el del userInfo enviado
            google_email = google_user_data.get('email')
            frontend_email = user_info.get('email')
            
            if not google_email:
                return Response({
                    'error': 'No se pudo obtener el email desde Google'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            if google_email != frontend_email:
                return Response({
                    'error': 'La información del usuario no coincide con el token'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Extraer información del usuario
            email = google_email
            # Usar datos de Google como fuente principal, con fallback a datos del frontend
            first_name = (google_user_data.get('given_name') or 
                         user_info.get('name', '').split(' ')[0] or 
                         'Usuario')
            last_name = (google_user_data.get('family_name') or 
                        ' '.join(user_info.get('name', '').split(' ')[1:]) or 
                        '')
            
            # Buscar o crear el usuario
            try:
                user = Administrativo.objects.get(email=email)
                created = False
            except Administrativo.DoesNotExist:
                # Crear nuevo usuario
                user = Administrativo.objects.create_user(
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    # No establecer password para usuarios de Google Auth
                )
                created = True
                
                # Hacer administrador a usuarios de Google
                user.is_staff = True
                user.is_superuser = True
                user.save()
            
            # Actualizar información del usuario si cambió
            if not created:
                user.first_name = first_name
                user.last_name = last_name
                
                # Asegurar que tenga permisos de administrador
                user.is_staff = True
                user.is_superuser = True
                
                user.save()
            
            # Crear o obtener token de autenticación
            token, token_created = Token.objects.get_or_create(user=user)
            
            # Retornar respuesta exitosa
            response_data = {
                'token': token.key,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'is_staff': user.is_staff,
                    'is_superuser': user.is_superuser,
                },
                'created': created,  # Indica si el usuario fue creado o ya existía
                'message': 'Autenticación exitosa',
                'admin_privileges': True  # Todos los usuarios de Google tienen privilegios de admin
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': 'Error interno del servidor',
                'details': str(e),
                'type': type(e).__name__
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)