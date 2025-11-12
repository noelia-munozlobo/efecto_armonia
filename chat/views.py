from django.shortcuts import render
from .models import Chat
from .serializers import ChatSerializer
from rest_framework.generics import ListCreateAPIView

class ChatCreateView(ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    