from django.db import models

# Create your models here.
class Curso(models.Model):
    HORARIOS_CHOICES = [
        ('Mañana', 'Mañana'),
        ('Tarde', 'Tarde'),
        ('Noche', 'Noche'),
    ]
    nombre_curso = models.CharField(max_length=100)
    descripcion = models.TextField()
    horario = models.CharField(max_length=50, choices=HORARIOS_CHOICES)
    foto_curso = models.TextField(null=True, blank=True)
    instructor = models.ForeignKey('usuarios.Usuario', on_delete=models.CASCADE, related_name='cursos_instructor')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    destacado = models.BooleanField(default=False)