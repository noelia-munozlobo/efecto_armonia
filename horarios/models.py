from django.db import models
from usuarios.models import Usuario
from django.core.exceptions import ValidationError

class Horarios(models.Model):
    fecha = models.DateField(verbose_name="Fecha del horario")
    hora_inicio = models.TimeField(verbose_name="Hora de inicio")
    hora_fin = models.TimeField(verbose_name="Hora de fin")

    usuario = models.ForeignKey(
        Usuario,
        related_name='horarios',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"Horario de {self.usuario.username} el {self.fecha} ({self.hora_inicio} - {self.hora_fin})"

    def clean(self):
        """Asegura que la hora_fin sea posterior a hora_inicio"""
        if self.hora_fin <= self.hora_inicio:
            raise ValidationError("La hora de fin debe ser posterior a la hora de inicio.")
