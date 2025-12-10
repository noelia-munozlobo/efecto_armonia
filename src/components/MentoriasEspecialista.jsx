import React, { useState, useEffect } from "react";
import "../styles/MentoriasEspecialista.css";

const MentoriasEspecialista = () => {
  // Estado para lista de mentorías
  const [mentorias, setMentorias] = useState([]);
  // Estado para mostrar indicador de carga
  const [loading, setLoading] = useState(false);
  // Estado para filtro de mentorías (todas, pendiente, aprobado, rechazado)
  const [filtro, setFiltro] = useState("todas");

  // Obtener ID del especialista desde localStorage
  const usuarioId = localStorage.getItem("usuarioId");

  // Función para cargar mentorías del especialista
  const obtenerMentorias = async () => {
    setLoading(true);
    try {
      const resp = await fetch(
        `http://127.0.0.1:8000/mentorias/especialista/${usuarioId}/`
      );
      const data = await resp.json();
      setMentorias(data);
    } catch (error) {
      console.error("Error cargando mentorías:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para aprobar o rechazar mentoría
  const actualizarEstado = async (mentoriaId, nuevoEstado) => {
    try {
      const resp = await fetch(
        `http://127.0.0.1:8000/mentorias/mentorias/${mentoriaId}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estado: nuevoEstado }),
        }
      );

      if (resp.ok) {
        alert(`Mentoría ${nuevoEstado === "aprobado" ? "aprobada" : "rechazada"} correctamente`);
        obtenerMentorias(); // recargar lista
      } else {
        alert("Error al actualizar el estado");
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  // Función para devolver mentoría a estado pendiente
  const cambiarAPendiente = async (mentoriaId) => {
    if (!window.confirm("¿Deseas cambiar esta mentoría a estado pendiente para revisarla nuevamente?")) {
      return;
    }

    try {
      const resp = await fetch(
        `http://127.0.0.1:8000/mentorias/mentorias/${mentoriaId}/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estado: "pendiente" }),
        }
      );

      if (resp.ok) {
        alert("Mentoría cambiada a pendiente correctamente");
        obtenerMentorias();
      } else {
        alert("Error al cambiar el estado");
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  // Función para eliminar mentoría
  const eliminarMentoria = async (mentoriaId) => {
    if (!window.confirm("¿Estás seguro de eliminar esta mentoría? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const resp = await fetch(
        `http://127.0.0.1:8000/mentorias/mentorias/${mentoriaId}/`,
        {
          method: "DELETE",
        }
      );

      if (resp.ok) {
        alert("Mentoría eliminada correctamente");
        obtenerMentorias();
      } else {
        alert("Error al eliminar la mentoría");
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  // Filtrar mentorías según estado seleccionado
  const mentoriasFiltradas = mentorias.filter((m) => {
    if (filtro === "todas") return true;
    return m.estado === filtro;
  });

  // Asignar clase CSS según estado
  const obtenerClaseEstado = (estado) => {
    switch (estado) {
      case "pendiente":
        return "estado-pendiente";
      case "aprobado":
        return "estado-aprobado";
      case "rechazado":
        return "estado-rechazado";
      default:
        return "";
    }
  };

  // Al montar el componente, cargar mentorías
  useEffect(() => {
    obtenerMentorias();
  }, []);

  return (
    <div className="mentorias-especialista-container">
      <h2>Mis Solicitudes de Mentoría</h2>

      {/* Botones de filtro */}
      <div className="filtros">
        <button
          className={filtro === "todas" ? "filtro-activo" : ""}
          onClick={() => setFiltro("todas")}
        >
          Todas ({mentorias.length})
        </button>
        <button
          className={filtro === "pendiente" ? "filtro-activo" : ""}
          onClick={() => setFiltro("pendiente")}
        >
          Pendientes ({mentorias.filter((m) => m.estado === "pendiente").length})
        </button>
        <button
          className={filtro === "aprobado" ? "filtro-activo" : ""}
          onClick={() => setFiltro("aprobado")}
        >
          Aprobadas ({mentorias.filter((m) => m.estado === "aprobado").length})
        </button>
        <button
          className={filtro === "rechazado" ? "filtro-activo" : ""}
          onClick={() => setFiltro("rechazado")}
        >
          Rechazadas ({mentorias.filter((m) => m.estado === "rechazado").length})
        </button>
      </div>

      {/* Mostrar mentorías según estado de carga y filtro */}
      {loading ? (
        <p className="cargando">Cargando mentorías...</p>
      ) : mentoriasFiltradas.length === 0 ? (
        <p className="no-mentorias">
          No tienes mentorías {filtro !== "todas" ? filtro + "s" : ""}.
        </p>
      ) : (
        <div className="lista-mentorias">
          {mentoriasFiltradas.map((m) => (
            <div key={m.id} className="tarjeta-mentoria">
              <div className="mentoria-header">
                <h3>{m.nombre_cliente || "Cliente"}</h3>
                <span className={`estado ${obtenerClaseEstado(m.estado)}`}>
                  {m.estado.charAt(0).toUpperCase() + m.estado.slice(1)}
                </span>
              </div>

              <div className="mentoria-detalles">
                <p><strong>Fecha:</strong> {m.fecha}</p>
                <p><strong>Horario:</strong> {m.hora_inicio} - {m.hora_fin}</p>
                <p><strong>Motivo:</strong> {m.motivo}</p>
              </div>

              {/* Acciones según estado */}
              {m.estado === "pendiente" && (
                <div className="mentoria-acciones">
                  <button
                    className="btn-aprobar"
                    onClick={() => actualizarEstado(m.id, "aprobado")}
                  >
                    Aprobar
                  </button>
                  <button
                    className="btn-rechazar"
                    onClick={() => actualizarEstado(m.id, "rechazado")}
                  >
                    Rechazar
                  </button>
                </div>
              )}

              {(m.estado === "aprobado" || m.estado === "rechazado") && (
                <div className="mentoria-acciones">
                  <button
                    className="btn-editar"
                    onClick={() => cambiarAPendiente(m.id)}
                  >
                    Volver a Pendiente
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarMentoria(m.id)}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentoriasEspecialista;
