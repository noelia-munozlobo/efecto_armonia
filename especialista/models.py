from django.db import models
from usuarios.models import Usuario

class Especialista(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name="especialista")
    nombre_completo = models.CharField(max_length=150)
    telefono = models.CharField(max_length=20)

    ESPECIALIDADES = (
        ("Psicología Clínica", "Psicología Clínica"),
        ("Psicología Organizacional", "Psicología Organizacional"),
        ("Neuropsicología", "Neuropsicología"),
        ("Psicopedagogía", "Psicopedagogía"),
    )
    especialidad = models.CharField(max_length=50, choices=ESPECIALIDADES)
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre_completo
