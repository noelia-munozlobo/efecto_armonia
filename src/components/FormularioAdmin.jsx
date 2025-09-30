import { useState } from "react";
import '../styles/FormularioAdmin.css';
import { enviarRecurso } from "../services/fetch";


const FormularioAdmin = () => {
  const [tipo, setTipo] = useState('curso');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState(''); 

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    const nuevoRecurso = {
      tipo,
      nombre,
      descripcion,
    };

    try {
      const respuesta = await enviarRecurso("recursos", nuevoRecurso);
      setTipo('curso');
      setNombre('');
      setDescripcion('');
      setPrecio('');
      alert("El recurso fue agregado")
    } catch (error) {
      console.error("Error al enviar el recurso:", error);
    }
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