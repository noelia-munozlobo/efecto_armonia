from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from usuarios.models import Usuario
from .models import Especialista
from .serializers import EspecialistaSerializer

class CrearEspecialista(APIView):
    def post(self, request):
        correo = request.data.get("correo")

        # 1. Buscar usuario existente
        try:
            usuario = Usuario.objects.get(email=correo)
        except Usuario.DoesNotExist:
            return Response({"error": "El correo no existe como usuario."},
                            status=status.HTTP_400_BAD_REQUEST)

        # 2. Cambiar rol del usuario
        usuario.rol = "especialista"
        usuario.save()

        # 3. Crear el especialista
        data = request.data.copy()
        data["usuario"] = usuario.id

        serializer = EspecialistaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


