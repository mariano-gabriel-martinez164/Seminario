from django.db import models
from Agenda.models import Agenda
from pacientes.models import Paciente
from custom_auth.models import Administrativo
from basic.models import PiezaDental, Prestacion

# Create your models here.
class Turno(models.Model):
    fecha = models.DateField()
    horaInicio = models.TimeField()
    horaFin = models.TimeField()
    observaciones = models.TextField(blank=True)
    esSobreturno = models.BooleanField()
    monto = models.FloatField()

    agenda = models.ForeignKey(Agenda, related_name='turnos_agenda',on_delete=models.SET_NULL, null=True)
    paciente = models.ForeignKey(Paciente, related_name='turnos_paciente', on_delete=models.SET_NULL, null=True)
    administrativo = models.ForeignKey(Administrativo, related_name='turnos_administrativo',on_delete=models.SET_NULL, null=True)

    choices = (
        ('Disponible', 'Disponible'),
        ('Asignado', 'Asignado'),
        ('Cancelado', 'Cancelado'),
        ('Realizado', 'Realizado'),
    )
    estado = models.CharField(max_length=20, choices=choices, default='Disponible')

    def __str__(self):
        return f"agenda: {self.agenda.id}, fecha: {self.fecha}, horaInicio: {self.horaInicio}, estado: {self.estado}"
    class Meta:
        ordering = ['fecha', 'horaInicio'] 


class TurnosPieza(models.Model):
    turno = models.ForeignKey(Turno, on_delete=models.CASCADE)
    pieza = models.ForeignKey(PiezaDental, on_delete=models.CASCADE)
    prestacion = models.ForeignKey(Prestacion, on_delete=models.CASCADE) 