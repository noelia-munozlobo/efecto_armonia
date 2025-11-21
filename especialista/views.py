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

        # Verificar usuario
        try:
            usuario = Usuario.objects.get(email=correo)
        except Usuario.DoesNotExist:
            return Response(
                {"error": "El correo no existe como usuario."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Cambiar rol
        usuario.rol = "especialista"
        usuario.save()

        # Preparar data
        data = request.data.copy()
        data["usuario"] = usuario.id
        
        # Se elimina "correo" porque no pertenece al modelo
        data.pop("correo", None)

        serializer = EspecialistaSerializer(data=data)
        if serializer.is_valid():
            especialista = serializer.save()
            return Response(
                EspecialistaSerializer(especialista).data,
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EspecialistaListCreateView(ListCreateAPIView):
    queryset = Especialista.objects.all()
    serializer_class = EspecialistaSerializer

class EspecialistaDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Especialista.objects.all()
    serializer_class = EspecialistaSerializer

    def update(self, request, *args, **kwargs):
        especialista = self.get_object()
        usuario = especialista.usuario

        # si viene teléfono, actualízalo
        telefono_nuevo = request.data.get("telefono")
        if telefono_nuevo:
            usuario.telefono = telefono_nuevo
            usuario.save()

        return super().update(request, *args, **kwargs)


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