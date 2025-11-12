from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('usuarios/', include('usuarios.urls')),
    path('recursos/', include('recursos.urls')),
    path('mentorias/', include('mentorias.urls')),
    path('horarios/', include('horarios.urls')),
    path('chat/', include('chat.urls')),
]
