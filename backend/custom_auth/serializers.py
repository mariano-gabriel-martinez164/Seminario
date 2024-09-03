from rest_framework import serializers
from .models import Administrativo

class AdministrativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrativo
        fields = ['id', 'email', 'first_name', 'last_name', 'centro','cuil','password','is_staff']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        # fields = '__all__'

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

class ShortAdministrativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administrativo
        fields = ['id', 'email', 'first_name', 'last_name']