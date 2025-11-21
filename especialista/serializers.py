from rest_framework import serializers
from .models import Especialista

class EspecialistaSerializer(serializers.ModelSerializer):
    correo = serializers.EmailField(source="usuario.email", read_only=True)

    class Meta:
        model = Especialista
        fields = [
            "id",
            "usuario",
            "correo",            
            "nombre_completo",
            "telefono",
            "especialidad",
            "descripcion",
        ]


        


