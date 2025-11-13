from django.db import models
from usuarios.models import Usuario
from django.core.exceptions import ValidationError

class Horarios(models.Model):
    BLOQUES_HORARIOS = [
        ('09:00-10:00', '09:00 AM - 10:00 AM'),
        ('10:00-11:00', '10:00 AM - 11:00 AM'),
        ('14:00-15:00', '02:00 PM - 03:00 PM'),
        ('15:00-16:00', '03:00 PM - 04:00 PM'),
    ]

    fecha = models.DateField(verbose_name="Fecha del horario")

    # En lugar de tener dos campos de hora separados, usamos un bloque predefinido
    bloque = models.CharField(
        max_length=20,
        choices=BLOQUES_HORARIOS,
        verbose_name="Bloque horario",
    )

    usuario = models.ForeignKey(
        Usuario,
        related_name='horarios',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"Horario de {self.usuario.username} el {self.fecha} ({self.get_bloque_display()})"
