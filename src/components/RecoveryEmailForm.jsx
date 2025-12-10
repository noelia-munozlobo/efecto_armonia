import React, { useState } from "react";
import { send } from "@emailjs/browser";
import '../styles/RecoveryEmailForm.css';

export default function RecoveryEmailForm({ recoveryCode = "", toEmail = "" }) {
  // Estado para el correo destinatario (inicializado con prop toEmail)
  const [email, setEmail] = useState(toEmail);
  // Estado para mostrar indicador de carga
  const [loading, setLoading] = useState(false);
  // Estado para saber si la operación fue exitosa o fallida
  const [status, setStatus] = useState(null); 
  // Mensaje de retroalimentación al usuario
  const [message, setMessage] = useState("");

  // Configuración de EmailJS
  const SERVICE_ID = "service_iux3f1a"; 
  const TEMPLATE_ID = "template_irnjwfl"; 
  const PUBLIC_KEY = "jMRA8NXKng2amVrVe";

  // Función para enviar correo de recuperación
  async function handleSend(e) {
    e.preventDefault(); // prevenir recarga de página
    setStatus(null);
    setMessage("");

    // Validación: correo obligatorio
    if (!email) {
      setStatus("error");
      setMessage("Ingresa un correo válido.");
      return;
    }

    setLoading(true);

    // Parámetros que se envían al template de EmailJS
    const templateParams = {
      email: email,
      codigo: recoveryCode,
    };

    try {
      // Enviar correo usando EmailJS
      await send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus("ok");
      setMessage("Correo de recuperación enviado correctamente.");
    } catch (err) {
      console.error("EmailJS send error:", err);
      setStatus("error");
      setMessage("Ocurrió un error al enviar el correo. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="recovery-form-container">
      <h2 id="recovery-form-title">Enviar código de recuperación</h2>

      {/* Formulario controlado */}
      <form onSubmit={handleSend} id="recovery-form">
        {/* Campo de correo destinatario */}
        <label id="recovery-form-label-email">
          Correo destinatario
          <input
            id="recovery-form-input-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@correo.com"
            required
            aria-label="Correo destinatario"
          />
        </label>

        {/* Bloque que muestra el código de recuperación */}
        <div id="recovery-code-section">
          <label id="recovery-form-label-code">Código de recuperación</label>
          <div id="recovery-code-block">{recoveryCode || "(no hay código)"}</div>
        </div>

        {/* Botón de envío con estado dinámico */}
        <button
          id="recovery-form-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar correo"}
        </button>

        {/* Mensajes de retroalimentación */}
        {status === "ok" && (
          <p id="recovery-message-success" role="status">{message}</p>
        )}
        {status === "error" && (
          <p id="recovery-message-error" role="alert">{message}</p>
        )}

        {/* Enlace alternativo para iniciar sesión */}
        <p id="recovery-form-login-link">
          Inténtalo de nuevo{" "}
          <a href="http://localhost:5173/sesion" id="recovery-form-login-anchor">
            Inicia sesión aquí
          </a>
        </p>
      </form>
    </div>
  );
}


