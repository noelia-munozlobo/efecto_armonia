from django.db import models
from usuarios.models import Usuario
from django.utils import timezone

class Chat(models.Model):
    # Usuario que envía el mensaje
    remitente = models.ForeignKey(
        Usuario,
        related_name='mensajes_enviados',
        on_delete=models.CASCADE
    )

    # Usuario que recibe el mensaje
    destinatario = models.ForeignKey(
        Usuario,
        related_name='mensajes_recibidos',
        on_delete=models.CASCADE
    )

    contenido = models.TextField(verbose_name="Contenido del mensaje")
    fecha_envio = models.DateTimeField(default=timezone.now)
    leido = models.BooleanField(default=False)

    def __str__(self):
        return f"De {self.remitente.username} a {self.destinatario.username} el {self.fecha_envio.strftime('%Y-%m-%d %H:%M')}"

    class Meta:
        ordering = ['fecha_envio']  # Muestra los mensajes en orden cronológico

