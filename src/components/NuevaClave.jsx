import React, { useState } from "react";
import { patchData } from "../services/fetch";
import "../styles/NuevaClaveForm.css"; 

export default function NuevaClave({ codigoIngresado, onSuccess }) {
  const [clave1, setClave1] = useState("");
  const [clave2, setClave2] = useState("");
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const idUsuario = localStorage.getItem("usuarioIdRecuperacion");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    if (!clave1 || !clave2) {
      setError("Debes completar ambos campos.");
      return;
    }
    if (clave1 !== clave2) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);

    try {
      const respuesta = await patchData(
        "usuarios/codigo-recuperacion/actualizar/",
        {
          id_usuario: idUsuario,
          codigo_recuperacion: codigoIngresado,
          nueva_clave: clave1,
        }
      );

      if (respuesta.mensaje) {
        setMensaje("Contraseña actualizada correctamente.");
        onSuccess?.(); // callback para redirigir o cerrar modal
      } else {
        setError("Código inválido o expirado.");
      }
    } catch (error) {
      setError("Error al actualizar la contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="nueva-clave-container">
      <h3 className="nueva-clave-title">Restablecer contraseña</h3>

      <form onSubmit={handleSubmit} className="nueva-clave-form">
        <label>
          Nueva contraseña
          <input
            type="password"
            value={clave1}
            onChange={(e) => setClave1(e.target.value)}
            required
          />
        </label>

        <label>
          Confirmar contraseña
          <input
            type="password"
            value={clave2}
            onChange={(e) => setClave2(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Actualizando..." : "Guardar contraseña"}
        </button>

        {error && <p className="error-msg">{error}</p>}
        {mensaje && <p className="success-msg">{mensaje}</p>}
      </form>
    </div>
  );
}
