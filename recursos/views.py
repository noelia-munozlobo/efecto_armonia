from django.shortcuts import render
from .models import Recursos
from .serializers import RecursosSerializer
from rest_framework.generics import ListCreateAPIView

class RecursosCreateView(ListCreateAPIView):
    queryset = Recursos.objects.all()
    serializer_class = RecursosSerializer