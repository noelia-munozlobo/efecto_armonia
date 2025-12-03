from rest_framework.serializers import ModelSerializer, ValidationError, SerializerMethodField
from .models import Mentorias
from horarios.models import Horarios

class MentoriasSerializer(ModelSerializer):
    nombre_cliente = SerializerMethodField()
    
    class Meta:
        model = Mentorias
        fields = '__all__'
        read_only_fields = ['fecha', 'hora_inicio', 'hora_fin', 'usuario_especialista']

    def get_nombre_cliente(self, obj):
        if obj.usuario_cliente:
            return f"{obj.usuario_cliente.first_name} {obj.usuario_cliente.last_name}"
        return "Sin nombre"

    def create(self, validated_data):
        horario = validated_data.get('horario')

        if not horario:
            raise ValidationError({"horario": "Debe enviar el horario para crear la mentoría."})

        # Heredar fecha y horas del horario
        validated_data['fecha'] = horario.fecha
        validated_data['hora_inicio'] = horario.hora_inicio
        validated_data['hora_fin'] = horario.hora_fin

        # Usuario dueño del horario (el especialista/mentor)
        validated_data['usuario_especialista'] = horario.usuario

        mentoria = Mentorias.objects.create(**validated_data)
        return mentoria