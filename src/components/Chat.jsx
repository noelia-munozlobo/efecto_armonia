import React, { useState, useEffect, useRef } from "react";
import { getData, postDataAutenticado } from "../services/fetch";
import "../styles/Chat.css";

function Chat() {
  // obtener el id del remitente desde localstorage
  const remitenteId = parseInt(localStorage.getItem("usuarioId"));

  // estados principales
  const [especialistas, setEspecialistas] = useState([]);
  const [especialistaSeleccionado, setEspecialistaSeleccionado] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mensajesEndRef = useRef(null);

  // mostrar en consola el id del remitente
  useEffect(() => {
    console.log("remitenteId obtenido del localStorage:", remitenteId);
  }, [remitenteId]);

  // cargar especialistas al iniciar
  useEffect(() => {
    const cargarEspecialistas = async () => {
      try {
        const data = await getData("especialistas/especialistas");
        setEspecialistas(data);
      } catch (error) {
        console.error("error cargando especialistas:", error);
        setError("no se pudieron cargar los especialistas");
      }
    };

    cargarEspecialistas();
  }, []);

  // cargar mensajes cuando se selecciona un especialista
  useEffect(() => {
    if (!especialistaSeleccionado || !remitenteId) return;

    const cargarConversacion = async () => {
      try {
        setError(null);
        const url = `chat/chat/conversacion/${remitenteId}/${especialistaSeleccionado.usuario}`;
        const data = await getData(url);

        // asegurar que los datos sean un array
        if (Array.isArray(data)) {
          setMensajes(data);
        } else {
          setMensajes([]);
        }
      } catch (error) {
        console.error("error cargando conversación:", error);
        setMensajes([]);
        setError("error al cargar los mensajes");
      }
    };

    cargarConversacion();

    // actualizar mensajes cada 5 segundos
    const interval = setInterval(cargarConversacion, 5000);
    return () => clearInterval(interval);
  }, [especialistaSeleccionado, remitenteId]);

  // scroll automático al último mensaje
  useEffect(() => {
    // mensajesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes]);

  // enviar mensaje
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
      const data = await postDataAutenticado("chat/chat/", payload);
      
      // agregar mensaje si la respuesta es válida
      if (data && data.id) {
        setMensajes((prev) => [...prev, data]);
        setNuevoMensaje("");
      } else {
        setError("El mensaje no se envió correctamente");
      }
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      setError("Error al enviar el mensaje, revisa las urls de django");
    } finally {
      setLoading(false);
    }
  };

  // manejar tecla enter para enviar mensaje
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  // manejar selección de especialista
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
    setEspecialistaSeleccionado(especialista);
    setError(null);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chatea con un especialista</h2>
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
          {error}
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
                No hay mensajes, inicia la conversación
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
                    <div className="chat-message-content">{msg.contenido || "sin contenido"}</div>
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
              <button
                onClick={enviarMensaje}
                disabled={loading || !nuevoMensaje.trim()}
                className="btn-primary"
              >
                {loading ? "enviando..." : "enviar"}
              </button>
            </div>
          </div>
      ) : (
        <div className="chat-placeholder">
          {!remitenteId ? (
            <p>Error: No se encontró el id del usuario</p>
          ) : (
            <p>Selecciona un especialista para comenzar a chatear</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Chat;
