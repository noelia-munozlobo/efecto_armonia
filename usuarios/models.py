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
    
class RecuperacionCodigo(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=6)
    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Código de recuperación para {self.usuario.username}"