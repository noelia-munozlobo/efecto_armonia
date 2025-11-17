from django.urls import path
from .views import UsuarioCreateView, UsuarioCrud, UsuarioPorRolView, UsuarioLoginView
urlpatterns = [
    path("usuarios/", UsuarioCreateView.as_view()),  # ✔ GET lista / POST crea
    path("crear-usuario/", UsuarioCreateView.as_view()),
    path("usuario/<int:pk>/", UsuarioCrud.as_view()),
    path("usuarios/rol/<str:rol>/", UsuarioPorRolView.as_view()),
    path('login/', UsuarioLoginView.as_view(), name='token_obtain_pair'),
]
