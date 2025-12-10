import React, { useState, useEffect, useRef } from "react";
import { getData, postData } from "../services/fetch";
import "../styles/Chat.css";

function Chat() {
  const remitenteId = parseInt(localStorage.getItem("usuarioId"));

  const [especialistas, setEspecialistas] = useState([]);
  const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mensajesEndRef = useRef(null);

  useEffect(() => {
    console.log("remitenteId obtenido del localStorage:", remitenteId);
  }, [remitenteId]);

  // Cargar especialistas
  useEffect(() => {
    const cargarEspecialistas = async () => {
      try {
        const data = await getData("especialistas/especialistas");
        console.log("Especialistas cargados:", data);
        setEspecialistas(data);
      } catch (error) {
        console.error("Error cargando especialistas:", error);
        setError("No se pudieron cargar los especialistas");
      }
    };

    cargarEspecialistas();
  }, []);

  // Cargar mensajes cuando se selecciona un especialista
  useEffect(() => {
    if (!especialistaSeleccionado || !remitenteId) return;

    const cargarConversacion = async () => {
      try {
        setError(null);
        const url = `chat/chat/conversacion/${remitenteId}/${especialistaSeleccionado.usuario}`;
        console.log("Intentando cargar conversación desde:", url);
        
        const data = await getData(url);
        console.log("Mensajes cargados:", data);
        console.log("Tipo de datos:", typeof data, Array.isArray(data));
        
        // Asegurarse de que data sea un array
        if (Array.isArray(data)) {
          setMensajes(data);
          console.log("Mensajes establecidos:", data.length, "mensajes");
        } else {
          console.warn("Los datos no son un array:", data);
          setMensajes([]);
        }
      } catch (error) {
        console.error("Error cargando conversación:", error);
        setMensajes([]);
        setError("Error al cargar los mensajes.");
      }
    };

    cargarConversacion();

    // Auto-actualizar mensajes cada 5 segundos
    const interval = setInterval(cargarConversacion, 5000);
    return () => clearInterval(interval);
  }, [especialistaSeleccionado, remitenteId]);

  // Scroll automático al último mensaje
  useEffect(() => {
    // mensajesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  // Enviar mensaje
  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !especialistaSeleccionado) return;

    const payload = {
      remitente: remitenteId,
      destinatario: especialistaSeleccionado.usuario,
      contenido: nuevoMensaje,
    };

    setLoading(true);
    setError(null);
    try {
      console.log("Enviando mensaje:", payload);
      const data = await postData("chat/chat/", payload);
      console.log("Mensaje enviado:", data);
      
      // Solo agregar si data tiene la estructura correcta
      if (data && data.id) {
        setMensajes((prev) => [...prev, data]);
        setNuevoMensaje("");
      } else {
        setError("El mensaje no se envió correctamente");
      }
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      setError("Error al enviar el mensaje. Verifica que las URLs de Django estén correctas.");
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

  const handleSelectChange = (e) => {
    const especialistaId = e.target.value;
    if (!especialistaId) {
      setEspecialistaSeleccionado(null);
      setMensajes([]);
      setError(null);
      return;
    }

    const especialista = especialistas.find(
      (esp) => esp.id.toString() === especialistaId
    );
    console.log("Especialista seleccionado:", especialista);
    setEspecialistaSeleccionado(especialista);
    setError(null);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat con Especialista</h2>
        <select
          className="chat-select"
          value={especialistaSeleccionado?.id || ""}
          onChange={handleSelectChange}
        >
          <option value="">-- Escoge un especialista --</option>
          {especialistas.map((esp) => (
            <option key={esp.id} value={esp.id}>
              {esp.nombre_completo} — {esp.especialidad}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="chat-error">
          ⚠️ {error}
        </div>
      )}

      {especialistaSeleccionado && remitenteId ? (
        <div className="chat-box">
          <div className="chat-especialista-info">
            <strong>{especialistaSeleccionado.nombre_completo}</strong>
            <span className="chat-especialidad">{especialistaSeleccionado.especialidad}</span>
          </div>

          <div className="chat-messages">
            {mensajes.length === 0 ? (
              <div className="chat-no-messages">
                No hay mensajes. ¡Inicia la conversación!
              </div>
            ) : (
              mensajes.map((msg, index) => {
                if (!msg) return null;
                
                return (
                  <div
                    key={msg.id || `msg-${index}`}
                    className={
                      msg.remitente === remitenteId
                        ? "chat-message mine"
                        : "chat-message theirs"
                    }
                  >
                    <div className="chat-message-content">{msg.contenido || "Sin contenido"}</div>
                    <div className="chat-message-time">
                      {msg.fecha_envio ? new Date(msg.fecha_envio).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      }) : ""}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={mensajesEndRef} />
          </div>

          <div className="chat-input">
            <textarea
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              disabled={loading}
              rows="3"
            />
            <div className="chat-input-buttons">
              <button
                onClick={() => {
                  setNuevoMensaje("");
                  setError(null);
                }}
                disabled={loading || !nuevoMensaje.trim()}
                className="btn-secondary"
              >
                Limpiar
              </button>
              <button
                onClick={enviarMensaje}
                disabled={loading || !nuevoMensaje.trim()}
                className="btn-primary"
              >
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-placeholder">
          {!remitenteId ? (
            <p>Error: No se encontró el ID del usuario</p>
          ) : (
            <p>Selecciona un especialista para comenzar a chatear</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Chat;