#from django.shortcuts import render
#from django.views.decorators.csrf import csrf_exempt
from .models import Paciente
from .serializers import PacienteSerializer, PacienteDetailSerializer
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
    serializer_class = PacienteDetailSerializer