import React, { useEffect, useState } from "react";
import { getData, deleteData, obtenerMentorias, patchData } from "../services/fetch";
import "../styles/AdminRecursos.css";

const AdminRecursos = () => {
  // Estado para lista de recursos
  const [recursos, setRecursos] = useState([]);
  // Estado para lista de mentorías
  const [mentorías, setMentorías] = useState([]);
  // Estado para saber cuál recurso se está editando
  const [editando, setEditando] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [imagenURL, setImagenURL] = useState("");
  const cambiarDestacadoRecurso = async (idRecurso) => {
    const petcion = await patchData(`recursos/destacar-recurso/`, { id_recurso: idRecurso });
    console.log("Recurso destacado modificado:", petcion);

    cargarRecursos();
  }
  // Estado para manejar datos del formulario
  const [formulario, setFormulario] = useState({
    nombre_recurso: "",
    descripcion: "",
    tipo: "",
    imagen_recurso: imagenURL,
    imagen_url: imagenURL,
    usuario: "",   // <-- NUEVO
  });
  // Al montar el componente, cargar recursos y mentorías
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
  // Obtener mentorías desde la API
  const cargarMentorias = async () => {
    const data = await obtenerMentorias();
    setMentorías(data || []);
  };
  // Eliminar recurso con confirmación
  const eliminarRecurso = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este recurso?")) {
      await deleteData("recursos/recurso-crud/" + id + "/");
      cargarRecursos();
    }
  };
  // Preparar formulario con datos del recurso a editar
  const editarRecurso = (r) => {
    setEditando(r.id);
    setFormulario({
      nombre_recurso: r.nombre_recurso || "",
      descripcion: r.descripcion || "",
      tipo: r.tipo || "",
      imagen_recurso: null, // se limpia para nueva carga
      imagen_url: r.imagen_recurso, // mostrar imagen actual
      usuario: r.usuario || "",   // importante para mantener asociación
    });
  };
  // Cancelar edición y limpiar formulario
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
  // Actualizar valores del formulario al escribir
  const actualizarFormulario = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };
  // Actualizar imagen seleccionada
  const actualizarImagen = (e) => {
    setFormulario({
      ...formulario,
      imagen_recurso: e.target.files[0],
    });
  };
  // Guardar cambios en recurso
  const guardarCambios = async (id) => {
    const formData = new FormData();
    // Campos obligatorios
    formData.append("nombre_recurso", formulario.nombre_recurso);
    formData.append("descripcion", formulario.descripcion);
    formData.append("tipo", formulario.tipo);
    formData.append("usuario", formulario.usuario); // añadido
    // Si hay nueva imagen, se envía
    if (formulario.imagen_recurso instanceof File) {
      formData.append("imagen_recurso", formulario.imagen_recurso);
    }
    // Petición PUT a la API
    const respuesta = await fetch(`http://127.0.0.1:8000/recursos/recurso-crud/${id}/`, {
      method: "PUT",
      body: formData,
    });
    // Manejo de error si la respuesta no es correcta
    if (!respuesta.ok) {
      const errorData = await respuesta.text();
      console.log("ERROR DETALLADO:", errorData);
    }
    // Salir de edición y recargar lista
    setEditando(null);
    cargarRecursos();
  };
  return (
    <div className="lista-recursos">
      <h2>Recursos Publicados</h2>
      <div className="bloques">
        {recursos.map((r) =>
          editando === r.id ? (
            // Vista de edición
            <div key={r.id} className="bloque">
              <input
                name="nombre_recurso"
                value={formulario.nombre_recurso}
                onChange={actualizarFormulario}
                placeholder="Nombre del recurso"
              />
              {/* Selección de usuario asociado */}
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
              {/* Selección de tipo de recurso */}
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
              {/* Mostrar imagen actual */}
              {formulario.imagen_url && (
                <img
                  src={recursos.imagen_recurso}
                  alt="imagen recurso"
                  style={{ width: "120px", marginBottom: "10px", borderRadius: "6px" }}
                />
              )}
              {/* Botones de acción */}
              <button onClick={() => guardarCambios(r.id)}>Guardar</button>
              <button onClick={cancelarEdicion}>Cancelar</button>
            </div>
          ) : (
            // Vista normal del recurso
            <div key={r.id} className="bloque">
              <h4>{r.nombre_recurso}</h4>
              <p>Tipo: {r.tipo}</p>
              <p>{r.descripcion.slice(0, 200) + " ..."}</p>
              {/* Mostrar imagen si existe */}
              {r.imagen_recurso && (
                <img
                  src={r.imagen_recurso}
                  alt="imagen recurso"
                  style={{ width: "120px", borderRadius: "6px", marginTop: "10px" }}
                />
              )}
              {/* Botones para editar o eliminar */}
              <button onClick={() => editarRecurso(r)}>Editar</button>
              <button onClick={() => eliminarRecurso(r.id)}>Eliminar</button>

              <button
                onClick={async () => {
                  const resultado = await cambiarDestacadoRecurso(r.id);

                  if (resultado?.destacado === true) {
                    alert("Recurso modificado correctamente.");
                  }
                }}
              >
                {r.destacado ? "Quitar Destacado" : "Destacar"}
              </button>



            </div>
          )
        )}
      </div>
    </div>
  );
};
export default AdminRecursos;
