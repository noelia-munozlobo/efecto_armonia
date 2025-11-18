from django.urls import path
from .views import CrearEspecialista, EspecialistaListCreateView, EspecialistaDetailView

urlpatterns = [
    path("crear-especialista/", CrearEspecialista.as_view()),
    path("especialistas/", EspecialistaListCreateView.as_view()),
    path("especialistas/<int:id>/", EspecialistaDetailView.as_view()),
]

