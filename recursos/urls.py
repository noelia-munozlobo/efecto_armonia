from django.urls import path
from .views import RecursosCreateView, RecursoPorId, RecursoPorTipo, RecursosCrud, VerRecursosDestacados
from .views import DestacarRecurso

urlpatterns = [
    path("crear-recurso/",RecursosCreateView.as_view()),
    path("recurso/<int:id>/",RecursoPorId.as_view()),
    path("recurso-tipo/<str:tipo>/",RecursoPorTipo.as_view()),
    path("recurso-crud/<int:pk>/", RecursosCrud.as_view()),
    path("destacar-recurso/", DestacarRecurso.as_view()),
    path("recursos-destacados/", VerRecursosDestacados.as_view()),
]