from django.urls import path
from .views import UsuarioCreateView, UsuarioCrud, UsuarioPorRolView

urlpatterns = [
    path("crear-usuario/",UsuarioCreateView.as_view()),
    path("usuario/<int:pk>/",UsuarioCrud.as_view()),
    path("usuarios/rol/<str:rol>/",UsuarioPorRolView.as_view()),
]
