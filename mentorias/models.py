from django.db import models
from usuarios.models import Usuario
from horarios.models import Horarios

class Mentorias(models.Model):
    ESTADO_OPCIONES = [
        ('pendiente', 'Pendiente'),
        ('aprobado', 'Aprobado'),
        ('rechazado', 'Rechazado'),
    ]

    motivo = models.CharField(max_length=200)
    estado = models.CharField(max_length=20, choices=ESTADO_OPCIONES, default='pendiente')

    # Datos del horario
    fecha = models.DateField(null=True, blank=True)
    hora_inicio = models.TimeField(null=True, blank=True)
    hora_fin = models.TimeField(null=True, blank=True)


    # Usuario que creó el horario (mentor)
    usuario_especialista = models.ForeignKey(
    Usuario,
    related_name="mentor",
    on_delete=models.CASCADE,
    null=True,
    blank=True)

    # Usuario que crea la mentoría (estudiante)
    usuario_cliente = models.ForeignKey(
    Usuario,
    related_name="solicitante",
    on_delete=models.CASCADE,
    null=True,
    blank=True)

    horario = models.ForeignKey(Horarios, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"Mentoría creada por {self.usuario_cliente.username} con {self.usuario_especialista.username}"