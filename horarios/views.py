from django.shortcuts import render
from .models import Horarios
from .serializers import HorariosSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

class HorariosCreateView(ListCreateAPIView):
    queryset = Horarios.objects.all()
    serializer_class = HorariosSerializer

class HorariosCrud(RetrieveUpdateDestroyAPIView):
    queryset = Horarios.objects.all()
    serializer_class = HorariosSerializer
    

class HorariosPorId(ListCreateAPIView):
    serializer_class = HorariosSerializer

    def get_queryset(self):
        id = self.kwargs['id']  
        return Horarios.objects.filter(id=id)