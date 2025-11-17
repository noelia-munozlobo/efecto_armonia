from django.urls import path
from .views import CrearEspecialista

urlpatterns = [
    path("crear-especialista/", CrearEspecialista.as_view()),
]

