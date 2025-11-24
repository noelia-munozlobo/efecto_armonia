import React, { useEffect, useState } from "react";
import { getData, deleteData, putData } from "../services/fetch";
import "../styles/AdminRecursos.css";

const AdminEspecialistas = () => {
  const [especialistas, setEspecialistas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    usuario_email: "",
    username: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    especialidad: "",
    descripcion: "",
  });
  const [cambiarUsuario, setCambiarUsuario] = useState(false);

  useEffect(() => {
    cargarEspecialistas();
  }, []);

  const cargarEspecialistas = async () => {
    const data = await getData("especialistas/especialistas");
    setEspecialistas(data || []);
  };

  const eliminarEspecialista = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este especialista?")) {
      await deleteData("especialistas/" + id + "/");
      cargarEspecialistas();
    }
  };

  const editarEspecialista = (esp) => {
    setEditando(esp.id);
    setFormulario({
      usuario_email: esp.correo || "",
      username: esp.username || "",
      nombre: esp.nombre || "",
      apellido: esp.apellido || "",
      correo: esp.correo || "",
      telefono: esp.telefono || "",
      especialidad: esp.especialidad || "",
      descripcion: esp.descripcion || "",
    });
    setCambiarUsuario(false);
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setFormulario({
      usuario_email: "",
      username: "",
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      especialidad: "",
      descripcion: "",
    });
    setCambiarUsuario(false);
  };

  const actualizarFormulario = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const guardarCambios = async (id) => {
    const dataToSend = {
      especialidad: formulario.especialidad,
      descripcion: formulario.descripcion,
    };

    // Si se va a cambiar el usuario, enviar solo el email del nuevo usuario
    if (cambiarUsuario) {
      dataToSend.usuario_email = formulario.usuario_email;
    } else {
      // Si no se cambia usuario, enviar datos para actualizar el usuario actual
      dataToSend.username = formulario.username;
      dataToSend.nombre = formulario.nombre;
      dataToSend.apellido = formulario.apellido;
      dataToSend.correo = formulario.correo;
      dataToSend.telefono = formulario.telefono;
    }
    
    const response = await putData("especialistas/especialistas/" + id + "/", dataToSend);
    
    if (response && !response.error) {
      setEditando(null);
      setCambiarUsuario(false);
      cargarEspecialistas();
    } else {
      alert(response?.error || "Error al actualizar el especialista");
    }
  };

  return (
    <div className="lista-recursos">
      <h2>Especialistas Registrados</h2>

      <div className="bloques">
        {especialistas.map((esp) =>
          editando === esp.id ? (
            <div key={esp.id} className="bloque">
              <h4>Editando Especialista</h4>

              {cambiarUsuario ? (
                <>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                    Ingresa el correo del nuevo usuario. El usuario anterior volverá a rol "usuario".
                  </p>
                  <input
                    name="usuario_email"
                    value={formulario.usuario_email}
                    onChange={actualizarFormulario}
                    placeholder="Correo del nuevo usuario"
                    type="email"
                  />
                </>
              ) : (
                <>
                  <input
                    name="username"
                    value={formulario.username}
                    onChange={actualizarFormulario}
                    placeholder="Nombre de usuario"
                  />

                  <input
                    name="nombre"
                    value={formulario.nombre}
                    onChange={actualizarFormulario}
                    placeholder="Nombre"
                  />

                  <input
                    name="apellido"
                    value={formulario.apellido}
                    onChange={actualizarFormulario}
                    placeholder="Apellido"
                  />

                  <input
                    name="correo"
                    value={formulario.correo}
                    onChange={actualizarFormulario}
                    placeholder="Correo"
                    type="email"
                  />

                  <input
                    name="telefono"
                    value={formulario.telefono}
                    onChange={actualizarFormulario}
                    placeholder="Teléfono"
                  />
                </>
              )}

              <select
                name="especialidad"
                value={formulario.especialidad}
                onChange={actualizarFormulario}
              >
                <option value="">Seleccione especialidad</option>
                <option value="Psicología Clínica">Psicología Clínica</option>
                <option value="Psicología Organizacional">Psicología Organizacional</option>
                <option value="Neuropsicología">Neuropsicología</option>
                <option value="Psicopedagogía">Psicopedagogía</option>
              </select>

              <textarea
                name="descripcion"
                value={formulario.descripcion}
                onChange={actualizarFormulario}
                placeholder="Descripción"
                rows={3}
              />

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => guardarCambios(esp.id)}>Guardar</button>
                <button onClick={cancelarEdicion}>Cancelar</button>
              </div>
            </div>
          ) : (
            <div key={esp.id} className="bloque">
              <h4>{esp.nombre_completo}</h4>
              <p><strong>Usuario:</strong> {esp.username}</p>
              <p><strong>Especialidad:</strong> {esp.especialidad}</p>
              <p><strong>Correo:</strong> {esp.correo}</p>
              <p><strong>Teléfono:</strong> {esp.telefono}</p>
              <p>{esp.descripcion}</p>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => editarEspecialista(esp)}>Editar</button>
                <button onClick={() => eliminarEspecialista(esp.id)}>Eliminar</button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminEspecialistas;