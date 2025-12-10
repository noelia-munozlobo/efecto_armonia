import React, { useEffect, useState } from "react";
import { getData, deleteData, putData } from "../services/fetch";
import "../styles/AdminRecursos.css";

const AdminEspecialistas = () => {
  // Estado para lista de especialistas
  const [especialistas, setEspecialistas] = useState([]);
  // Estado para saber cuál especialista se está editando
  const [editando, setEditando] = useState(null);
  // Estado para manejar los datos del formulario
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
  // Estado para decidir si se cambia el usuario asociado
  const [cambiarUsuario, setCambiarUsuario] = useState(false);

  // Al montar el componente, cargar especialistas
  useEffect(() => {
    cargarEspecialistas();
  }, []);

  // Función para obtener especialistas desde la API
  const cargarEspecialistas = async () => {
    const data = await getData("especialistas/especialistas");
    setEspecialistas(data || []);
  };

  // Función para eliminar especialista con confirmación
  const eliminarEspecialista = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este especialista?")) {
      await deleteData("especialistas/" + id + "/");
      cargarEspecialistas();
    }
  };

  // Preparar formulario con datos del especialista a editar
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

  // Cancelar edición y limpiar formulario
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

  // Actualizar valores del formulario al escribir
  const actualizarFormulario = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  // Guardar cambios en especialista
  const guardarCambios = async (id) => {
    const dataToSend = {
      especialidad: formulario.especialidad,
      descripcion: formulario.descripcion,
    };

    // Si se cambia el usuario, solo enviar el nuevo correo
    if (cambiarUsuario) {
      dataToSend.usuario_email = formulario.usuario_email;
    } else {
      // Si no se cambia usuario, actualizar datos del usuario actual
      dataToSend.username = formulario.username;
      dataToSend.nombre = formulario.nombre;
      dataToSend.apellido = formulario.apellido;
      dataToSend.correo = formulario.correo;
      dataToSend.telefono = formulario.telefono;
    }
    
    // Enviar actualización a la API
    const response = await putData("especialistas/especialistas/" + id + "/", dataToSend);
    
    // Si todo sale bien, recargar lista y salir de edición
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
          // Si está en edición, mostrar formulario
          editando === esp.id ? (
            <div key={esp.id} className="bloque">
              <h4>Editando Especialista</h4>

              {cambiarUsuario ? (
                // Caso: cambiar usuario asociado
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
                // Caso: editar datos del usuario actual
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

              {/* Selección de especialidad */}
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

              {/* Campo de descripción */}
              <textarea
                name="descripcion"
                value={formulario.descripcion}
                onChange={actualizarFormulario}
                placeholder="Descripción"
                rows={3}
              />

              {/* Botones de acción */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => guardarCambios(esp.id)}>Guardar</button>
                <button onClick={cancelarEdicion}>Cancelar</button>
              </div>
            </div>
          ) : (
            // Vista normal del especialista
            <div key={esp.id} className="bloque">
              <h4>{esp.nombre_completo}</h4>
              <p><strong>Usuario:</strong> {esp.username}</p>
              <p><strong>Especialidad:</strong> {esp.especialidad}</p>
              <p><strong>Correo:</strong> {esp.correo}</p>
              <p><strong>Teléfono:</strong> {esp.telefono}</p>
              <p>{esp.descripcion}</p>

              {/* Botones para editar o eliminar */}
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
