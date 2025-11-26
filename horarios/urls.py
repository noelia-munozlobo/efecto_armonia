from django.urls import path
from .views import HorariosCreateView, HorariosPorId, HorariosCrud, HorariosView, HorariosPorUsuario

urlpatterns = [
    path("crear-horarios/",HorariosCreateView.as_view()),
    path("horarios/<int:id>/",HorariosPorId.as_view()),
    path("horariosdetalle/<int:pk>/", HorariosCrud.as_view()),
    path("horarios/", HorariosView.as_view()),
    path("horarios/usuario/<int:usuario_id>/", HorariosPorUsuario.as_view()),
]