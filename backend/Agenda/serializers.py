from rest_framework import serializers
from .models import Agenda, TurnoTemplate
from basic.serializers import OdontologoSerializer, CentroOdontologicoSerializer

class TurnoTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TurnoTemplate
        fields = '__all__'

class FullAgendaSerializer(serializers.ModelSerializer):

    turnos = TurnoTemplateSerializer(many=True, read_only=True)
    odontologo = OdontologoSerializer(read_only=True)
    CentroOdontologico = CentroOdontologicoSerializer(read_only=True)

    class Meta:
        model = Agenda
        fields = '__all__'

class AgendaSerializer(serializers.ModelSerializer):
    odontologo = OdontologoSerializer(read_only=True)
    CentroOdontologico = CentroOdontologicoSerializer(read_only=True)
    class Meta:
        model = Agenda
        fields = '__all__'
