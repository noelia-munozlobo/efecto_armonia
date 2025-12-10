from rest_framework.serializers import ModelSerializer
from .models import Recursos
from rest_framework import serializers

class RecursosSerializer(ModelSerializer):
    nombre_usuario = serializers.CharField(source='usuario.username', read_only=True)
    class Meta:
        model = Recursos
        fields = [
            'id',
            'nombre_recurso',
            'descripcion',
            'usuario',
            'nombre_usuario',
            'imagen_recurso',
            'fecha',
            'tipo',
        ]
