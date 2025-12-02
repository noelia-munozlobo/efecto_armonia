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
        <table className="tabla-horarios">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {horarios.map((h) => (
              <tr key={h.id}>
                <td>
                  {editando === h.id ? (
                    <input
                      type="date"
                      defaultValue={h.fecha}
                      onChange={(e) =>
                        (h.fecha = e.target.value)
                      }
                    />
                  ) : (
                    h.fecha
                  )}
                </td>
                <td>
                  {editando === h.id ? (
                    <input
                      type="time"
                      defaultValue={h.hora_inicio}
                      onChange={(e) =>
                        (h.hora_inicio = e.target.value)
                      }
                    />
                  ) : (
                    h.hora_inicio
                  )}
                </td>
                <td>
                  {editando === h.id ? (
                    <input
                      type="time"
                      defaultValue={h.hora_fin}
                      onChange={(e) =>
                        (h.hora_fin = e.target.value)
                      }
                    />
                  ) : (
                    h.hora_fin
                  )}
                </td>
                <td className="acciones">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default VerHorario;