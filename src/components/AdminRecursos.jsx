import React, { useEffect, useState } from "react";
import { getData, deleteData, putData, obtenerMentorias } from "../services/fetch";
import "../styles/AdminRecursos.css";

const AdminRecursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [mentorías, setMentorías] = useState([]); 
  const [editando, setEditando] = useState(null);
  const [formulario, setFormulario] = useState({ nombre: "", descripcion: "", tipo: "" });

  useEffect(() => {
    cargarRecursos();
    cargarMentorias();
  }, []);

  const cargarRecursos = async () => {
    const data = await getData("recursos");
    setRecursos(data || []);
  };

  const cargarMentorias = async () => {
    const data = await obtenerMentorias();
    setMentorías(data || []);
  };

  const eliminarRecurso = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este recurso?")) {
      await deleteData("recursos/" + id);
      cargarRecursos();
    }
  };

  const editarRecurso = (recurso) => {
    setEditando(recurso.id);
    setFormulario({
      nombre: recurso.nombre || "",
      descripcion: recurso.descripcion || "",
      tipo: recurso.tipo || "curso",
    });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setFormulario({ nombre: "", descripcion: "", tipo: "" });
  };

  const actualizarFormulario = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const guardarCambios = async (id) => {
    await putData("recursos/" + id, formulario);
    setEditando(null);
    cargarRecursos();
  };

  return (
    <div className="lista-recursos">
      <h2>Recursos Publicados</h2>
      <div className="bloques">
        {recursos.map((r) =>
          editando === r.id ? (
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
            <div key={r.id} className="bloque">
              <h4>{r.nombre || r.titulo}</h4>
              <p>Tipo: {r.tipo}</p>
              <p>{r.descripcion}</p>
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