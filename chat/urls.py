from django.urls import path
from .views import ChatCreateView

urlpatterns = [
    path("crear-chat/",ChatCreateView.as_view())
]