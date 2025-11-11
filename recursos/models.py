from django.db import models

class Recursos(models.Model):

    fecha = models.DateField(auto_now_add=True)
    tipo = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=200, blank=True, null=False)
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre
