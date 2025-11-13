from rest_framework.serializers import ModelSerializer
from .models import Comentario


class ComentariosSerializer(ModelSerializer):
    class Meta:
        model = Comentario
        fields = '__all__'