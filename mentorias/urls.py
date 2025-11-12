from django.urls import path
from .views import MentoriasCreateView

urlpatterns = [
    path("crear-mentorias/",MentoriasCreateView.as_view())
]