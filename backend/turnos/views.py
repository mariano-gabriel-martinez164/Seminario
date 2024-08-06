from django.shortcuts import render
from rest_framework import generics
from .models import Turno, TurnosPieza
from .serializers import TurnoSerializer
from rest_framework.exceptions import ValidationError
from Agenda.models import Agenda
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.


import django_filters
from .models import Turno

class TurnoFilter(django_filters.FilterSet):
    fecha_inicio = django_filters.DateFilter(field_name='fecha', lookup_expr='gte')
    fecha_fin = django_filters.DateFilter(field_name='fecha', lookup_expr='lte')
    id_odontologo = django_filters.NumberFilter(field_name='agenda__odontologo')
    id_centro = django_filters.NumberFilter(field_name='agenda__CentroOdontologico')
    id_agenda = django_filters.NumberFilter(field_name='agenda__agendaID')

    class Meta:
        model = Turno
        fields = ['fecha_inicio', 'fecha_fin', 'id_odontologo', 'id_centro', 'id_agenda']

class TurnoList(generics.ListCreateAPIView):
    queryset = Turno.objects.all()
    serializer_class = TurnoSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = TurnoFilter