from django.shortcuts import render
from .models import Comentario
from .serializers import ComentariosSerializer
from rest_framework.generics import ListCreateAPIView

class ComentariosCreateView(ListCreateAPIView):
    queryset = Comentario.objects.all()
    serializer_class = ComentariosSerializer

class ComentarioPorId(ListCreateAPIView):
    serializer_class = ComentariosSerializer

    def get_queryset(self):
        id = self.kwargs['id']  
        return Comentario.objects.filter(id=id)

class ComentarioPorRecurso(ListCreateAPIView):
    serializer_class = ComentariosSerializer

    def get_queryset(self):
        recurso_id = self.kwargs['recurso_id']  
        return Comentario.objects.filter(recursos_id=recurso_id)
