from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    ROL_OPCIONES = (
        ('admin', 'Administrador'),
        ('cliente', 'Cliente'),
        ('especialista', 'Especialista'),
    )
    telefono = models.CharField(max_length=20,null=False)
    rol = models.CharField(max_length=20, choices=ROL_OPCIONES, default='cliente')

    @property
    def nombre_completo(self):
        return f"{self.first_name} {self.last_name}".strip()