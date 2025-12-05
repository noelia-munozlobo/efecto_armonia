from django.shortcuts import render
from .models import Comentario
from .serializers import ComentariosSerializer
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

class ComentariosListView(APIView):

    def get(self, request):
        recurso = request.GET.get("recurso")  # ?recurso=12
        queryset = Comentario.objects.all()

        if recurso:
            queryset = queryset.filter(recursos_id=recurso)

        serializer = ComentariosSerializer(queryset, many=True)
        return Response(serializer.data)

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
