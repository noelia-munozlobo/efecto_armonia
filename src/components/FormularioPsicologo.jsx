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
      console.error('Error al registrar el especialista:', error);
      alert('No se pudo registrar el especialista');
    }
  };

  return (
   <div id="pagina-psicologo">
  <div id="psicologo-container">
    <h2 id="psicologo-titulo">Registrar Psicólogo Especialista</h2>

    <form id="psicologo-form" onSubmit={enviarFormulario}>

      <div className="psicologo-campo">
        <label htmlFor="psicologo-nombre">Nombre completo</label>
        <input
          type="text"
          id="psicologo-nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div className="psicologo-campo">
        <label htmlFor="psicologo-correo">Seleccione el correo del usuario</label>
        <select
          id="psicologo-correo"
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
      </div>

      <div className="psicologo-campo">
        <label htmlFor="psicologo-telefono">Teléfono</label>
        <input
          type="tel"
          id="psicologo-telefono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value.replace(/[^\d+ ]/g, ''))}
          required
          inputMode="tel"
          pattern="^[0-9+ ]{6,20}$"
          title="Ingresa entre 6 y 20 dígitos, puedes incluir + y espacios"
        />
      </div>

      <div className="psicologo-campo">
        <label htmlFor="psicologo-especialidad">Especialidad</label>
        <select
          id="psicologo-especialidad"
          value={especialidad}
          onChange={(e) => setEspecialidad(e.target.value)}
          required
        >
          <option value="Psicología Clínica">Psicología Clínica</option>
          <option value="Psicología Organizacional">Psicología Organizacional</option>
          <option value="Neuropsicología">Neuropsicología</option>
          <option value="Psicopedagogía">Psicopedagogía</option>
        </select>
      </div>

      <div className="psicologo-campo">
        <label htmlFor="psicologo-descripcion">Descripción / Enfoque</label>
        <textarea
          id="psicologo-descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          rows="4"
          required
        />
      </div>

      <button type="submit" id="psicologo-boton">Registrar</button>
    </form>
  </div>
</div>
  )};

export default FormularioPsicologo;
