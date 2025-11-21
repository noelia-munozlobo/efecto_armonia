import { useState, useEffect } from "react";
import "../styles/FormularioPsicologo.css";
import { enviarRecurso, getData } from "../services/fetch";

const FormularioPsicologo = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [correo, setCorreo] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [especialidad, setEspecialidad] = useState("Psicología Clínica");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    const cargarUsuarios = async () => {
      const resultado = await getData("usuarios/usuarios/rol/cliente");
      setUsuarios(resultado);
    };
    cargarUsuarios();
  }, []);

  const enviarFormulario = async (evento) => {
    evento.preventDefault();

    if (!usuarioSeleccionado) {
      alert("Debe seleccionar un usuario válido.");
      return;
    }

    const nuevoEspecialista = {
      correo,
      especialidad,
      descripcion,
      nombre_completo: `${usuarioSeleccionado.first_name} ${usuarioSeleccionado.last_name}`,
      telefono: usuarioSeleccionado.phone,
    };

    try {
      const respuesta = await enviarRecurso(
        "especialistas/crear-especialista/",
        nuevoEspecialista
      );

      if (respuesta.error) {
        alert(respuesta.error);
        return;
      }
      
      setCorreo("");
      setUsuarioSeleccionado(null);
      setEspecialidad("Psicología Clínica");
      setDescripcion("");

      alert("Especialista registrado con éxito");
    } catch (error) {
      console.error("Error al registrar el especialista:", error);
    }
  };

  return (
    <div className="formulario-psicologo">
      <h2>Registrar Psicólogo Especialista</h2>

      <form onSubmit={enviarFormulario}>
        <label htmlFor="correo">Seleccione el correo del usuario</label>

        <select
          id="correo"
          value={correo}
          onChange={(e) => {
            const valor = e.target.value;
            setCorreo(valor);

            const user = usuarios.find((u) => u.email === valor);
            setUsuarioSeleccionado(user || null);
          }}
          required
        >
          <option value="">Seleccione un usuario</option>

          {usuarios.map((u) => (
            <option key={u.id} value={u.email}>
              {u.email} — {u.first_name} {u.last_name1}
            </option>
          ))}
        </select>

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
