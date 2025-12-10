import React, { useState, useEffect } from "react";
import "../styles/ModalEditarUsuario.css";

const ModalEditarUsuario = ({ usuario, onClose, onUpdated }) => {
  // Estado local para manejar los datos del formulario
  const [form, setForm] = useState(usuario || {});

  // Cada vez que cambie el usuario recibido por props, actualizar el formulario
  useEffect(() => {
    setForm(usuario);
  }, [usuario]);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Función para actualizar usuario en la API
  const actualizarUsuario = async (e) => {
    e.preventDefault();

    try {
      // Petición PATCH al backend con los datos editados
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

      // Si todo sale bien:
      onUpdated();   // Actualiza la lista en el componente padre (VistaUsuarios)
      onClose();     // Cierra el modal
    } catch (error) {
      alert("No se pudo actualizar el usuario");
    }
  };

  // Si no hay usuario seleccionado, no renderizar nada
  if (!usuario) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h2>Editar Usuario</h2>

        {/* Formulario controlado */}
        <form onSubmit={actualizarUsuario}>
          {/* Campo: nombre de usuario */}
          <div className="campo">
            <label>Usuario</label>
            <input
              name="username"
              value={form.username || ""}
              onChange={handleChange}
            />
          </div>

          {/* Campo: correo */}
          <div className="campo">
            <label>Correo</label>
            <input
              name="email"
              value={form.email || ""}
              onChange={handleChange}
            />
          </div>

          {/* Campo: rol */}
          <div className="campo">
            <label>Rol</label>
            <select
              name="rol"
              value={form.rol || ""}
              onChange={handleChange}
            >
              <option value="Cliente">Cliente</option>
              <option value="Admin">Admin</option>
              <option value="Especialista">Especialista</option>
            </select>
          </div>

          {/* Botones de acción */}
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

