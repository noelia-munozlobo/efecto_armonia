from rest_framework import serializers
from .models import Horarios

class HorariosSerializer(serializers.ModelSerializer):
    nombre_completo = serializers.CharField(
        source='usuario.nombre_completo',
        read_only=True
    )

    class Meta:
        model = Horarios
        fields = ['id', 'fecha', 'hora_inicio', 'hora_fin', 'usuario', 'nombre_completo']
