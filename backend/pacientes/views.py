#from django.shortcuts import render
#from django.views.decorators.csrf import csrf_exempt
from .models import Paciente
from .serializers import PacienteSerializer
#from django.http.response import JsonResponse
#from rest_framework.parsers import JSONParser

#from rest_framework.decorators import api_view
#from rest_framework.response import Response
#from rest_framework import status
#from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters
# Create your views here.
'''class PacientesList(APIView):
    def get(self, request):
        pacientes = Paciente.objects.all()
        serializer = PacienteSerializer(pacientes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = PacienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
'''    
'''class PacienteDetail(APIView):
    def get_object(self, pk):
        try:
            return Paciente.objects.get(pk=pk)
        except Paciente.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def get(self, request, pk):
        paciente = self.get_object(pk)
        serializer = PacienteSerializer(paciente)
        return Response(serializer.data)
    
    def put(self, request, pk):
        paciente = self.get_object(pk)
        serializer = PacienteSerializer(paciente, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        paciente = self.get_object(pk)
        paciente.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)'''

class PacientesPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100


class PacientesList(generics.ListCreateAPIView):
    queryset = Paciente.objects.all().order_by('apellido')
    serializer_class = PacienteSerializer
    pagination_class = PacientesPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre', 'apellido', 'dni']

class PacienteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer