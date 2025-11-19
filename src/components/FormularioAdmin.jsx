import { useState, useEffect } from "react";
import "../styles/FormularioAdmin.css";
import { enviarRecurso } from "../services/fetch";

const FormularioAdmin = () => {
  const [tipo, setTipo] = useState("charla");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [usuario, setUsuario] = useState("");
  const [imagen, setImagen] = useState(null);

  const [usuarios, setUsuarios] = useState([]);

  // Cargar lista de especialistas
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const resp = await fetch("http://127.0.0.1:8000/usuarios/usuarios/rol/especialista/");
        const data = await resp.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    };

    cargarUsuarios();
  }, []);

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    const formData = new FormData();
    formData.append("tipo", tipo);
    formData.append("nombre_recurso", nombre);
    formData.append("descripcion", descripcion);
    formData.append("usuario", usuario);

    if (imagen) {
      formData.append("imagen_recurso", imagen);
    }

    try {
      await enviarRecurso("/recursos/crear-recurso/", formData, true);

      setTipo("charla");
      setNombre("");
      setDescripcion("");
      setUsuario("");
      setImagen(null);

      alert("El recurso fue agregado exitosamente");
    } catch (error) {
      console.error("Error al enviar el recurso:", error);
    }
  };

  return (
    <div className="admin-form-container">
  <h2 className="admin-form-title">Agregar recurso</h2>

  <form
    onSubmit={enviarFormulario}
    className="admin-form"
    encType="multipart/form-data"
  >
    <div className="admin-form-group">
      <label className="admin-form-label">Nombre del Recurso</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="admin-form-input"
      />
    </div>

    <div className="admin-form-group">
      <label className="admin-form-label">Tipo</label>
      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
        required
        className="admin-form-input"
      >
        <option value="charla">Charla</option>
        <option value="taller">Taller</option>
        <option value="articulo">Artículo</option>
      </select>
    </div>

    <div className="admin-form-group">
      <label className="admin-form-label">Descripción</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
        rows="4"
        className="admin-form-input"
      ></textarea>
    </div>

    <div className="admin-form-group">
      <label className="admin-form-label">Usuario Autor</label>
      <select
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
        className="admin-form-input"
      >
        <option value="">Seleccione un especialista</option>
        {usuarios.map((u) => (
          <option key={u.id} value={u.id}>
            {u.first_name} {u.last_name1}
          </option>
        ))}
      </select>
    </div>

    <div className="admin-form-group">
      <label className="admin-form-label">Imagen del Recurso</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagen(e.target.files[0])}
        className="admin-form-input"
      />
    </div>

    {imagen && (
      <div className="admin-card-preview">
        <img src={URL.createObjectURL(imagen)} alt="Vista previa del recurso" />
        <h4>{nombre || "Título del recurso"}</h4>
        <p>Tipo: {tipo}</p>
        <p>{descripcion || "Descripción breve del recurso"}</p>
      </div>
    )}

    <button type="submit" className="admin-form-button">
      Guardar
    </button>
  </form>
</div>

  );
};

export default FormularioAdmin;
