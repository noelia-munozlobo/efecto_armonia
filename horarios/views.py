from django.shortcuts import render
from .models import Horarios
from .serializers import HorariosSerializer
from rest_framework.generics import ListCreateAPIView

class HorariosCreateView(ListCreateAPIView):
    queryset = Horarios.objects.all()
    serializer_class = HorariosSerializer