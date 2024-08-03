from django.db import models
from basic.models import Odontologo, CentroOdontologico
from enum import Enum

# Create your models here.


class DiaSemanaEnum(Enum):
    LUNES = 'Lunes'
    MARTES = 'Martes'
    MIERCOLES = 'Miércoles'
    JUEVES = 'Jueves'
    VIERNES = 'Viernes'
    SABADO = 'Sábado'
    DOMINGO = 'Domingo'


class Agenda(models.Model):
    agendaID = models.AutoField(primary_key=True, null=False)
    odontologo = models.ForeignKey(Odontologo, on_delete=models.SET_NULL, null=True)
    CentroOdontologico = models.ForeignKey(CentroOdontologico, on_delete=models.SET_NULL, null=True)
    

def __str__(self):
    return f"Agenda de {self.odontologo} en {self.centro_odontologico}"

class turnoTemplate(models.Model):
    turnoTemplateId = models.AutoField(primary_key=True, null=False)
    horaInicio = models.TimeField()
    horaFin = models.TimeField()
    diaSemana = models.CharField(
        max_length=20,
        choices=[(dia.name, dia.value) for dia in DiaSemanaEnum]
    )
    agendaID = models.ForeignKey(Agenda, related_name='turnos', on_delete=models.CASCADE, null=True)

def __str__(self):
    return f"{self.diaSemana} de {self.horaInicio} a {self.horaFin}"