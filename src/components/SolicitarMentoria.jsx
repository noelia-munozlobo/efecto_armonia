import React, { useState, useEffect } from "react";

const SolicitarMentoria = () => {
  const [horarios, setHorarios] = useState([]);
  const [motivo, setMotivo] = useState("");
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

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

    try {
      const body = {
        motivo: motivo,
        fecha: horarioSeleccionado.fecha,
        hora_inicio: horarioSeleccionado.hora_inicio,
        hora_fin: horarioSeleccionado.hora_fin,
        usuario_especialista: horarioSeleccionado.usuario,
        usuario_cliente: usuarioCliente,
        horario: horarioSeleccionado.id,
      };

      const resp = await fetch(
        "http://127.0.0.1:8000/mentorias/crear-mentorias/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (resp.ok) {
        alert("Mentoría solicitada correctamente");
        setMotivo("");
        setHorarioSeleccionado(null);
      } else {
        alert("Error al solicitar mentoría.");
      }

    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    obtenerHorarios();
  }, []);

  return (
    <div className="contenedor-mentorias">
      <h2>Solicitar Mentoría</h2>

      {horarios.length === 0 ? (
        <p>No hay horarios disponibles.</p>
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
                    className="btn"
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
          />

          <div className="acciones">
            <button className="btn guardar" onClick={solicitarMentoria}>
              Enviar solicitud
            </button>

            <button
              className="btn cancelar"
              onClick={() => setHorarioSeleccionado(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolicitarMentoria;
