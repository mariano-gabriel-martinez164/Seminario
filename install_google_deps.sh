#!/bin/bash
# Script para instalar las nuevas dependencias del backend

echo "Instalando nuevas dependencias del backend..."

# Navegar al directorio del backend
cd backend

# Instalar las nuevas dependencias
pip install google-auth==2.23.3 requests==2.31.0

echo "Dependencias instaladas correctamente."
echo ""
echo "Para probar la integración:"
echo "1. Asegúrate de que el backend esté ejecutándose (python manage.py runserver)"
echo "2. Inicia el frontend (npm run dev)"
echo "3. Prueba el login con Google"
echo ""
echo "El endpoint de Google Auth estará disponible en: http://127.0.0.1:8000/auth/google/"
