# Script para instalar las nuevas dependencias del backend en Windows

Write-Host "Instalando nuevas dependencias del backend..." -ForegroundColor Green

# Navegar al directorio del backend
Set-Location backend

# Instalar las nuevas dependencias
pip install google-auth==2.23.3 requests==2.31.0

Write-Host "Dependencias instaladas correctamente." -ForegroundColor Green
Write-Host ""
Write-Host "Para probar la integración:" -ForegroundColor Yellow
Write-Host "1. Asegurate de que el backend esté ejecutándose (python manage.py runserver)" -ForegroundColor White
Write-Host "2. Inicia el frontend (npm run dev)" -ForegroundColor White
Write-Host "3. Prueba el login con Google" -ForegroundColor White
Write-Host ""
Write-Host "El endpoint de Google Auth estará disponible en: http://127.0.0.1:8000/auth/google/" -ForegroundColor Cyan

# Volver al directorio raíz
Set-Location ..
