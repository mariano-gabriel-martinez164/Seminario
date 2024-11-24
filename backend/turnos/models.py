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
    turnoTemplateId = None

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

    def __init__(self, *args, turnoTemplateId=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.turnoTemplateId = turnoTemplateId

    def __str__(self):
        if not self.agenda: agenda_id = None
        else: agenda_id = self.agenda.id
        return f"agenda: {agenda_id}, fecha: {self.fecha}, horaInicio: {self.horaInicio}, estado: {str(self.estado)}, ttid: {self.turnoTemplateId}"
    class Meta:
        ordering = ['fecha', 'horaInicio'] 


class TurnosPieza(models.Model):
    turno = models.ForeignKey(Turno, on_delete=models.CASCADE)
    pieza = models.ForeignKey(PiezaDental, on_delete=models.CASCADE)
    prestacion = models.ForeignKey(Prestacion, on_delete=models.CASCADE) 