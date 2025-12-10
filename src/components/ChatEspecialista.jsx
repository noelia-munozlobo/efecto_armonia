import React, { useState, useEffect, useRef } from "react";
import { getData, postData } from "../services/fetch";
import "../styles/ChatEspecialista.css";

function ChatEspecialista() {
  // Obtener datos del usuario desde localStorage
  const usuarioData = JSON.parse(localStorage.getItem("usuario"));
  const especialistaId = usuarioData?.id;

  const [conversaciones, setConversaciones] = useState([]);
  const [conversacionSeleccionada, setConversacionSeleccionada] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensajesNoLeidos, setMensajesNoLeidos] = useState({});
  const mensajesEndRef = useRef(null);

  useEffect(() => {
    console.log("Especialista logueado:", usuarioData);
    console.log("ID del especialista:", especialistaId);
  }, [especialistaId, usuarioData]);

  // Función para obtener información del paciente
  const obtenerInfoPaciente = async (pacienteId) => {
    try {
      const paciente = await getData(`usuarios/usuario/${pacienteId}`);
      return {
        id: pacienteId,
        nombre: `${paciente.first_name} ${paciente.last_name}`,
        username: paciente.username
      };
    } catch (error) {
      console.error(`Error obteniendo info del paciente ${pacienteId}:`, error);
      return {
        id: pacienteId,
        nombre: `Paciente ${pacienteId}`,
        username: `user_${pacienteId}`
      };
    }
  };

  // Cargar conversaciones activas (pacientes que han enviado mensajes)
  useEffect(() => {
    if (!especialistaId) return;

    const cargarConversaciones = async () => {
      try {
        setError(null);
        const url = `chat/chat/recibidos/${especialistaId}`;
        console.log("Cargando mensajes recibidos desde:", url);
        
        const mensajesRecibidos = await getData(url);
        console.log("Mensajes recibidos:", mensajesRecibidos);

        // Agrupar mensajes por remitente
        const conversacionesMap = new Map();
        const noLeidosMap = {};

        mensajesRecibidos.forEach(msg => {
          const remitenteId = msg.remitente;
          
          if (!conversacionesMap.has(remitenteId)) {
            conversacionesMap.set(remitenteId, {
              pacienteId: remitenteId,
              ultimoMensaje: msg.contenido,
              fechaUltimoMensaje: msg.fecha_envio,
              pacienteNombre: null, // Se cargará después
            });
            noLeidosMap[remitenteId] = 0;
          }

          // Actualizar si este mensaje es más reciente
          if (new Date(msg.fecha_envio) > new Date(conversacionesMap.get(remitenteId).fechaUltimoMensaje)) {
            conversacionesMap.get(remitenteId).ultimoMensaje = msg.contenido;
            conversacionesMap.get(remitenteId).fechaUltimoMensaje = msg.fecha_envio;
          }

          // Contar mensajes no leídos
          if (!msg.leido) {
            noLeidosMap[remitenteId]++;
          }
        });

        const conversacionesArray = Array.from(conversacionesMap.values())
          .sort((a, b) => new Date(b.fechaUltimoMensaje) - new Date(a.fechaUltimoMensaje));

        // Obtener nombres de pacientes
        const conversacionesConNombres = await Promise.all(
          conversacionesArray.map(async (conv) => {
            const infoPaciente = await obtenerInfoPaciente(conv.pacienteId);
            return {
              ...conv,
              pacienteNombre: infoPaciente.nombre,
              pacienteUsername: infoPaciente.username
            };
          })
        );

        setConversaciones(conversacionesConNombres);
        setMensajesNoLeidos(noLeidosMap);
        console.log("Conversaciones procesadas:", conversacionesConNombres);
      } catch (error) {
        console.error("Error cargando conversaciones:", error);
        setError("No se pudieron cargar las conversaciones");
      }
    };

    cargarConversaciones();

    // Auto-actualizar cada 10 segundos
    const interval = setInterval(cargarConversaciones, 10000);
    return () => clearInterval(interval);
  }, [especialistaId]);

  // Cargar mensajes de la conversación seleccionada
  useEffect(() => {
    if (!conversacionSeleccionada || !especialistaId) return;

    const cargarConversacion = async () => {
      try {
        setError(null);
        const url = `chat/chat/conversacion/${especialistaId}/${conversacionSeleccionada.pacienteId}`;
        console.log("Cargando conversación desde:", url);
        
        const data = await getData(url);
        console.log("Mensajes de conversación:", data);
        
        if (Array.isArray(data)) {
          setMensajes(data);
          
          // Marcar mensajes como leídos
          const mensajesPorLeer = data.filter(
            msg => msg.destinatario === especialistaId && !msg.leido
          );
          
          for (const msg of mensajesPorLeer) {
            try {
              await fetch(`/api/chat/chat/marcar-leido/${msg.id}/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' }
              });
            } catch (err) {
              console.error("Error marcando mensaje como leído:", err);
            }
          }
        } else {
          setMensajes([]);
        }
      } catch (error) {
        console.error("Error cargando conversación:", error);
        setMensajes([]);
        setError("Error al cargar los mensajes.");
      }
    };

    cargarConversacion();

    // Auto-actualizar cada 5 segundos
    const interval = setInterval(cargarConversacion, 5000);
    return () => clearInterval(interval);
  }, [conversacionSeleccionada, especialistaId]);

  // Scroll automático
  useEffect(() => {
    mensajesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  // Enviar mensaje
  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !conversacionSeleccionada) return;

    const payload = {
      remitente: especialistaId,
      destinatario: conversacionSeleccionada.pacienteId,
      contenido: nuevoMensaje,
    };

    setLoading(true);
    setError(null);
    try {
      console.log("Enviando mensaje:", payload);
      const data = await postData("chat/chat/", payload);
      console.log("Mensaje enviado:", data);
      
      if (data && data.id) {
        setMensajes((prev) => [...prev, data]);
        setNuevoMensaje("");
      } else {
        setError("El mensaje no se envió correctamente");
      }
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      setError("Error al enviar el mensaje.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  const seleccionarConversacion = (conversacion) => {
    console.log("Conversación seleccionada:", conversacion);
    setConversacionSeleccionada(conversacion);
    setError(null);
    
    // Actualizar contador de no leídos
    setMensajesNoLeidos(prev => ({
      ...prev,
      [conversacion.pacienteId]: 0
    }));
  };

  if (!usuarioData || !especialistaId) {
    return (
      <div className="chat-especialista-error">
        <p>Error: No se encontró la información del usuario. Por favor, inicia sesión.</p>
      </div>
    );
  }

  return (
    <div className="chat-especialista-container">
      {/* Panel de conversaciones */}
      <div className="conversaciones-panel">
        <div className="conversaciones-header">
          <h2>Mensajes Recibidos</h2>
          <p className="especialista-info">
            {usuarioData.first_name} {usuarioData.last_name}
          </p>
        </div>

        {error && !conversacionSeleccionada && (
          <div className="chat-error">
            ⚠️ {error}
          </div>
        )}

        <div className="conversaciones-list">
          {conversaciones.length === 0 ? (
            <div className="conversaciones-empty">
              <p className="empty-icon">📭</p>
              <p>No hay conversaciones activas</p>
            </div>
          ) : (
            conversaciones.map((conv) => (
              <div
                key={conv.pacienteId}
                onClick={() => seleccionarConversacion(conv)}
                className={`conversacion-item ${
                  conversacionSeleccionada?.pacienteId === conv.pacienteId
                    ? "conversacion-activa"
                    : ""
                }`}
              >
                <div className="conversacion-content">
                  <div className="conversacion-header-row">
                    <h3 className="paciente-nombre">{conv.pacienteNombre}</h3>
                    {mensajesNoLeidos[conv.pacienteId] > 0 && (
                      <span className="badge-no-leidos">
                        {mensajesNoLeidos[conv.pacienteId]}
                      </span>
                    )}
                  </div>
                  <p className="ultimo-mensaje">{conv.ultimoMensaje}</p>
                  <p className="fecha-mensaje">
                    {new Date(conv.fechaUltimoMensaje).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Panel de mensajes */}
      <div className="mensajes-panel">
        {conversacionSeleccionada ? (
          <>
            <div className="mensajes-header">
              <h3>{conversacionSeleccionada.pacienteNombre}</h3>
              <p className="paciente-id">
                ID: {conversacionSeleccionada.pacienteId}
              </p>
            </div>

            {error && (
              <div className="chat-error">
                ⚠️ {error}
              </div>
            )}

            <div className="mensajes-content">
              {mensajes.length === 0 ? (
                <div className="mensajes-empty">
                  No hay mensajes en esta conversación
                </div>
              ) : (
                mensajes.map((msg, index) => {
                  if (!msg) return null;
                  
                  const esMio = msg.remitente === especialistaId;
                  
                  return (
                    <div
                      key={msg.id || `msg-${index}`}
                      className={`mensaje ${esMio ? "mensaje-mio" : "mensaje-suyo"}`}
                    >
                      <div className="mensaje-bubble">
                        <p className="mensaje-texto">
                          {msg.contenido || "Sin contenido"}
                        </p>
                        <p className="mensaje-hora">
                          {msg.fecha_envio
                            ? new Date(msg.fecha_envio).toLocaleTimeString("es-ES", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={mensajesEndRef} />
            </div>

            <div className="mensajes-input-container">
              <div className="input-wrapper">
                <textarea
                  value={nuevoMensaje}
                  onChange={(e) => setNuevoMensaje(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu respuesta..."
                  disabled={loading}
                  rows="3"
                  className="mensaje-textarea"
                />
                <div className="input-buttons">
                  <button
                    onClick={() => {
                      setNuevoMensaje("");
                      setError(null);
                    }}
                    disabled={loading || !nuevoMensaje.trim()}
                    className="btn-limpiar"
                  >
                    Limpiar
                  </button>
                  <button
                    onClick={enviarMensaje}
                    disabled={loading || !nuevoMensaje.trim()}
                    className="btn-enviar"
                  >
                    {loading ? "Enviando..." : "Enviar"}
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="mensajes-placeholder">
            <div className="placeholder-content">
              <p className="placeholder-icon">💬</p>
              <p>Selecciona una conversación para comenzar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatEspecialista;