import React, { useEffect, useState } from "react";
import { getData } from "../services/fetch";

const MentoríasAprobadas = () => {
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

  if (loading) return <p>Cargando mentorías...</p>;

  return (
    <div className="mentorías-container">
      <h2>Mis Mentorías Aprobadas</h2>

      {mentorías.length === 0 ? (
        <p>No tienes mentorías aprobadas aún.</p>
      ) : (
        mentorías.map((m) => (
          <div className="mentoría-card" key={m.id}>
            <h3>Se aprobaron las mentorias que solicitaste:</h3>

            <p><strong>Fecha:</strong> {m.fecha}</p>
            <p><strong>Hora:</strong> {m.hora_inicio} - {m.hora_fin}</p>

            {m.servicio && (
              <p><strong>Servicio:</strong> {m.servicio}</p>
            )}

            <p className={`estado ${m.estado.toLowerCase()}`}>
              {m.estado}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default MentoríasAprobadas;
