import React, { useEffect, useState } from "react";
import "../styles/VerHorario.css";
const VerHorario = () => {
  const [horarios, setHorarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const usuarioId = localStorage.getItem("usuarioId");

  const obtenerHorarios = async () => {
    try {
      const resp = await fetch(
        `http://127.0.0.1:8000/horarios/horarios/usuario/${usuarioId}/`
      );
      const data = await resp.json();
      setHorarios(data);
    } catch (error) {
      console.error("Error cargando horarios:", error);
    }
  };

  const actualizarHorario = async (id, horarioActualizado) => {
    try {
      const resp = await fetch(
        `http://127.0.0.1:8000/horarios/horariosdetalle/${id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(horarioActualizado),
        }
      );
      const data = await resp.json();
      if (!data.fecha) {
        alert("Error al actualizar");
        return;
      }
      setEditando(null);
      obtenerHorarios();
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const eliminarHorario = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este horario?")) return;
    try {
      await fetch(`http://127.0.0.1:8000/horarios/horariosdetalle/${id}/`, {
        method: "DELETE",
      });
      obtenerHorarios();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  useEffect(() => {
    obtenerHorarios();
  }, []);

  return (
    <div className="ver-horario-container">
      <h2>Mis Horarios</h2>
      {horarios.length === 0 ? (
        <p className="no-horarios">No tienes horarios registrados.</p>
      ) : (
        <div className="horarios-seleccionados-container">
          <h3>Horarios Seleccionados ({horarios.length})</h3>
          {horarios.map((h) => (
            <div className="horario-item" key={h.id}>
              <div className="info">
                {editando === h.id ? (
                  <>
                    <input
                      type="date"
                      defaultValue={h.fecha}
                      onChange={(e) => (h.fecha = e.target.value)}
                    />
                    <input
                      type="time"
                      defaultValue={h.hora_inicio}
                      onChange={(e) => (h.hora_inicio = e.target.value)}
                    />
                    <input
                      type="time"
                      defaultValue={h.hora_fin}
                      onChange={(e) => (h.hora_fin = e.target.value)}
                    />
                  </>
                ) : (
                  <>
                    <strong>{h.fecha}</strong> — {h.hora_inicio} a {h.hora_fin}
                  </>
                )}
              </div>
              <div className="acciones">
                {editando === h.id ? (
                  <>
                    <button
                      className="btn guardar"
                      onClick={() => actualizarHorario(h.id, h)}
                    >
                      Guardar
                    </button>
                    <button
                      className="btn cancelar"
                      onClick={() => setEditando(null)}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn editar"
                      onClick={() => setEditando(h.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn eliminar"
                      onClick={() => eliminarHorario(h.id)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          <div className="horarios-botones">
            <button className="btn-guardar">Guardar Horarios</button>
            <button className="btn-limpiar">Limpiar Todo</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerHorario;
