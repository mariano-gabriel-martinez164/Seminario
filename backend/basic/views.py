from .models import *
from .serializers import *
from rest_framework import generics, filters

# Create your views here.
class OdontologosList(generics.ListCreateAPIView):
    queryset = Odontologo.objects.all()
    serializer_class = OdontologoSerializer

class OdontologoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Odontologo.objects.all()
    serializer_class = OdontologoSerializer
    
class CentrosOdontologicosList(generics.ListCreateAPIView):
    queryset = CentroOdontologico.objects.all()
    serializer_class = CentroOdontologicoSerializer

class CentroOdontologicoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CentroOdontologico.objects.all()
    serializer_class = CentroOdontologicoSerializer

class PiezasDentalesList(generics.ListCreateAPIView):
    queryset = PiezaDental.objects.all()
    serializer_class = PiezaDentalSerializer

class PiezaDentalDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = PiezaDental.objects.all()
    serializer_class = PiezaDentalSerializer

class PrestacionesList(generics.ListCreateAPIView):
    queryset = Prestacion.objects.all()
    serializer_class = PrestacionSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['codigo', 'nombre']

class PrestacionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Prestacion.objects.all()
    serializer_class = PrestacionSerializer



