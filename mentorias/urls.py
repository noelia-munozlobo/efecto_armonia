from django.urls import path
from .views import (
    MentoriasCreateView, 
    MentoriasCrud, 
    MentoriasPorUsuario,
    MentoriasPorEspecialista  # Importar la nueva vista
)

urlpatterns = [
    path('crear-mentorias/', MentoriasCreateView.as_view(), name='crear-mentorias'),
    path('mentorias/<int:id>/', MentoriasCrud.as_view(), name='mentoria-detalle'),
    path('usuario/<int:usuario_id>/', MentoriasPorUsuario.as_view(), name='mentorias-usuario'),
    path('especialista/<int:especialista_id>/', MentoriasPorEspecialista.as_view(), name='mentorias-especialista'),  # Nueva ruta
]