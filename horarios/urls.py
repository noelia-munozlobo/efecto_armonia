from django.urls import path
from .views import HorariosCreateView

urlpatterns = [
    path("crear-horarios/",HorariosCreateView.as_view())
]