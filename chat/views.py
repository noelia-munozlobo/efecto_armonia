from django.shortcuts import render
from .models import Chat
from .serializers import ChatSerializer
from rest_framework.generics import ListCreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from django.db import models

class ChatCreateView(ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


# Listar mensajes entre dos usuarios (conversación)
class ConversacionView(ListAPIView):
    serializer_class = ChatSerializer

    def get_queryset(self):
        remitente_id = self.kwargs['remitente_id']
        destinatario_id = self.kwargs['destinatario_id']
        # mensajes entre ambos (ida y vuelta)
        return Chat.objects.filter(
            models.Q(remitente_id=remitente_id, destinatario_id=destinatario_id) |
            models.Q(remitente_id=destinatario_id, destinatario_id=remitente_id)
        ).order_by('fecha_envio')


# Listar mensajes recibidos por un usuario
class MensajesRecibidosView(ListAPIView):
    serializer_class = ChatSerializer

    def get_queryset(self):
        destinatario_id = self.kwargs['destinatario_id']
        return Chat.objects.filter(destinatario_id=destinatario_id).order_by('-fecha_envio')


# Listar mensajes enviados por un usuario
class MensajesEnviadosView(ListAPIView):
    serializer_class = ChatSerializer

    def get_queryset(self):
        remitente_id = self.kwargs['remitente_id']
        return Chat.objects.filter(remitente_id=remitente_id).order_by('-fecha_envio')


# Marcar un mensaje como leído
class MarcarLeidoView(UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def patch(self, request, *args, **kwargs):
        mensaje = self.get_object()
        mensaje.leido = True
        mensaje.save()
        return Response({'status': 'mensaje marcado como leído'}, status=status.HTTP_200_OK)
