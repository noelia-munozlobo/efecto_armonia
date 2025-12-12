import React, { useEffect, useState } from "react";
import { getData } from "../services/fetch";
import "../styles/MentoriaAprobada.css";

const MentoriasAprobadas = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const usuarioId = usuario?.id;

  const [mentorías, setMentorías] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!usuarioId) return;

    const fetchMentorias = async () => {
      try {
        const data = await getData(`mentorias/usuario/${usuarioId}`);
        const aprobadas = data.filter((m) => m.estado === "aprobado");
        setMentorías(aprobadas);
      } catch (error) {
        console.error("Error cargando mentorías", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorias();
  }, [usuarioId]);

  if (loading) return <p className="loading">Cargando mentorías...</p>;

  return (
    <div className="mentorías-wrapper">
      <h2 className="titulo">Mis Mentorías Aprobadas</h2>

      {mentorías.length === 0 ? (
        <p className="sin-mentorías">No tienes mentorías aprobadas aún.</p>
      ) : (
        <div className="lista-mentorías">
          {mentorías.map((m) => (
            <div className="mentoría-card" key={m.id}>
              <h3 className="card-titulo">
                ¡Tu mentoría fue aprobada!
              </h3>

              <div className="mentoría-info">
                <p><strong>Fecha:</strong> {m.fecha}</p>
                <p><strong>Hora:</strong> {m.hora_inicio} - {m.hora_fin}</p>

                {m.servicio && (
                  <p><strong>Servicio:</strong> {m.servicio}</p>
                )}

                <span className={`estado estado-${m.estado.toLowerCase()}`}>
                  {m.estado}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentoriasAprobadas;
