from django.shortcuts import render
from .models import Recursos
from .serializers import RecursosSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.parsers import MultiPartParser, FormParser


class RecursosCreateView(ListCreateAPIView):
    queryset = Recursos.objects.all()
    serializer_class = RecursosSerializer
    parser_classes = (MultiPartParser, FormParser)


class RecursosCrud(RetrieveUpdateDestroyAPIView):
    queryset = Recursos.objects.all()
    serializer_class = RecursosSerializer
    parser_classes = (MultiPartParser, FormParser)


class RecursoPorId(ListCreateAPIView):
    serializer_class = RecursosSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        id = self.kwargs["id"]
        return Recursos.objects.filter(id=id)


class RecursoPorTipo(ListCreateAPIView):
    serializer_class = RecursosSerializer
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        tipo = self.kwargs["tipo"]
        return Recursos.objects.filter(tipo=tipo)
