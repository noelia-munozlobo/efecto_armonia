from django.shortcuts import render
from .models import Usuario
from .serializers import UsuarioSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from especialista.models import Especialista

class UsuarioCreateView(ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioLoginView(APIView):
    def post(self, request):
        nombre_usuario = request.data.get("username")
        password = request.data.get("password")

        usuario = authenticate(username=nombre_usuario, password=password)

        if usuario is not None:
            token = RefreshToken.for_user(usuario)
            return Response({
                "token": str(token.access_token),
                "mensaje": "Inicio de sesión exitoso",
                "rol": usuario.rol,
                "id": usuario.id,
                "usuario": UsuarioSerializer(usuario).data
            })
        else:
            return Response({
                "error": "Credenciales inválidas"
            }, status=401)

class UsuarioCrud(RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    def update(self, request, *args, **kwargs):
        # 1. Obtener el usuario
        usuario = self.get_object()
        rol_anterior = usuario.rol

        # 2. Ejecutar la actualización normal
        response = super().update(request, *args, **kwargs)

        # 3. Ver si el rol cambió
        nuevo_rol = request.data.get("rol", usuario.rol)

        # 4. Si dejó de ser especialista, eliminarlo de especialistas
        if rol_anterior == "especialista" and nuevo_rol != "especialista":
            try:
                especialista = Especialista.objects.get(usuario=usuario)
                especialista.delete()
                print("✔ Especialista eliminado automáticamente")
            except Especialista.DoesNotExist:
                pass  # No había registro, no pasa nada

        return response



# Filtrar usuarios por rol (por ejemplo: admin, cliente o especialista)
class UsuarioPorRolView(ListAPIView):
    serializer_class = UsuarioSerializer

    def get_queryset(self):
        rol = self.kwargs['rol']  # toma el rol desde la URL
        return Usuario.objects.filter(rol=rol)

class UsuarioEditarView(APIView):
    def patch(self,request):
        id_usuario = request.data.get("id")
        nombre_usuario = request.data.get("username")
        email = request.data.get("email")
        rol = request.data.get("rol")
        
        usuario = Usuario.objects.get(id=id_usuario)
        usuario.username = nombre_usuario
        usuario.email = email
        usuario.rol = rol
        usuario.save()
        return Response({
            "mensaje": "Usuario actualizado exitosamente",
            "usuario": UsuarioSerializer(usuario).data
        })
    
