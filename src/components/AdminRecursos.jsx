import React, { useEffect, useState } from "react";
import { getData, deleteData, obtenerMentorias } from "../services/fetch";
import "../styles/AdminRecursos.css";

const AdminRecursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [mentorías, setMentorías] = useState([]);
  const [editando, setEditando] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  const [formulario, setFormulario] = useState({
    nombre_recurso: "",
    descripcion: "",
    tipo: "",
    imagen_recurso: null,
    imagen_url: null,
    usuario: "",   // <-- NUEVO
  });


  useEffect(() => {
    cargarRecursos();
    cargarMentorias();
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const data = await getData("usuarios/usuarios");
    setUsuarios(data || []);
  }

  const cargarRecursos = async () => {
    const data = await getData("recursos/crear-recurso");
    setRecursos(data || []);
  };

  const cargarMentorias = async () => {
    const data = await obtenerMentorias();
    setMentorías(data || []);
  };

  const eliminarRecurso = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este recurso?")) {
      await deleteData("recursos/recurso-crud/" + id + "/");
      cargarRecursos();
    }
  };

  const editarRecurso = (r) => {
    setEditando(r.id);
    setFormulario({
      nombre_recurso: r.nombre_recurso || "",
      descripcion: r.descripcion || "",
      tipo: r.tipo || "",
      imagen_recurso: null,
      imagen_url: r.imagen_recurso,
      usuario: r.usuario || "",   // <-- IMPORTANTE
    });

  };

  const cancelarEdicion = () => {
    setEditando(null);
    setFormulario({
      nombre_recurso: "",
      descripcion: "",
      tipo: "",
      imagen_recurso: null,
      imagen_url: null,
    });
  };

  const actualizarFormulario = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const actualizarImagen = (e) => {
    setFormulario({
      ...formulario,
      imagen_recurso: e.target.files[0],
    });
  };

  const guardarCambios = async (id) => {
    const formData = new FormData();

    formData.append("nombre_recurso", formulario.nombre_recurso);
    formData.append("descripcion", formulario.descripcion);
    formData.append("tipo", formulario.tipo);
    formData.append("usuario", formulario.usuario); // <-- AÑADIDO

    if (formulario.imagen_recurso instanceof File) {
      formData.append("imagen_recurso", formulario.imagen_recurso);
    }

    const respuesta = await fetch(`http://127.0.0.1:8000/recursos/recurso-crud/${id}/`, {
      method: "PUT",
      body: formData,
    });

    if (!respuesta.ok) {
      const errorData = await respuesta.text();
      console.log("ERROR DETALLADO:", errorData);
    }

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
                name="nombre_recurso"
                value={formulario.nombre_recurso}
                onChange={actualizarFormulario}
                placeholder="Nombre del recurso"
              />

              <select
                name="usuario"
                value={formulario.usuario}
                onChange={actualizarFormulario}
              >
                <option value="">Seleccione usuario</option>
                {usuarios.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.username}
                  </option>
                ))}
              </select>


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
                <option value="">Seleccione tipo</option>
                <option value="charla">Charla</option>
                <option value="taller">Taller</option>
                <option value="articulo">Artículo</option>
              </select>

              {/* Imagen actual */}
              {formulario.imagen_url && (
                <img
                  src={recursos.imagen_recurso}
                  alt="imagen recurso"
                  style={{ width: "120px", marginBottom: "10px", borderRadius: "6px" }}
                />
              )}

              {/* Nueva imagen */}
              <input type="file" accept="image/*" onChange={actualizarImagen} />

              <button onClick={() => guardarCambios(r.id)}>Guardar</button>
              <button onClick={cancelarEdicion}>Cancelar</button>
            </div>
          ) : (
            <div key={r.id} className="bloque">
              <h4>{r.nombre_recurso}</h4>
              <p>Tipo: {r.tipo}</p>
              <p>{r.descripcion}</p>

              {r.imagen_recurso && (
                <img
                  src={r.imagen_recurso}
                  alt="imagen recurso"
                  style={{ width: "120px", borderRadius: "6px", marginTop: "10px" }}
                />
              )}

              <button onClick={() => editarRecurso(r)}>Editar</button>
              <button onClick={() => eliminarRecurso(r.id)}>Eliminar</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AdminRecursos;
