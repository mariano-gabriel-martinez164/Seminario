from rest_framework import serializers
from .models import Agenda, turnoTemplate

class TurnoTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = turnoTemplate
        fields = '__all__'

class AgendaSerializer(serializers.ModelSerializer):
    turnos = TurnoTemplateSerializer(many=True, read_only=True)

    class Meta:
        model = Agenda
        fields = '__all__'
