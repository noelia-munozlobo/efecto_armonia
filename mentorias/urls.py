from django.urls import path
from .views import MentoriasCreateView, MentoriasCrud, MentoriasPorUsuario

urlpatterns = [
    path("crear-mentorias/",MentoriasCreateView.as_view()),
    path("mentorias/<int:id>/",MentoriasCrud.as_view()),
    path("mentorias/usuario/<int:usuario_id>/",MentoriasPorUsuario.as_view()),
]