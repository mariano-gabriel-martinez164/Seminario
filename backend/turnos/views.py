from django.shortcuts import render
from rest_framework import generics
from .models import Turno, TurnosPieza
from .serializers import TurnoSerializer, ShortTurnoSerializer
from .serializers import TurnosPiezaCreateSerializer
from rest_framework.exceptions import ValidationError
from Agenda.models import Agenda, TurnoTemplate
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from django.db.models import Q
# Create your views here.

from .filters import TurnoFilter
from .models import Turno
from datetime import datetime, timedelta
from typing import List, Set

#! TurnoList no se usa en el código
class TurnoList(generics.ListCreateAPIView):
    queryset = Turno.objects.all()
    serializer_class = ShortTurnoSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = TurnoFilter

class TurnoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Turno.objects.all().prefetch_related(
        'turnospieza_set__prestacion', 
        'turnospieza_set__pieza',
    )
    serializer_class = TurnoSerializer

class TurnoAndTurnoTemplateList(generics.ListCreateAPIView):
    queryset = Turno.objects.all()
    serializer_class = ShortTurnoSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = TurnoFilter

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        # obtener parametros de la query
        min_date, max_date, odontologo, centro, agenda, administrativo, paciente, sobreturno = [
            self.request.query_params.get(a, None) for a in 
            [
                'fecha_inicio', 
                'fecha_fin', 
                'id_odontologo', 
                'id_centro', 
                'id_agenda',
                'id_administrativo',
                'id_paciente',
                'sobreturno'
            ]
        ]
        estados = self.request.query_params.getlist('estado')
        print(estados)
        if not estados:
            estados = [a[0] for a in Turno.choices]
        

        # Validaciones del rango de fechas
        dt_min, dt_max = self.validar_rango_fechas(min_date, max_date)
    

        # Rellenar con turnos de template
        print(f'sobreturno: {sobreturno}')
        if 'Disponible' in estados and not (paciente or administrativo or sobreturno=='true'): 
            agendas = self.obtener_agendas(odontologo, centro, agenda)
            queryset = self.transformar_template_a_turno(dt_min, dt_max, agendas, queryset)
        
        # Serializar y devolver respuesta
        serializer = self.get_serializer(queryset, many=True)
        print(queryset)
        return Response(serializer.data)
        
    
        
    def obtener_turnos_en_rango(self, min_date, max_date, agendas_ids):
        return Turno.objects.filter(
            fecha__gte=min_date, 
            fecha__lte=max_date, 
            agenda__in=agendas_ids
        ).exclude(
            estado='Disponible'
        )

    def validar_rango_fechas(self, min_date, max_date):
        if min_date is None or max_date is None:
            raise ValidationError('Se deben enviar las fechas min_date y max_date')
        try:
            dt_min = datetime.strptime(min_date, '%Y-%m-%d')
            dt_max = datetime.strptime(max_date, '%Y-%m-%d')
        except:
            raise ValidationError('Las fechas deben tener el formato YYYY-MM-DD') 
        
        if dt_min > dt_max:
            raise ValidationError('La fecha de inicio debe ser menor a la fecha de fin')
        
        DAYS = 31
        if dt_max - dt_min > timedelta(days=DAYS):
            raise ValidationError(f'El rango de fechas no puede superar los {DAYS} días')
        
        return dt_min, dt_max
        
    def obtener_agendas(self, odontologo:int, centro:int, agenda:int) -> set:
        if agenda:
            return set([int(agenda)])
        agendas = Agenda.objects.all()
        if odontologo:
            agendas = agendas.filter(odontologo=odontologo)
        if centro:
            agendas = agendas.filter(CentroOdontologico=centro)

        return set(agendas.values_list('id', flat=True))
    
    
    def transformar_template_a_turno(self, dt_min:datetime, dt_max:datetime, agendas_ids:set, turnos) -> list:
        turnos_template = list(TurnoTemplate.objects.filter(agenda__in=agendas_ids))
        agendas = Agenda.objects.filter(pk__in=agendas_ids)
        turnosList = list(self.obtener_turnos_en_rango(dt_min, dt_max, agendas_ids))
        turnosFull = list(turnos) # la lista de turnos que se devolverá al final
        # print(turnos_template)


        # print(f'fecha inicio: {dt_min}, fecha fin: {dt_max}')
        for fecha in range((dt_max - dt_min).days + 1):
            fecha = dt_min + timedelta(days=fecha)
            # print(f'Fecha: {fecha}')
            for agenda in agendas:
                # aux_tt = turnos_template.filter(agendaID=agenda, diaSemana=fecha.weekday())
                # aux_tt = [tt for tt in turnos_template if tt.agenda == agenda and int(tt.diaSemana) == fecha.weekday()]

                aux_tt_turnos = [
                    Turno(
                        fecha=fecha.date(),
                        horaInicio=tt.horaInicio,
                        horaFin=tt.horaFin,
                        agenda=agenda,
                        esSobreturno=False,
                        monto=0,
                        estado='Disponible',
                        turnoTemplateId=tt.id
                    ) for tt in turnos_template if 
                        tt.agenda == agenda and 
                        int(tt.diaSemana) == fecha.weekday() and
                        fecha.date() >= datetime.now().date()
                ] 
                # print(f'pre filtro: {aux_tt_turnos}')

                # aux_turnos = turnos.filter(fecha=fecha, agenda=agenda, esSobreturno=False)
                aux_turnos = [t for t in turnosList if t.fecha == fecha.date() and t.agenda == agenda and t.esSobreturno == False]
                for at in aux_turnos:
                    aux_tt_turnos = [tt for tt in aux_tt_turnos if not (
                    (tt.horaInicio <= at.horaInicio and tt.horaFin >= at.horaInicio) or
                    (tt.horaInicio <= at.horaFin and tt.horaFin >= at.horaFin) or
                    (tt.horaInicio >= at.horaInicio and tt.horaFin <= at.horaFin) or
                    (tt.horaInicio >= at.horaInicio and tt.horaFin <= at.horaFin)
                )]
                turnosFull.extend(aux_tt_turnos)
                # print(f'post filtro: {aux_tt_turnos}')

        # print('-'   * 50)
        return sorted(turnosFull , key=lambda x: (x.fecha, x.horaInicio)) 


class TurnosPiezaList(generics.CreateAPIView):
    queryset = TurnosPieza.objects.all()
    serializer_class = TurnosPiezaCreateSerializer

    # el endpoint debe permitir que se creen multiples turnosPieza en un solo request
    def create(self, request, *args, **kwargs):
        data = request.data
        if not isinstance(data, list):
            data = [data]
        serializer = self.get_serializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)