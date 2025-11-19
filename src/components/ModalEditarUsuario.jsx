import React, { useState, useEffect } from "react";
import "../styles/ModalEditarUsuario.css";

const ModalEditarUsuario = ({ usuario, onClose, onUpdated }) => {
  const [form, setForm] = useState(usuario || {});

  useEffect(() => {
    setForm(usuario);
  }, [usuario]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const actualizarUsuario = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch("http://127.0.0.1:8000/editar-usuario/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: form.id,
          username: form.username,
          email: form.email,
          rol: form.rol,
        }),
      });

      if (!resp.ok) throw new Error("Error al actualizar");

      onUpdated();   // ← Actualiza lista en VistaUsuarios
      onClose();     // ← Cierra el modal

    } catch (error) {
      alert("No se pudo actualizar el usuario");
    }
  };

  if (!usuario) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h2>Editar Usuario</h2>

        <form onSubmit={actualizarUsuario}>
          <div className="campo">
            <label>Usuario</label>
            <input name="username" value={form.username || ""} onChange={handleChange} />
          </div>

          <div className="campo">
            <label>Correo</label>
            <input name="email" value={form.email || ""} onChange={handleChange} />
          </div>

          <div className="campo">
            <label>Rol</label>
            <select name="rol" value={form.rol || ""} onChange={handleChange}>
              <option value="Cliente">Cliente</option>
              <option value="Admin">Admin</option>
              <option value="Especialista">Especialista</option>
            </select>
          </div>

          <div className="acciones">
            <button type="submit" className="btn-guardar">Guardar</button>
            <button type="button" className="btn-cerrar" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarUsuario;
