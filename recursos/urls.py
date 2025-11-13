from django.urls import path
from .views import RecursosCreateView, RecursoPorId, RecursoPorTipo

urlpatterns = [
    path("crear-recurso/",RecursosCreateView.as_view()),
    path("recurso/<int:id>/",RecursoPorId.as_view()),
    path("recurso-tipo/<str:tipo>/",RecursoPorTipo.as_view()),
]