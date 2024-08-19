from rest_framework import serializers
from .models import Turno, TurnosPieza
from basic.models import PiezaDental, Prestacion
from pacientes.models import Paciente

class TurnosPiezaSerializer(serializers.ModelSerializer):
    class PiezaDentalSerializer(serializers.ModelSerializer):
        class Meta:
            model = PiezaDental
            fields = ['codigo', 'nombre']
    class PrestacionSerializer(serializers.ModelSerializer):
        class Meta:
            model = Prestacion
            fields = ['codigo', 'nombre']

    
    pieza = PiezaDentalSerializer()
    prestacion = PrestacionSerializer()
    class Meta:
        model = TurnosPieza
        fields = ['id', 'pieza', 'prestacion']

class TurnoSerializer(serializers.ModelSerializer): 
    turnosPieza = TurnosPiezaSerializer(many=True, read_only=True, source='turnospieza_set') # el _set es porque es un reverse relation
    class Meta:
        model = Turno
        fields = '__all__'

class ShortTurnoSerializer(serializers.ModelSerializer):
    class PacienteSerializer(serializers.ModelSerializer):
        class Meta:
            model = Paciente
            fields = ['dni', 'nombre', 'apellido']
    paciente = PacienteSerializer()
    class Meta:
        model = Turno
        exclude = ['observaciones']