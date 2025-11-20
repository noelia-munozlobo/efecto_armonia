import React, { useState, useEffect } from 'react';
import '../styles/FormularioUsuarios.css';
import { useNavigate, useParams } from 'react-router-dom';

const FormularioUsuarios = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name1: '',
    last_name2: '',
    telefono: '',
    rol: '',
  });

  // Cargar datos del usuario
  const cargarUsuario = async () => {
    try {
      const resp = await fetch(`http://127.0.0.1:8000/usuarios/usuario/${id}/`);
      const data = await resp.json();

      // Dividir el apellido en 2 partes
      const [ap1 = '', ap2 = ''] = data.last_name?.split(" ") || [];

      setForm({
        username: data.username,
        email: data.email,
        password: '',
        first_name: data.first_name,
        last_name1: ap1,
        last_name2: ap2,
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


  // Actualizar usuario
  const actualizarUsuario = async (e) => {
    e.preventDefault();

    const obj = {
      username: form.username,
      email: form.email,
      first_name: form.first_name,
      last_name: `${form.last_name1} ${form.last_name2}`.trim(),
      telefono: form.telefono,
      rol: form.rol
    };

    // Solo enviar contraseña si el usuario escribió una
    if (form.password.trim() !== "") {
      obj.password = form.password;
    }

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
      navigate("/PagAdmin");

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
            <label>Primer Apellido</label>
            <input
              type="text"
              value={form.last_name1}
              onChange={(e) => setForm({ ...form, last_name1: e.target.value })}
            />
          </div>

          <div className="campo">
            <label>Segundo Apellido</label>
            <input
              type="text"
              value={form.last_name2}
              onChange={(e) => setForm({ ...form, last_name2: e.target.value })}
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
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
              <option value="especialista">Especialista</option>
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
