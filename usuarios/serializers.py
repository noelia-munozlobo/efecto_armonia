from rest_framework.serializers import ModelSerializer
from .models import Usuario, RecuperacionCodigo

class UsuarioSerializer(ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'telefono', 'rol', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}
        }

    def create(self, validated_data):
        clave = validated_data.pop('password', None)
        usuario = Usuario(**validated_data)

        if clave:
            usuario.set_password(clave)
        else:
            usuario.set_password(usuario.password)

        usuario.save()
        return usuario

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance

class RecuperacionCodigoSerializer(ModelSerializer):
    class Meta:
        model = RecuperacionCodigo
        fields = "__all__"
