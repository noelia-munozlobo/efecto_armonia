from rest_framework.serializers import ModelSerializer
from .models import Horarios


class HorariosSerializer(ModelSerializer):
    class Meta:
        model = Horarios
        fields = '__all__'