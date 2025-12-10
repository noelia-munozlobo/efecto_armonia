import React, { useState, useEffect } from 'react';
import '../styles/FormularioUsuarios.css';
import { useNavigate, useParams } from 'react-router-dom';

const FormularioUsuarios = () => {
  // Obtener el parámetro "id" de la URL y la función de navegación
  const { id } = useParams();
  const navigate = useNavigate();

  // Estado para manejar los datos del formulario
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

  // Función para cargar datos del usuario desde la API
  const cargarUsuario = async () => {
    try {
      const resp = await fetch(`http://127.0.0.1:8000/usuarios/usuario/${id}/`);
      const data = await resp.json();

      // Dividir el apellido completo en dos partes (primer y segundo apellido)
      const [ap1 = '', ap2 = ''] = data.last_name?.split(" ") || [];

      // Actualizar el estado con los datos del usuario
      setForm({
        username: data.username,
        email: data.email,
        password: '', // se deja vacío para no mostrar la contraseña
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

  // Al montar el componente o cambiar el id, cargar datos del usuario
  useEffect(() => {
    if (id) cargarUsuario();
  }, [id]);

  // Función para actualizar usuario en la API
  const actualizarUsuario = async (e) => {
    e.preventDefault();

    // Construir objeto con datos del formulario
    const obj = {
      username: form.username,
      email: form.email,
      first_name: form.first_name,
      last_name: `${form.last_name1} ${form.last_name2}`.trim(),
      telefono: form.telefono,
      rol: form.rol
    };

    // Solo enviar contraseña si el usuario escribió una nueva
    if (form.password.trim() !== "") {
      obj.password = form.password;
    }

    try {
      // Petición PUT para actualizar usuario
      const respuesta = await fetch(`http://127.0.0.1:8000/usuarios/usuario/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
      });

      if (!respuesta.ok) throw new Error("Error al actualizar");

      alert("Usuario actualizado");
      navigate("/PagAdmin"); // redirigir al panel de administración

    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Hubo un problema al actualizar el usuario');
    }
  };

  return (
    <div className="pagina-registro">
      <div className="registro-container">
        <h2>Editar Usuario</h2>

        {/* Formulario controlado */}
        <form onSubmit={actualizarUsuario}>

          {/* Campo: nombre de usuario */}
          <div className="campo">
            <label>Nombre de usuario</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          {/* Campo: nombre */}
          <div className="campo">
            <label>Nombre</label>
            <input
              type="text"
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            />
          </div>

          {/* Campo: primer apellido */}
          <div className="campo">
            <label>Primer Apellido</label>
            <input
              type="text"
              value={form.last_name1}
              onChange={(e) => setForm({ ...form, last_name1: e.target.value })}
            />
          </div>

          {/* Campo: segundo apellido */}
          <div className="campo">
            <label>Segundo Apellido</label>
            <input
              type="text"
              value={form.last_name2}
              onChange={(e) => setForm({ ...form, last_name2: e.target.value })}
            />
          </div>

          {/* Campo: teléfono */}
          <div className="campo">
            <label>Teléfono</label>
            <input
              type="text"
              value={form.telefono}
              onChange={(e) => setForm({ ...form, telefono: e.target.value })}
            />
          </div>

          {/* Campo: correo */}
          <div className="campo">
            <label>Correo</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Campo: contraseña */}
          <div className="campo">
            <label>Contraseña</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Campo: rol */}
          <div className="campo">
            <label>Rol</label>
            <select
              value={form.rol}
              onChange={(e) => setForm({ ...form, rol: e.target.value })}
            >
              <option value="cliente">Cliente</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Botón de envío */}
          <button type="submit" className="boton-registro">
            Actualizar Usuario
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioUsuarios;
