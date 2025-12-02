from django.db import models
from usuarios.models import Usuario
from django.core.exceptions import ValidationError

class Horarios(models.Model):
    fecha = models.DateField(verbose_name="Fecha del horario")
    hora_inicio = models.TimeField(verbose_name="Hora de inicio", null=True, blank=True)
    hora_fin = models.TimeField( verbose_name="Hora de fin", null=True, blank=True)
    usuario = models.ForeignKey( Usuario, related_name='horarios', on_delete=models.CASCADE)

    def __str__(self):
        return f"Horario de {self.usuario.username} el {self.fecha}"

