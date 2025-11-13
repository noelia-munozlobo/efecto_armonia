from django.urls import path
from .views import ComentariosCreateView, ComentarioPorId, ComentarioPorRecurso

urlpatterns = [
    path('crear-comentario/', ComentariosCreateView.as_view(), name='comentarios_create'),
    path('comentario/<int:id>/', ComentarioPorId.as_view(), name='comentario_por_id'),
    path('comentarios-recurso/<int:recurso_id>/', ComentarioPorRecurso.as_view(), name='comentarios_por_recurso'),
]
