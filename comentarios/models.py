from django.db import models

class Comentario(models.Model):
    contenido = models.CharField(max_length=45, verbose_name="Contenido del comentario")
    fecha = models.DateField(auto_now_add=True, verbose_name="Fecha del comentario")
    usuario = models.ForeignKey("usuarios.Usuario", on_delete=models.CASCADE, related_name="comentarios")
    recursos = models.ForeignKey("recursos.Recursos", on_delete=models.CASCADE, related_name="comentarios")
   
    def __str__(self):
        return f"Comentario de {self.usuario.username} en {self.recursos.nombre_recurso} el {self.fecha}"

    class Meta:
        ordering = ['-fecha']  # Comentarios más recientes primero
        verbose_name = "Comentario"
        verbose_name_plural = "Comentarios"
