from django.urls import path
from .views import UsuarioCreateView, UsuarioCrud, UsuarioPorRolView, UsuarioLoginView, UsuarioEditarView, UsuariosDisponiblesParaEspecialista
from .views import CodigoRecuperacionView
from .views import CodigoCambiarClave
urlpatterns = [
    path("usuarios/", UsuarioCreateView.as_view()), 
    path("crear-usuario/", UsuarioCreateView.as_view()),
    path("usuario/<int:pk>/", UsuarioCrud.as_view()),
    path("usuarios/rol/<str:rol>/", UsuarioPorRolView.as_view()),
    path('login/', UsuarioLoginView.as_view(), name='token_obtain_pair'),
    path("editar-usuario/", UsuarioEditarView.as_view()),
    path("usuarios-disponibles/", UsuariosDisponiblesParaEspecialista.as_view()),
    path("codigo-recuperacion/", CodigoRecuperacionView.as_view()),
    path("codigo-recuperacion/actualizar/", CodigoCambiarClave.as_view()),
]
