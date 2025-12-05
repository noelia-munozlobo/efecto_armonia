from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Comentario

class ComentariosSerializer(ModelSerializer):
    usuario_nombre = SerializerMethodField()
    recurso_nombre = SerializerMethodField()

    class Meta:
        model = Comentario
        fields = [
            'id',
            'contenido',
            'fecha',
            'usuario',
            'usuario_nombre',
            'recursos',
            'recurso_nombre',
        ]

    def get_usuario_nombre(self, obj):
        return obj.usuario.username

    def get_recurso_nombre(self, obj):
        return obj.recursos.nombre_recurso
