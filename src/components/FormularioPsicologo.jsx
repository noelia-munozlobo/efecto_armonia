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

    const nuevoEspecialista = { nombre, correo, telefono, especialidad, descripcion };

    try {
      await enviarRecurso('especialistas', nuevoEspecialista);
      setNombre('');
      setCorreo('');
      setTelefono('');
      setEspecialidad('Clínica');
      setDescripcion('');
      alert('El especialista fue registrado');
    } catch (error) {
      console.error('Error al registrar el especialista:', error);
      alert('No se pudo registrar el especialista');
    }
  };

  return (
    <div className="pagina-formulario">
      <div className="formulario-psicologo" role="region" aria-label="Formulario registro especialista">
        <h2>Registrar Psicólogo Especialista</h2>
        <form onSubmit={enviarFormulario}>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            autoComplete="name"
          />

          <label htmlFor="correo">Correo electrónico</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            autoComplete="email"
          />

          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value.replace(/[^\d+ ]/g, ''))}
            required
            inputMode="tel"
            pattern="^[0-9+ ]{6,20}$"
            title="Ingresa entre 6 y 20 dígitos, puedes incluir + y espacios"
          />

          <label htmlFor="especialidad">Especialidad</label>
          <select
            id="especialidad"
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
            required
          >
            <option value="Clínica">Psicología Clínica</option>
            <option value="Educativa">Psicología Educativa</option>
            <option value="Organizacional">Psicología Organizacional</option>
            <option value="Social">Psicología Social</option>
            <option value="Infantojuvenil">Psicología Infantil</option>
          </select>

          <label htmlFor="descripcion">Descripción / Enfoque</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="4"
            required
          />

          <button type="submit" className="btn-primary">Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default FormularioPsicologo;
