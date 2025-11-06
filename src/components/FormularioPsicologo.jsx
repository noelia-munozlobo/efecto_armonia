import { useState } from "react";
import '../styles/FormularioPsicologo.css';
import { enviarRecurso } from "../services/fetch";

const FormularioPsicologo = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidad, setEspecialidad] = useState('Clínica');
  const [descripcion, setDescripcion] = useState('');

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    const nuevoEspecialista = {
      nombre,
      correo,
      telefono,
      especialidad,
      descripcion,
    };

    try {
      const respuesta = await enviarRecurso("especialistas", nuevoEspecialista);
      setNombre('');
      setCorreo('');
      setTelefono('');
      setEspecialidad('Clínica');
      setDescripcion('');
      alert("El especialista fue registrado");
    } catch (error) {
      console.error("Error al registrar el especialista:", error);
    }
  };

  return (
    <div className="formulario-psicologo">
      <h2>Registrar Psicólogo Especialista</h2>
      <form onSubmit={enviarFormulario}>
        <label htmlFor="nombre">Nombre completo</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="correo">Correo electrónico</label>
        <input
          type="email"
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label htmlFor="telefono">Teléfono</label>
        <input
          type="tel"
          id="telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
        />

        <label htmlFor="especialidad">Especialidad</label>
        <select
          id="especialidad"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          required
        >
          <option value="Clínica">Clínica</option>
          <option value="Educativa">Educativa</option>
          <option value="Organizacional">Organizacional</option>
          <option value="Social">Social</option>
          <option value="Infantojuvenil">Infantojuvenil</option>
        </select>

        <label htmlFor="descripcion">Descripción / Enfoque</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="4"
          required
        />

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default FormularioPsicologo;
