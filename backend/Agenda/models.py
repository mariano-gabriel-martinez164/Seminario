from django.db import models
from basic.models import Odontologo, CentroOdontologico
# Create your models here.


class Agenda(models.Model):
    agendaID = models.IntegerField(primary_key=True, null=False)
    odontologoID = models.ForeignKey(Odontologo, on_delete=models.SET_NULL, null=True)
    CentroOdontologicoID = models.ForeignKey(CentroOdontologico, on_delete=models.SET_NULL, null=True)
    

def __str__(self):
    return f"Agenda de {self.odontologo} en {self.centro_odontologico}"

class turnoTemplate(models.Model):
    turnoTemplateId = models.IntegerField(primary_key=True, null=False)
    horaInicio = models.TimeField()
    horaFin = models.TimeField()
    diaSemana = models.CharField(max_length=20)
    agendaID = models.ForeignKey(Agenda, related_name='turnos', on_delete=models.SET_NULL, null=True)

def __str__(self):
    return f"{self.diaSemana} de {self.horaInicio} a {self.horaFin}"