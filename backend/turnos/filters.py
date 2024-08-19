import django_filters
from .models import Turno

class TurnoFilter(django_filters.FilterSet):
    fecha_inicio = django_filters.DateFilter(field_name='fecha', lookup_expr='gte')
    fecha_fin = django_filters.DateFilter(field_name='fecha', lookup_expr='lte')
    id_odontologo = django_filters.NumberFilter(field_name='agenda__odontologo')
    id_centro = django_filters.NumberFilter(field_name='agenda__CentroOdontologico')
    id_agenda = django_filters.NumberFilter(field_name='agenda__id')
    id_administrativo = django_filters.NumberFilter(field_name='administrativo')
    id_paciente = django_filters.NumberFilter(field_name='paciente')
    estado = django_filters.MultipleChoiceFilter(choices=Turno.choices)
    sobreturno = django_filters.BooleanFilter(field_name='esSobreturno')

    class Meta:
        model = Turno
        fields = [
            'fecha_inicio', 
            'fecha_fin', 
            'id_odontologo', 
            'id_centro', 
            'id_agenda', 
            'id_administrativo', 
            'id_paciente', 
            'estado',
            'sobreturno'
        ]