from rest_framework import serializers
from .models import Turno, TurnosPieza

class TurnoSerializer(serializers.ModelSerializer):
    turnosPieza = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Turno
        fields = '__all__'
