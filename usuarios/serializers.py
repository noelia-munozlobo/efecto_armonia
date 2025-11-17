from rest_framework.serializers import ModelSerializer
from .models import Usuario


class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'telefono', 'rol', 'password']

    def create(self, validated_data):
        clave = validated_data.pop('password', None)
        usuario = Usuario(**validated_data)
        usuario.set_password(clave)
        usuario.save()
        return usuario
