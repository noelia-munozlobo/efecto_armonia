import { useState, useEffect } from "react";
import "../styles/FormularioPsicologo.css";
import { enviarRecurso, getData } from "../services/fetch";

const FormularioPsicologo = () => {
  // Estado para lista de usuarios cargados desde la API
  const [usuarios, setUsuarios] = useState([]);
  // Estado para correo seleccionado en el formulario
  const [correo, setCorreo] = useState("");
  // Estado para guardar el usuario seleccionado (objeto completo)
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  // Estado para especialidad del psicólogo
  const [especialidad, setEspecialidad] = useState("Psicología Clínica");
  // Estado para descripción del enfoque
  const [descripcion, setDescripcion] = useState("");

  // Al montar el componente, cargar usuarios con rol "cliente"
  useEffect(() => {
    const cargarUsuarios = async () => {
      const resultado = await getData("usuarios/usuarios/rol/cliente");
      setUsuarios(resultado);
    };
    cargarUsuarios();
  }, []);

  // Función para enviar formulario
  const enviarFormulario = async (evento) => {
    evento.preventDefault(); // prevenir recarga de página

    // Validación: debe seleccionarse un usuario válido
    if (!usuarioSeleccionado) {
      alert("Debe seleccionar un usuario válido.");
      return;
    }

    // Objeto con datos del nuevo especialista
    const nuevoEspecialista = {
      correo,
      especialidad,
      descripcion,
      nombre_completo: `${usuarioSeleccionado.first_name} ${usuarioSeleccionado.last_name1}`,
    };

    try {
      // Enviar datos al backend
      const respuesta = await enviarRecurso(
        "especialistas/crear-especialista/",
        nuevoEspecialista
      );

      // Validar si la API devolvió error
      if (respuesta.error) {
        alert(respuesta.error);
        return;
      }

      // Reiniciar estados del formulario
      setCorreo("");
      setUsuarioSeleccionado(null);
      setEspecialidad("Psicología Clínica");
      setDescripcion("");

      alert("Especialista registrado con éxito");
    } catch (error) {
      console.error("Error al registrar el especialista:", error);
      alert("No se pudo registrar el especialista");
    }
  };

  return (
    <div id="pagina-psicologo">
      <div id="psicologo-container">
        <h2 id="psicologo-titulo">Registrar Psicólogo Especialista</h2>

        <form id="psicologo-form" onSubmit={enviarFormulario}>

          {/* Selección de usuario por correo */}
          <div className="psicologo-campo">
            <label htmlFor="correo">Seleccione el correo del usuario</label>
            <select
              id="correo"
              value={correo}
              onChange={(e) => {
                const valor = e.target.value;
                setCorreo(valor);

                // Buscar usuario en la lista por correo
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
          </div>

          {/* Selección de especialidad */}
          <div className="psicologo-campo">
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
          </div>

          {/* Campo de descripción */}
          <div className="psicologo-campo">
            <label htmlFor="descripcion">Descripción / Enfoque</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows="4"
              required
            />
          </div>

          {/* Botón de envío */}
          <button id="psicologo-boton" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioPsicologo;

