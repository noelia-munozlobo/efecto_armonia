import React, { useEffect, useState } from "react";
import { send } from "@emailjs/browser";
import '../styles/RecoveryEmailForm.css';
import { getData, postData, patchData } from "../services/fetch";
import { useNavigate } from "react-router-dom";

export default function RecoveryEmailForm({ toEmail = "" }) {
  const [email, setEmail] = useState(toEmail);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const SERVICE_ID = "service_iux3f1a";
  const TEMPLATE_ID = "template_irnjwfl";
  const PUBLIC_KEY = "jMRA8NXKng2amVrVe";
  const [recoveryCode, setRecoveryCode] = useState("");
  const [users, setUsers] = useState([]);
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [codigoVerificado, setCodigoVerificado] = useState(false);
  const [idUsuario, setIdUsuario] = useState(null);
  const [codigoIngresado, setCodigoIngresado] = useState("");
  const [nuevaClave, setNuevaClave] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function traerUsuarios() {
      const peticion = await getData("usuarios/crear-usuario");
      setUsers(peticion);
    }
    traerUsuarios();
  }, []);

  const usuarioExiste = () => {
    const usuario = users.find((user) => user.email === email);
    if (usuario) {
      setIdUsuario(usuario.id);
      localStorage.setItem('usuarioIdRecuperacion', usuario.id);
    }
    return usuario !== undefined;
  };

  const registrarCodigo = async (id_usuario, codigo) => {
    try {
      const peticion = await postData(`usuarios/codigo-recuperacion/`, {
        usuario: id_usuario,
        codigo: codigo,
      });
      console.log("Código registrado:", peticion);
    } catch (error) {
      console.error("Error al registrar código:", error);
    }
  };

  const generateRecoveryCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters.charAt(randomIndex);
    }
    setRecoveryCode(code);
    return code;
  };

  const handleSend = async () => {
    setStatus(null);
    setMessage("");
    
    if (!email) {
      setStatus("error");
      setMessage("Ingresa un correo válido.");
      return;
    }
    
    if (!usuarioExiste()) {
      setStatus("error");
      setMessage("El correo no está registrado.");
      return;
    }
    
    setLoading(true);
    const code = generateRecoveryCode();
    const templateParams = {
      email: email,
      codigo: code,
    };
    
    try {
      await send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setStatus("ok");
      setMessage("Correo de recuperación enviado correctamente.");
      setCorreoEnviado(true);
      registrarCodigo(localStorage.getItem('usuarioIdRecuperacion'), code);
    } catch (err) {
      console.error("EmailJS send error:", err);
      setStatus("error");
      setMessage("Ocurrió un error al enviar el correo. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerificarCodigo = () => {
    setStatus(null);
    setMessage("");

    if (!codigoIngresado) {
      setStatus("error");
      setMessage("Ingresa el código de recuperación.");
      return;
    }

    if (codigoIngresado === recoveryCode) {
      setStatus("ok");
      setMessage("Código verificado correctamente.");
      setCodigoVerificado(true);
    } else {
      setStatus("error");
      setMessage("El código ingresado es incorrecto.");
    }
  };

  const handleCambiarClave = async () => {
    setStatus(null);
    setMessage("");

    if (!nuevaClave || !confirmarClave) {
      setStatus("error");
      setMessage("Completa todos los campos.");
      return;
    }

    if (nuevaClave.length < 6) {
      setStatus("error");
      setMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (nuevaClave !== confirmarClave) {
      setStatus("error");
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const response = await patchData("usuarios/codigo-recuperacion/actualizar/", {
        id_usuario: localStorage.getItem('usuarioIdRecuperacion'),
        codigo_recuperacion: codigoIngresado,
        nueva_clave: nuevaClave,
      });

      setStatus("ok");
      setMessage(response.mensaje || "Contraseña actualizada exitosamente.");
      navigate("/login");
      setTimeout(() => {
        setEmail("");
        setCodigoIngresado("");
        setNuevaClave("");
        setConfirmarClave("");
        setCorreoEnviado(false);
        setCodigoVerificado(false);
        localStorage.removeItem('usuarioIdRecuperacion');
      }, 2000);

    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      setStatus("error");
      setMessage("Ocurrió un error al cambiar la contraseña. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="rec-email-container">
      <h2 id="rec-email-title">
        {!correoEnviado && "Enviar código de recuperación"}
        {correoEnviado && !codigoVerificado && "Verificar código"}
        {codigoVerificado && "Cambiar contraseña"}
      </h2>

      {/* Paso 1: Enviar correo */}
      {!correoEnviado && (
        <>
          <label id="rec-email-label-email">
            Correo destinatario
            <input
              id="rec-email-input-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@correo.com"
              required
              aria-label="Correo destinatario"
            />
          </label>
          <button
            id="rec-email-button"
            type="button"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar correo"}
          </button>
          <div id="rec-email-note">
            <strong>Nota:</strong> Revisa tu carpeta de spam si no ves el correo en tu bandeja de entrada.
          </div>
        </>
      )}

      {/* Paso 2: Verificar código */}
      {correoEnviado && !codigoVerificado && (
        <div className="rec-email-verify-container">
          <input
            type="text"
            value={codigoIngresado}
            onChange={(e) => setCodigoIngresado(e.target.value)}
            placeholder="Inserta el código de recuperación"
            maxLength={6}
          />
          <button onClick={handleVerificarCodigo}>Verificar código</button>
        </div>
      )}

      {/* Paso 3: Cambiar contraseña */}
      {codigoVerificado && (
        <div className="rec-email-change-password-container">
          <input
            type="password"
            value={nuevaClave}
            onChange={(e) => setNuevaClave(e.target.value)}
            placeholder="Nueva contraseña (mínimo 6 caracteres)"
          />
          <input
            type="password"
            value={confirmarClave}
            onChange={(e) => setConfirmarClave(e.target.value)}
            placeholder="Confirmar contraseña"
          />
          <button onClick={handleCambiarClave} disabled={loading}>
            {loading ? "Actualizando..." : "Cambiar contraseña"}
          </button>
          
        </div>
      )}

      {/* Mensajes de estado */}
      {status === "ok" && (
        <p id="rec-email-message-success" role="status">{message}</p>
      )}
      {status === "error" && (
        <p id="rec-email-message-error" role="alert">{message}</p>
      )}
    </div>
  );
}