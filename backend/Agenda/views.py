from django.shortcuts import render
from  rest_framework import generics
from .serializers import AgendaSerializer, AgendaCreateSerializer, TurnoTemplateSerializer
from .models import Agenda, TurnoTemplate
import django_filters
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q

# Create your views here.

class AgendaFilter(django_filters.FilterSet):

    class Meta:
        model = Agenda
        fields = ['odontologo', 'CentroOdontologico']
    

class AgendaList(generics.ListCreateAPIView):
    queryset = Agenda.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = AgendaFilter

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AgendaCreateSerializer
        return AgendaSerializer

class AgendaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Agenda.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'PUT':
            return AgendaCreateSerializer
        return AgendaSerializer

class TurnoTemplateList(generics.ListCreateAPIView):
    queryset = TurnoTemplate.objects.all()
    serializer_class = TurnoTemplateSerializer

class TurnoTemplateDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TurnoTemplate.objects.all()
    serializer_class = TurnoTemplateSerializer





