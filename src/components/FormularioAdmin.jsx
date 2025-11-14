import { useState } from "react";
import '../styles/FormularioAdmin.css';
import { enviarRecurso } from "../services/fetch";

const FormularioAdmin = () => {
  const [tipo, setTipo] = useState('curso');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [informacion, setInformacion] = useState('');
  const [fecha, setFecha] = useState('');
  const [usuario, setUsuario] = useState('');

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    const nuevoRecurso = {
      tipo,
      fecha,
      nombre_recurso: nombre,
      descripcion,
      usuario,
      informacion
    };

    try {
      await enviarRecurso("/recursos/crear-recurso/", nuevoRecurso);
      setTipo('curso');
      setNombre('');
      setDescripcion('');
      setInformacion('');
      setFecha('');
      setUsuario('');
      alert("El recurso fue agregado");
    } catch (error) {
      console.error("Error al enviar el recurso:", error);
    }
  };

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-title">Agregar recurso</h2>

      <form onSubmit={enviarFormulario} className="admin-form">
        <div className="admin-form-group">
          <label htmlFor="nombre" className="admin-form-label">Nombre del Recurso</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="admin-form-input"
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="tipo" className="admin-form-label">Tipo</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            required
            className="admin-form-input"
          >
            <option value="curso">Curso</option>
            <option value="charla">Charla</option>
            <option value="recurso">Guía</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label htmlFor="fecha" className="admin-form-label">Fecha</label>
          <input
            type="date"
            id="fecha"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
            className="admin-form-input"
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="descripcion" className="admin-form-label">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="4"
            required
            className="admin-form-input"
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="usuario" className="admin-form-label">Usuario Autor</label>
          <input
            type="text"
            id="usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="admin-form-input"
          />
        </div>

        <button type="submit" className="admin-form-button">Guardar</button>
      </form>
    </div>
  );
};

export default FormularioAdmin;

