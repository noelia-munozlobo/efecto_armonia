from rest_framework.serializers import ModelSerializer, ValidationError
from .models import Mentorias
from horarios.models import Horarios

class MentoriasSerializer(ModelSerializer):
    class Meta:
        model = Mentorias
        fields = '__all__'
        read_only_fields = ['fecha', 'hora_inicio', 'hora_fin', 'usuario_horario']

    def create(self, validated_data):
        request = self.context.get("request")  # para obtener el usuario autenticado

        horario = validated_data.get('horario')

        if not horario:
            raise ValidationError({"horario": "Debe enviar el horario para crear la mentoría."})

        # Heredar fecha y horas del horario
        validated_data['fecha'] = horario.fecha
        validated_data['hora_inicio'] = horario.hora_inicio
        validated_data['hora_fin'] = horario.hora_fin

        # Usuario dueño del horario
        validated_data['usuario_horario'] = horario.usuario  

        # Usuario que crea la mentoría
        validated_data['usuario_crea'] = request.user  

        mentoría = Mentorias.objects.create(**validated_data)
        return mentoría
