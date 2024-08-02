from rest_framework import serializers
from .models import Administrativo

class AdministrativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrativo
        fields = ['id', 'email', 'first_name', 'last_name', 'centro','cuil','password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        # fields = '__all__'

