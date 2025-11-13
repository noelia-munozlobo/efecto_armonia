from django.urls import path
from .views import HorariosCreateView, HorariosPorId, HorariosCrud

urlpatterns = [
    path("crear-horarios/",HorariosCreateView.as_view()),
    path("horarios/<int:id>/",HorariosPorId.as_view()),
    path("horariosdetalle/<int:pk>/", HorariosCrud.as_view()),
]