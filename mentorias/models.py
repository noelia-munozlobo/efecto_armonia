from django.db import models
from usuarios.models import Usuario

class Mentorias(models.Model):
    ESTADO_OPCIONES = [
        ('pendiente', 'Pendiente'),
        ('aprobado', 'Aprobado'),
        ('rechazado', 'Rechazado'),
    ]

    fecha = models.DateField(verbose_name="Fecha de la mentoría")
    motivo = models.CharField(max_length=200)
    estado = models.CharField(max_length=20, choices=ESTADO_OPCIONES, default='pendiente')

    usuario = models.ForeignKey(
        Usuario,
        related_name='mentorias',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"Mentoría de {self.usuario.username} el {self.fecha} ({self.get_estado_display()})"

