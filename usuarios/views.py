from django.shortcuts import render
from .models import Usuario
from .serializers import UsuarioSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView

# Crear y listar todos los usuarios
class UsuarioCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


# Obtener, actualizar o eliminar un usuario específico por su ID
class UsuarioCrud(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


# Filtrar usuarios por rol (por ejemplo: admin, cliente o especialista)
class UsuarioPorRolView(ListAPIView):
    serializer_class = UsuarioSerializer

    def get_queryset(self):
        rol = self.kwargs['rol']  # toma el rol desde la URL
        return Usuario.objects.filter(rol=rol)
