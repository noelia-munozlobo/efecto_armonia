from django.shortcuts import render
from .models import Usuario
from .serializers import UsuarioSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate

class UsuarioCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioLoginView(APIView):
    def post(self,request):
        nombre_usuario = request.data.get("username")
        password = request.data.get("password")


        usuario = authenticate(username=nombre_usuario,password=password)

        if usuario is not None:
            token = RefreshToken.for_user(usuario)
            return Response({
                "token": str(token.access_token),
                "mensaje": "Inicio de sesión exitoso"
            })
        else:
            return Response({
                "error": "Credenciales inválidas"
            },status=401)



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
