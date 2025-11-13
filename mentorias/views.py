from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from .models import Mentorias
from .serializers import MentoriasSerializer

# Listar todas las mentorías y crear nuevas
class MentoriasCreateView(ListCreateAPIView):
    queryset = Mentorias.objects.all()
    serializer_class = MentoriasSerializer


# Obtener, actualizar o eliminar una mentoría específica
class MentoriasCrud(RetrieveUpdateDestroyAPIView):
    queryset = Mentorias.objects.all()
    serializer_class = MentoriasSerializer
    lookup_field = 'id'


# Listar mentorías por usuario
class MentoriasPorUsuario(ListAPIView):
    serializer_class = MentoriasSerializer

    def get_queryset(self):
        usuario_id = self.kwargs['usuario_id']
        return Mentorias.objects.filter(usuario_id=usuario_id)
