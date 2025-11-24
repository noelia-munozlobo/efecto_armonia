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
        usuario_actual = especialista.usuario

        # Verificar si se quiere cambiar el usuario
        nuevo_usuario_email = request.data.get("usuario_email")
        if nuevo_usuario_email and nuevo_usuario_email != usuario_actual.email:
            try:
                nuevo_usuario = Usuario.objects.get(email=nuevo_usuario_email)
                
                # Verificar que el nuevo usuario no sea ya un especialista
                if Especialista.objects.filter(usuario=nuevo_usuario).exclude(id=especialista.id).exists():
                    return Response(
                        {"error": "Este usuario ya está asignado a otro especialista."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                
                # Cambiar rol del usuario anterior a usuario normal
                usuario_actual.rol = "usuario"
                usuario_actual.save()
                
                # Asignar nuevo usuario y cambiar su rol
                nuevo_usuario.rol = "especialista"
                nuevo_usuario.save()
                
                especialista.usuario = nuevo_usuario
                especialista.save()
                
                usuario_actual = nuevo_usuario
                
            except Usuario.DoesNotExist:
                return Response(
                    {"error": "El correo del nuevo usuario no existe."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Si no se cambió el usuario, actualizar datos del usuario actual
        else:
            # Actualizar username
            username_nuevo = request.data.get("username")
            if username_nuevo:
                # Verificar que el username no esté en uso por otro usuario
                if Usuario.objects.filter(username=username_nuevo).exclude(id=usuario_actual.id).exists():
                    return Response(
                        {"error": "Este nombre de usuario ya está en uso."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                usuario_actual.username = username_nuevo

            # Actualizar nombre
            nombre_nuevo = request.data.get("nombre")
            if nombre_nuevo:
                usuario_actual.first_name = nombre_nuevo

            # Actualizar apellido
            apellido_nuevo = request.data.get("apellido")
            if apellido_nuevo:
                usuario_actual.last_name = apellido_nuevo

            # Actualizar teléfono
            telefono_nuevo = request.data.get("telefono")
            if telefono_nuevo:
                usuario_actual.telefono = telefono_nuevo

            # Actualizar correo
            correo_nuevo = request.data.get("correo")
            if correo_nuevo:
                # Verificar que el correo no esté en uso por otro usuario
                if Usuario.objects.filter(email=correo_nuevo).exclude(id=usuario_actual.id).exists():
                    return Response(
                        {"error": "Este correo ya está en uso."},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                usuario_actual.email = correo_nuevo
            
            usuario_actual.save()

        # Actualizar especialidad y descripción
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