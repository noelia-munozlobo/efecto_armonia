from rest_framework.serializers import ModelSerializer
from .models import Mentorias


class MentoriasSerializer(ModelSerializer):
    class Meta:
        model = Mentorias
        fields = '__all__'