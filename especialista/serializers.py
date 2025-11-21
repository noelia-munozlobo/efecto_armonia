from rest_framework import serializers
from .models import Especialista

class EspecialistaSerializer(serializers.ModelSerializer):
    correo = serializers.EmailField(source="usuario.email", read_only=True)
    telefono = serializers.CharField(source="usuario.telefono", read_only=True)
    nombre_completo = serializers.SerializerMethodField()

    def get_nombre_completo(self, obj):
        return f"{obj.usuario.first_name} {obj.usuario.last_name}"

    class Meta:
        model = Especialista
        fields = [
            "id",
            "usuario",
            "correo",
            "telefono",
            "nombre_completo",    
            "especialidad",
            "descripcion",
        ]





        


