from rest_framework import serializers
from .models import Turno, TurnosPieza

class TurnoSerializer(serializers.ModelSerializer):
    turnosPieza = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Turno
        fields = '__all__'

class TurnoAndTTCommonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Turno
        exclude = ['monto', 'observaciones']