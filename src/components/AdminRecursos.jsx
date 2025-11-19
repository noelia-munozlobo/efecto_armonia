import React, { useEffect, useState } from "react";
import { getData, deleteData, putData, obtenerMentorias } from "../services/fetch";
import "../styles/AdminRecursos.css";

const AdminRecursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [mentorías, setMentorías] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formulario, setFormulario] = useState({ nombre: "", descripcion: "", tipo: "", informacion: "" });

  // Carga inicial de recursos 
  useEffect(() => {
    cargarRecursos();
    cargarMentorias();
  }, []);

  // Obtiene los recursos del db.json
  const cargarRecursos = async () => {
    const data = await getData("recursos/crear-recurso");
    setRecursos(data || []);
  };

  // Obtiene las mentorías del db.json
  const cargarMentorias = async () => {
    const data = await obtenerMentorias();
    setMentorías(data || []);
  };

  // Elimina un recurso 
  const eliminarRecurso = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este recurso?")) {
      await deleteData("recursos/" + id);
      cargarRecursos(); // Recarga la lista actualizada
    }
  };

  // Activa el modo edición y carga los datos del recurso en el formulario
  const editarRecurso = (recurso) => {
    setEditando(recurso.id);
    setFormulario({
      nombre: recurso.nombre || "",
      descripcion: recurso.descripcion || "",
      tipo: recurso.tipo || "curso",
      informacion: recurso.informacion || ""
    });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setFormulario({ nombre: "", descripcion: "", tipo: "", informacion: "" });
  };

  // Actualiza el estado del formulario mientras se escribe
  const actualizarFormulario = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  // Guarda los cambios del recurso editado
  const guardarCambios = async (id) => {
    await putData("recursos/" + id, formulario);
    setEditando(null);
    cargarRecursos(); // Refresca la lista con los cambios
  };

  return (
    <div className="lista-recursos">
      <h2>Recursos Publicados</h2>
      <div className="bloques">
        {recursos.map((r) =>
          editando === r.id ? (
            // muestra formulario editable
            <div key={r.id} className="bloque">
              <input
                name="nombre"
                value={formulario.nombre}
                onChange={actualizarFormulario}
                placeholder="Nombre"
              />
              <textarea
                name="descripcion"
                value={formulario.descripcion}
                onChange={actualizarFormulario}
                placeholder="Descripción"
                rows={2}
              />
              <textarea
                name="informacion"
                value={formulario.informacion}
                onChange={actualizarFormulario}
                placeholder="Información Adicional"
                rows={2}
              />
              <select
                name="tipo"
                value={formulario.tipo}
                onChange={actualizarFormulario}
                style={{ marginBottom: "0.5rem" }}
              >
                <option value="curso">Curso</option>
                <option value="charla">Charla</option>
                <option value="recurso">Recurso</option>
              </select>
              <button onClick={() => guardarCambios(r.id)}>Guardar</button>
              <button onClick={cancelarEdicion}>Cancelar</button>
            </div>

          ) : (
            // muestra recurso  de editar y eliminar con botones de acción
            <div key={r.id} className="bloque">
              <h4>{r.nombre || r.titulo}</h4>
              <p>Tipo: {r.tipo}</p>
              <p>{r.descripcion}</p>
              <p>Información Adicional: {r.informacion}</p>
              <button onClick={() => editarRecurso(r)}>Editar</button>
              <button onClick={() => eliminarRecurso(r.id)}>Eliminar</button>
            </div>
          )
        )}
      </div>

      <div className="lista-mentorias" style={{ marginTop: "2rem" }}>
        <h2>Mentorías Solicitadas</h2>
        {mentorías.length > 0 ? (
          <ul>
            {mentorías.map((m, idx) => (
              <li key={idx}>
                <strong>{m.nombreUsuario}</strong> - {m.fecha} <br />
                {m.texto}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay mentorías solicitadas.</p>
        )}
      </div>
    </div>
  );
};

export default AdminRecursos;
