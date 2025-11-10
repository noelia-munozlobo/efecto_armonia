from django.urls import path
from .views import RecursosCreateView

urlpatterns = [
    path("crear-recursos/",RecursosCreateView.as_view())
]