import React, { useEffect, useState } from "react";
import { getData, deleteData, putData } from "../services/fetch";
import "../styles/AdminRecursos.css";

const AdminEspecialistas = () => {
  const [especialistas, setEspecialistas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    correo: "",
    telefono: "",
    especialidad: "",
    descripcion: "",
  });

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
      correo: esp.correo || "",
      telefono: esp.telefono || "",
      especialidad: esp.especialidad || "",
      descripcion: esp.descripcion || "",
    });
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setFormulario({
      correo: "",
      telefono: "",
      especialidad: "",
      descripcion: "",
    });
  };

  const actualizarFormulario = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const guardarCambios = async (id) => {
    await putData("especialistas/especialistas/" + id + "/", formulario);
    setEditando(null);
    cargarEspecialistas();
  };

  return (
    <div className="lista-recursos">
      <h2>Especialistas Registrados</h2>

      <div className="bloques">
        {especialistas.map((esp) =>
          editando === esp.id ? (
            <div key={esp.id} className="bloque">
              <p><strong>{esp.nombre}</strong></p>

              <input
                name="correo"
                value={formulario.correo}
                onChange={actualizarFormulario}
                placeholder="Correo"
              />

              <input
                name="telefono"
                value={formulario.telefono}
                onChange={actualizarFormulario}
                placeholder="Teléfono"
              />

              <select
                name="especialidad"
                value={formulario.especialidad}
                onChange={actualizarFormulario}
              >
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
                rows={2}
              />

              <button onClick={() => guardarCambios(esp.id)}>Guardar</button>
              <button onClick={cancelarEdicion}>Cancelar</button>
            </div>
          ) : (
            <div key={esp.id} className="bloque">
              <h4>{esp.nombre_completo}</h4>
              <p><strong>Usuario: {esp.usuario}</strong></p>
              <p><strong>Especialidad:</strong> {esp.especialidad}</p>
              <p><strong>Correo:</strong> {esp.correo}</p>
              <p><strong>Teléfono:</strong> {esp.telefono}</p>
              <p>{esp.descripcion}</p>

              <button onClick={() => editarEspecialista(esp)}>Editar</button>
              <button onClick={() => eliminarEspecialista(esp.id)}>Eliminar</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminEspecialistas;

