from django.shortcuts import render
from .serializers import AdministrativoSerializer
from .models import Administrativo
# Create your views here.
from rest_framework import generics

class AdministrativoList(generics.ListCreateAPIView):
    queryset = Administrativo.objects.all()
    serializer_class = AdministrativoSerializer

class AdministrativoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Administrativo.objects.all()
    serializer_class = AdministrativoSerializer