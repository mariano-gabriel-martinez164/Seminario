from django.db import models

class Paciente(models.Model):
    nombre = models.CharField(max_length=15)
    apellido = models.CharField(max_length=15)
    dni = models.IntegerField(unique=True, primary_key=True, null=False, blank=False)
    email = models.EmailField(blank=True, null=True)
    fecha_nacimiento = models.DateField()
    telefono = models.CharField(max_length=15)

    def __str__(self):
        return f'{self.nombre} {self.apellido} - {self.dni}'