from rest_framework import serializers
from .models import Especialista
from usuarios.models import Usuario

class EspecialistaSerializer(serializers.ModelSerializer):
    correo = serializers.EmailField(source="usuario.email", read_only=True)
    telefono = serializers.CharField(source="usuario.telefono", read_only=True)
    username = serializers.CharField(source="usuario.username", read_only=True)  # ← NUEVO
    nombre_completo = serializers.SerializerMethodField()
    nombre = serializers.CharField(source="usuario.first_name", read_only=True)
    apellido = serializers.CharField(source="usuario.last_name", read_only=True)
    usuario_email = serializers.EmailField(write_only=True, required=False)

    def get_nombre_completo(self, obj):
        return f"{obj.usuario.first_name} {obj.usuario.last_name}"

    class Meta:
        model = Especialista
        fields = [
            "id",
            "usuario",
            "usuario_email",
            "username",  # ← NUEVO
            "nombre",
            "apellido",
            "correo",
            "telefono",
            "nombre_completo",    
            "especialidad",
            "descripcion",
        ]
        read_only_fields = ['usuario', 'nombre_completo', 'nombre', 'apellido', 'correo', 'telefono', 'username']