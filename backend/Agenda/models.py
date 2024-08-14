from django.db import models
from basic.models import Odontologo, CentroOdontologico
from enum import Enum

# Create your models here.


class DiaSemanaEnum(Enum):
    LUNES = 0
    MARTES = 1
    MIERCOLES = 2
    JUEVES = 3
    VIERNES = 4
    SABADO = 5
    DOMINGO = 6


class Agenda(models.Model):
    id = models.AutoField(primary_key=True)
    odontologo = models.ForeignKey(Odontologo, on_delete=models.SET_NULL, null=True)
    CentroOdontologico = models.ForeignKey(CentroOdontologico, on_delete=models.SET_NULL, null=True)
    

def __str__(self):
    return f"Agenda de {self.odontologo} en {self.centro_odontologico}"

class TurnoTemplate(models.Model):
    id = models.AutoField(primary_key=True)
    horaInicio = models.TimeField()
    horaFin = models.TimeField()
    diaSemana = models.PositiveSmallIntegerField(
        choices=[(dia.value, dia.name) for dia in DiaSemanaEnum]
    )
    agenda = models.ForeignKey(Agenda, related_name='turnos', on_delete=models.CASCADE, null=True)

def __str__(self):
    return f"{self.diaSemana} de {self.horaInicio} a {self.horaFin}"