import React, { useState, useEffect } from "react";
import "../styles/MentoriasEspecialista.css";

const MentoriasEspecialista = () => {
  const [mentorias, setMentorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState("todas"); // todas, pendiente, aprobado, rechazado

  const usuarioId = localStorage.getItem("usuarioId");

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
        obtenerMentorias();
      } else {
        alert("Error al actualizar el estado");
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  const mentoriasFiltradas = mentorias.filter((m) => {
    if (filtro === "todas") return true;
    return m.estado === filtro;
  });

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

  useEffect(() => {
    obtenerMentorias();
  }, []);

  return (
    <div className="mentorias-especialista-container">
      <h2>Mis Solicitudes de Mentoría</h2>

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
                <p>
                  <strong>Fecha:</strong> {m.fecha}
                </p>
                <p>
                  <strong>Horario:</strong> {m.hora_inicio} - {m.hora_fin}
                </p>
                <p>
                  <strong>Motivo:</strong> {m.motivo}
                </p>
              </div>

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentoriasEspecialista;