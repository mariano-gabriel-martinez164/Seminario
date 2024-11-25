from django.db import models

# Create your models here.
class PiezaDental(models.Model):
    codigo = models.CharField(max_length=3, primary_key=True)
    nombre = models.CharField(max_length=15)

    def __str__(self):
        return f'{self.codigo} - {self.nombre}'
    
class Prestacion(models.Model):
    codigo = models.CharField(max_length=3, primary_key=True)
    nombre = models.CharField(max_length=15)
    precio = models.DecimalField(max_digits=11,decimal_places=2)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.codigo} - {self.nombre} - ${self.precio}'
    
class Odontologo(models.Model):
    matricula = models.CharField(max_length=30, unique=True, primary_key=True, null=False, blank=False)
    nombre = models.CharField(max_length=15)
    apellido = models.CharField(max_length=15)
    cuil = models.IntegerField(unique=True, null=False, blank=False)

    def __str__(self):
        return f'{self.matricula} - {self.apellido} {self.nombre}'

class CentroOdontologico(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=15)
    direccion = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.nombre} - {self.direccion}'