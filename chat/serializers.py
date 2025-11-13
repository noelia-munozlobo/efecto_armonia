from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Chat

class ChatSerializer(ModelSerializer):
    remitente_username = SerializerMethodField()
    destinatario_username = SerializerMethodField()

    class Meta:
        model = Chat
        fields = '__all__' 
        
    def get_remitente_username(self, obj):
        return obj.remitente.username

    def get_destinatario_username(self, obj):
        return obj.destinatario.username
