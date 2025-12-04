import React, { useState } from "react";
import { send } from "@emailjs/browser";
import '../styles/RecoveryEmailForm.css';

export default function RecoveryEmailForm({ recoveryCode = "", toEmail = "" }) {
  const [email, setEmail] = useState(toEmail);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); 
  const [message, setMessage] = useState("");
  const SERVICE_ID = "service_iux3f1a"; 
  const TEMPLATE_ID = "template_irnjwfl"; 
  const PUBLIC_KEY = "jMRA8NXKng2amVrVe";

  async function handleSend(e) {
    e.preventDefault();
    setStatus(null);
    setMessage("");
    if (!email) {
      setStatus("error");
      setMessage("Ingresa un correo válido.");
      return;
    }
    setLoading(true);
    const templateParams = {
      email: email,
      codigo: recoveryCode,
    };
    try {
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
      <form onSubmit={handleSend} id="recovery-form">
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
        <div id="recovery-code-section">
          <label id="recovery-form-label-code">Código de recuperación</label>
          <div id="recovery-code-block">{recoveryCode || "(no hay código)"}</div>
        </div>
        <button
          id="recovery-form-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar correo"}
        </button>
        {status === "ok" && (
          <p id="recovery-message-success" role="status">{message}</p>
        )}
        {status === "error" && (
          <p id="recovery-message-error" role="alert">{message}</p>
          
        )}

        <p id="recovery-form-login-link">
  Intentalo de nuevo{" "}
  <a href="http://localhost:5173/sesion" id="recovery-form-login-anchor">
    Inicia sesión aquí
  </a>
</p>
      </form>
    </div>
  );
}

