# Script para limpiar Git y arreglar problemas con .gitignore
# Ejecutar desde el directorio raíz del proyecto

Write-Host "Limpiando archivos .venv del control de versiones..." -ForegroundColor Yellow

# Remover archivos .venv del índice de Git (sin eliminarlos del disco)
git rm -r --cached .venv/ 2>$null
git rm -r --cached venv/ 2>$null
git rm -r --cached env/ 2>$null

# Remover archivos de Python cache
git rm -r --cached **/__pycache__/ 2>$null
git rm -r --cached **/*.pyc 2>$null

# Remover node_modules si está siendo rastreado
git rm -r --cached node_modules/ 2>$null
git rm -r --cached frontend/Odontologia-CECQ/node_modules/ 2>$null

# Remover archivos de base de datos
git rm --cached **/*.sqlite3 2>$null
git rm --cached backend/db.sqlite3 2>$null

Write-Host "Archivos removidos del índice de Git" -ForegroundColor Green

Write-Host "Verificando estado de Git..." -ForegroundColor Yellow
git status

Write-Host "" -ForegroundColor White
Write-Host "Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Revisa los archivos listados arriba" -ForegroundColor White
Write-Host "2. Si todo se ve bien, ejecuta:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Green
Write-Host "   git commit -m 'fix: Actualizar .gitignore y limpiar archivos innecesarios'" -ForegroundColor Green
Write-Host "   git push" -ForegroundColor Green
