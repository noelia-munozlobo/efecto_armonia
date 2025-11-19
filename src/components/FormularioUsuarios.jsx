import React, { useState, useEffect } from 'react';
import '../styles/FormularioUsuarios.css';
import { postData } from '../services/fetch';
import { useNavigate, useParams } from 'react-router-dom';

const FormularioUsuarios = () => {
  const { id } = useParams(); // ← OBTENER ID
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    telefono: '',
    rol: '',
  });

  // Cargar datos del usuario
  const cargarUsuario = async () => {
    try {
      const resp = await fetch(`http://127.0.0.1:8000/usuarios/usuario/${id}/`);
      const data = await resp.json();

      setForm({
        username: data.username,
        email: data.email,
        password: '', // vacía por seguridad
        first_name: data.first_name,
        last_name: `${data.last_name1} ${data.last_name2}`,
        telefono: data.telefono,
        rol: data.rol,
      });

    } catch (error) {
      console.log("Error cargando usuario:", error);
    }
  };

  useEffect(() => {
    if (id) cargarUsuario();
  }, [id]);


  // Actualizar usuario (PUT)
  const actualizarUsuario = async (e) => {
    e.preventDefault();

    const obj = {
      username: form.username,
      email: form.email,
      password: form.password, 
      first_name: form.first_name,
      last_name: form.last_name,
      telefono: form.telefono,
      rol: form.rol
    };

    try {
      const respuesta = await fetch(`http://127.0.0.1:8000/usuarios/usuario/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
      });

      if (!respuesta.ok) throw new Error("Error al actualizar");

      alert("Usuario actualizado");
      navigate("/usuarios");

    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Hubo un problema al actualizar el usuario');
    }
  };


  return (
    <div className="pagina-registro">
      <div className="registro-container">
        <h2>Editar Usuario</h2>

        <form onSubmit={actualizarUsuario}>

          <div className="campo">
            <label>Nombre de usuario</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="campo">
            <label>Nombre</label>
            <input
              type="text"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />
          </div>

          <div className="campo">
            <label>Apellidos</label>
            <input
              type="text"
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            />
          </div>

          <div className="campo">
            <label>Teléfono</label>
            <input
              type="text"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            />
          </div>

          <div className="campo">
            <label>Correo</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="campo">
            <label>Contraseña (dejar vacío para no cambiar)</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div className="campo">
            <label>Rol</label>
            <select
              value={form.rol}
              onChange={(e) => setForm({ ...form, rol: e.target.value })}
            >
              <option value="Cliente">Cliente</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="boton-registro">
            Actualizar Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioUsuarios;

