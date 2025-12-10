from rest_framework import serializers
from .models import Especialista
from usuarios.models import Usuario

# Serializer para CREAR especialistas (solo campos necesarios)
class EspecialistaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialista
        fields = ['usuario', 'especialidad', 'descripcion']

# Serializer para LISTAR/LEER especialistas (con todos los campos)
class EspecialistaSerializer(serializers.ModelSerializer):
    correo = serializers.EmailField(source="usuario.email", read_only=True)
    telefono = serializers.CharField(source="usuario.telefono", read_only=True)
    username = serializers.CharField(source="usuario.username", read_only=True)
    nombre_completo = serializers.SerializerMethodField()
    nombre = serializers.CharField(source="usuario.first_name", read_only=True)
    apellidos = serializers.CharField(source="usuario.last_name", read_only=True)
    usuario_email = serializers.EmailField(write_only=True, required=False)

    def get_nombre_completo(self, obj):
        return f"{obj.usuario.first_name} {obj.usuario.last_name}"
    class Meta:
        model = Especialista
        fields = [
            "id",
            "usuario",
            "usuario_email",
            "username",
            "nombre",
            "apellidos",
            "correo",
            "telefono",
            "nombre_completo",    
            "especialidad",
            "descripcion",
        ]
        read_only_fields = ['usuario', 'nombre_completo', 'nombre', 'apellidos', 'correo', 'telefono', 'username']