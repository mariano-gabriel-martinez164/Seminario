from django.shortcuts import render
from  rest_framework import generics
from .serializers import AgendaSerializer, TurnoTemplateSerializer
from .models import Agenda, TurnoTemplate

# Create your views here.

class AgendaList(generics.ListCreateAPIView):
    queryset = Agenda.objects.all()
    serializer_class = AgendaSerializer

class AgendaDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Agenda.objects.all()
    serializer_class = AgendaSerializer

class TurnoTemplateList(generics.ListCreateAPIView):
    queryset = TurnoTemplate.objects.all()
    serializer_class = TurnoTemplateSerializer

class TurnoTemplateDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TurnoTemplate.objects.all()
    serializer_class = TurnoTemplateSerializer




