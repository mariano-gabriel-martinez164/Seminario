from rest_framework import serializers
from .models import Odontologo, CentroOdontologico, PiezaDental, Prestacion

class OdontologoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Odontologo
        fields = '__all__'

class CentroOdontologicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CentroOdontologico
        fields = '__all__'

class PiezaDentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PiezaDental
        fields = '__all__'

class PrestacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestacion
        fields = '__all__'