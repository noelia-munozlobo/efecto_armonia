from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from usuarios.models import Usuario
from .models import Especialista
from .serializers import EspecialistaSerializer
from rest_framework.parsers import MultiPartParser, FormParser

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

        # 3. Preparar data para crear especialista
        data = request.data.copy()
        data["usuario"] = usuario.id

        # Quitar el "correo" porque no es un campo del modelo
        if "correo" in data:
            del data["correo"]

        serializer = EspecialistaSerializer(data=data)
        if serializer.is_valid():
            especialista = serializer.save()
            return Response(EspecialistaSerializer(especialista).data, 
                            status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EspecialistaListCreateView(ListCreateAPIView):
    queryset = Especialista.objects.all()
    serializer_class = EspecialistaSerializer

class EspecialistaDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Especialista.objects.all()
    serializer_class = EspecialistaSerializer
    lookup_field = 'id'

class RecursoPorId(ListCreateAPIView):
    serializer_class = EspecialistaSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        id = self.kwargs["id"]
        return Especialista.objects.filter(id=id)
    
class RecursoPorEscpecialidad(ListCreateAPIView):
    serializer_class = EspecialistaSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        especialidad = self.kwargs["especialidad"]
        return Especialista.objects.filter(especialidad=especialidad)