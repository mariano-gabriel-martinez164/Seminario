# Ejecución de un proyecto de Django Rest Framework en local

A continuación se detallan los pasos necesarios para ejecutar **por primera vez** un proyecto de Django Rest Framework en un entorno local.

## Requisitos previos
- Python 3.x instalado en el sistema.
- Gestor de base de datos compatible con Django (SQLite3 para testeo) instalado y configurado.

## Pasos a seguir

1. Clonar el repositorio del proyecto desde GitHub:

```bash
git clone <URL_DEL_REPOSITORIO>
```

2. Acceder al directorio del proyecto:

```bash
cd <NOMBRE_DEL_PROYECTO>/backend
```

3. Crear y activar un entorno virtual:

```bash
python -m venv venv
source venv/bin/activate
```
(Si no funciona esto último instalar virtualenv):
```bash
pip install virtualenv
```

4. Instalar las dependencias del proyecto desde el archivo `requirements.txt`:

```bash
pip install -r requirements.txt
```

5. Realizar las migraciones a la base de datos:

```bash
python manage.py migrate
```

6. Ejecutar el servidor de desarrollo:

```bash
python manage.py runserver
```

7. Acceder a la aplicación en un navegador web:

```
http://localhost:8000/
```

¡Listo! Ahora puedes comenzar a utilizar el proyecto de Django Rest Framework en tu entorno local.
