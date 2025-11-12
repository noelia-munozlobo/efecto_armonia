from django.shortcuts import render
from .models import Mentorias
from .serializers import MentoriasSerializer
from rest_framework.generics import ListCreateAPIView

class MentoriasCreateView(ListCreateAPIView):
    queryset = Mentorias.objects.all()
    serializer_class = MentoriasSerializer