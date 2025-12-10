from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from usuarios.models import Usuario
from .models import Especialista


class EspecialistaDeleteTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        # Crear usuario requerido por el especialista
        self.usuario = Usuario.objects.create(
            username="carlos123",
            first_name="Carlos",
            last_name="Pérez",
            email="carlos@example.com",
            telefono="1111-2222",
        )
        self.usuario.set_password("123456")
        self.usuario.save()

        # Crear el especialista
        self.especialista = Especialista.objects.create(
            usuario=self.usuario,
            especialidad="Psicología Clínica",
            descripcion="Especialista de pruebas"
        )

        # URL correcta (según tus rutas reales)
        self.url = f"/especialistas/especialistas/{self.especialista.id}/"

    def test_eliminar_especialista(self):
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.assertFalse(
            Especialista.objects.filter(id=self.especialista.id).exists()
        )
