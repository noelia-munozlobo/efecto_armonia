from rest_framework.serializers import ModelSerializer
from .models import Recursos


class RecursosSerializer(ModelSerializer):
    class Meta:
        model = Recursos
        fields = '__all__'
