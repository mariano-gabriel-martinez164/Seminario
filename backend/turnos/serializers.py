from rest_framework import serializers
from .models import Turno, TurnosPieza
from basic.models import PiezaDental, Prestacion
from pacientes.models import Paciente

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = ['dni', 'nombre', 'apellido']

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
    from Agenda.serializers import AgendaSerializer
    from custom_auth.serializers import ShortAdministrativoSerializer

    turnosPieza = TurnosPiezaSerializer(many=True, read_only=True, source='turnospieza_set') # el _set es porque es un reverse relation
    paciente = PacienteSerializer(read_only=True)
    agenda = AgendaSerializer(read_only=True)
    administrativo = ShortAdministrativoSerializer(read_only=True)
    class Meta:
        model = Turno
        fields = '__all__'

class ShortTurnoSerializer(serializers.ModelSerializer):
    paciente = PacienteSerializer(read_only=True)
    dni = serializers.IntegerField(write_only=True, source='paciente__dni', required=False, allow_null=True, default=None)
    turnoTemplateId = serializers.IntegerField(read_only=True ,required=False, allow_null=True, default=None)

    def create(self, validated_data):
        if dni := validated_data.pop('paciente__dni'):
            try:
                paciente = Paciente.objects.get(dni=dni)
            except Paciente.DoesNotExist:
                raise serializers.ValidationError('El paciente no existe')
            validated_data['paciente'] = paciente
        return super().create(validated_data)
    class Meta:
        model = Turno
        exclude = ['observaciones']

class TurnosPiezaCreateSerializer(serializers.ModelSerializer):
    # permite crear multiples turnosPieza en un solo request, añadiendo un array de objetos
    # turno = serializers.PrimaryKeyRelatedField(source='turno_id', queryset=Turno.objects.all())
    class Meta:
        model = TurnosPieza
        fields = '__all__'

    def create(self, validated_data):
        # verifico que el turno exista
        print(validated_data)
        return super().create(validated_data)
