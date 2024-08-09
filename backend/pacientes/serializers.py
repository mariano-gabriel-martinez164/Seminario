from rest_framework import serializers
from .models import Paciente
from turnos.serializers import TurnoSerializer

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'


class PacienteDetailSerializer(serializers.ModelSerializer):
    turnos = TurnoSerializer(many=True, read_only=True, source='turnos_paciente')
    class Meta:
        model = Paciente
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['turnos'] = sorted(representation['turnos'], key=lambda x: x['fecha'], reverse=True)
        return representation
    