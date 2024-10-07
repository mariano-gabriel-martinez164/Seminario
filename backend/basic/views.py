from .models import *
from .serializers import *
from rest_framework import generics, filters, status
from rest_framework.response import Response


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
    queryset = Prestacion.objects.filter(is_active=True)
    serializer_class = PrestacionSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['codigo', 'nombre']

class PrestacionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Prestacion.objects.all()
    serializer_class = PrestacionSerializer

    def delete(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.is_active = False 
        obj.save()
        return Response(status=status.HTTP_204_NO_CONTENT)




