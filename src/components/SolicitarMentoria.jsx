import React, { useState, useEffect } from "react";
import "../styles/SolicitarMentoria.css";

const SolicitarMentoria = () => {
  const [horarios, setHorarios] = useState([]);
  const [motivo, setMotivo] = useState("");
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
  const [loading, setLoading] = useState(false);

  const usuarioCliente = Number(localStorage.getItem("usuarioId"));

  const obtenerHorarios = async () => {
    try {
      const resp = await fetch("http://127.0.0.1:8000/horarios/horarios/");
      const data = await resp.json();
      setHorarios(data);
    } catch (error) {
      console.error("Error cargando horarios:", error);
    }
  };

  const solicitarMentoria = async () => {
    if (!motivo.trim()) {
      alert("Debes ingresar un motivo.");
      return;
    }

    if (!usuarioCliente) {
      alert("No se encontró el usuario. Por favor inicia sesión nuevamente.");
      return;
    }

    setLoading(true);

    try {
      const body = {
        motivo: motivo,
        usuario_cliente: usuarioCliente,
        horario: horarioSeleccionado.id,
      };

      console.log("Enviando al servidor:", body);

      const resp = await fetch(
        "http://127.0.0.1:8000/mentorias/crear-mentorias/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (resp.ok) {
        const data = await resp.json();
        console.log("Respuesta exitosa:", data);
        alert("Mentoría solicitada correctamente");
        setMotivo("");
        setHorarioSeleccionado(null);
        obtenerHorarios();
      } else {
        const errorData = await resp.json();
        console.error("Error del servidor:", errorData);
        alert(`Error al solicitar mentoría: ${JSON.stringify(errorData)}`);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al solicitar la mentoría. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerHorarios();
  }, []);

  return (
    <div className="contenedor-mentorias">
      <h2>Solicitar Mentoría</h2>

      {horarios.length === 0 ? (
        <p className="no-horarios">No hay horarios disponibles.</p>
      ) : (
        <table className="tabla-horarios">
          <thead>
            <tr>
              <th>Especialista</th>
              <th>Fecha</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {horarios.map((h) => (
              <tr key={h.id}>
                <td>{h.nombre_completo}</td>
                <td>{h.fecha}</td>
                <td>{h.hora_inicio}</td>
                <td>{h.hora_fin}</td>
                <td>
                  <button
                    className="btn solicitar"
                    onClick={() => setHorarioSeleccionado(h)}
                  >
                    Solicitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {horarioSeleccionado && (
        <div className="modal">
          <div className="modal-contenido">
            <h3>Solicitar mentoría</h3>

            <p>
              Para: <strong>{horarioSeleccionado.nombre_completo}</strong><br />
              Fecha: <strong>{horarioSeleccionado.fecha}</strong> <br />
              Hora: <strong>{horarioSeleccionado.hora_inicio} - {horarioSeleccionado.hora_fin}</strong>
            </p>

            <textarea
              placeholder="Motivo de la mentoría"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows="4"
            />

            <div className="acciones">
              <button 
                className="btn guardar" 
                onClick={solicitarMentoria}
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar solicitud"}
              </button>

              <button
                className="btn cancelar"
                onClick={() => {
                  setHorarioSeleccionado(null);
                  setMotivo("");
                }}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolicitarMentoria;
