import { useState } from "react";
import '../styles/FormularioAdmin.css';

const FormularioAdmin = ({ alAgregar }) => {
  const [tipo, setTipo] = useState('curso');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const enviarFormulario = (evento) => {
    evento.preventDefault();
    const nuevoRecurso = {
      id: Date.now(),
      tipo,
      nombre,
      descripcion,
    };
    alAgregar(nuevoRecurso);
    setTipo('curso');
    setNombre('');
    setDescripcion('');
  };

  return (
    <div className="formulario-admin">
      <h2>Agregar recurso</h2>
      <form onSubmit={enviarFormulario}>
        <label htmlFor="tipo">Tipo</label>
        <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} required>
          <option value="curso">Curso</option>
          <option value="charla">Charla</option>
          <option value="recurso">Recurso</option>
        </select>

        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="4"
          required
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default FormularioAdmin;
