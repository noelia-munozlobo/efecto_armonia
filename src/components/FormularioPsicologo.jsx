import { useState, useEffect } from "react";
import '../styles/FormularioPsicologo.css';
import { enviarRecurso, getData } from "../services/fetch";

const FormularioPsicologo = () => {

  const [usuarios, setUsuarios] = useState([]);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [especialidad, setEspecialidad] = useState('Psicología Clínica');
  const [descripcion, setDescripcion] = useState('');

  // 🔹 Cargar lista de usuarios al iniciar
  useEffect(() => {
    const cargarUsuarios = async () => {
      const resultado = await getData("usuarios/usuarios/rol/cliente");
      setUsuarios(resultado);
    };
    cargarUsuarios();
  }, []);

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    const nuevoEspecialista = {
      correo, // el backend usa este correo para ubicar al usuario
      nombre_completo: nombre,
      telefono,
      especialidad,
      descripcion
    };

    try {
      const respuesta = await enviarRecurso("especialistas/crear-especialista/", nuevoEspecialista);

      if (respuesta.error) {
        alert(respuesta.error);
        return;
      }

      setNombre('');
      setCorreo('');
      setTelefono('');
      setEspecialidad('Psicología Clínica');
      setDescripcion('');

      alert("Especialista registrado con éxito");

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

        <label htmlFor="correo">Seleccione el correo del usuario</label>
        <select
          id="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        >
          <option value="">Seleccione un usuario</option>

          {usuarios.map((u) => (
            <option key={u.id} value={u.email}>
              {u.email} — {u.first_name} {u.last_name1}
            </option>
          ))}
        </select>

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
          <option value="Psicología Clínica">Psicología Clínica</option>
          <option value="Psicología Organizacional">Psicología Organizacional</option>
          <option value="Neuropsicología">Neuropsicología</option>
          <option value="Psicopedagogía">Psicopedagogía</option>
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

