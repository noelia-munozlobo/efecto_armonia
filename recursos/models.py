from django.db import models

class Recursos(models.Model):
    TIPOS_DEFINIDOS = (
        ("charla", "Charla"),
        ("taller", "Taller"),
        ("articulo", "Artículo")
    )
    fecha = models.DateField(auto_now_add=True)
    tipo = models.CharField(max_length=50,choices=TIPOS_DEFINIDOS)
    descripcion = models.CharField(max_length=200, blank=True, null=False)
    nombre_recurso = models.CharField(max_length=100)
    usuario = models.ForeignKey("usuarios.Usuario", on_delete=models.CASCADE, related_name="recursos")
    imagen_recurso = models.ImageField(upload_to='recursos/', blank=True, null=True)
    def __str__(self):
        return self.nombre_recurso
