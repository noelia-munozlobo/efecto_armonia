from django.urls import path
from .views import CrearEspecialista, EspecialistaListCreateView, EspecialistaDetailView, RecursoPorId, RecursoPorEscpecialidad

urlpatterns = [
    path("crear-especialista/", CrearEspecialista.as_view()),
    path("especialistas/", EspecialistaListCreateView.as_view()),
    path("especialistas/<int:id>/", EspecialistaDetailView.as_view()),
    path("especialistas/id/<int:id>/", RecursoPorId.as_view()),
    path("especialistas/especialidad/<str:especialidad>/", RecursoPorEscpecialidad.as_view()),
]

