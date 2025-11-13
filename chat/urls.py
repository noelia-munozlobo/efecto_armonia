from django.urls import path
from .views import ( ChatCreateView, ConversacionView, MensajesRecibidosView, MensajesEnviadosView, MarcarLeidoView)

urlpatterns = [
    path('chat/', ChatCreateView.as_view(), name='chat-list-create'),
    path('chat/conversacion/<int:remitente_id>/<int:destinatario_id>/', ConversacionView.as_view(), name='conversacion'),
    path('chat/recibidos/<int:destinatario_id>/', MensajesRecibidosView.as_view(), name='mensajes-recibidos'),
    path('chat/enviados/<int:remitente_id>/', MensajesEnviadosView.as_view(), name='mensajes-enviados'),
    path('chat/marcar-leido/<int:pk>/', MarcarLeidoView.as_view(), name='marcar-leido'),
]
