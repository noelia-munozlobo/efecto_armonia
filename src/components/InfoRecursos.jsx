import React, { useEffect, useState } from 'react';
import "../styles/InfoRecursos.css";
import { getData } from '../services/fetch';

function InfoRecursos({ id }) {
  const [infoRecurso, setInfoRecurso] = useState(null);

  useEffect(() => {
    async function traerInfo() {
      try {
        // Usa el id recibido como prop o desde localStorage
        const recursoId = id || localStorage.getItem("id_recurso");
        if (!recursoId) {
          console.error("No se encontró un id válido para el recurso");
          return;
        }

        const peticion = await getData(`recursos/recurso/${recursoId}/`);
        // Si la API devuelve un objeto directamente
        setInfoRecurso(peticion);
        console.log("Respuesta recurso:", peticion);
      } catch (error) {
        console.error("Error al traer recurso:", error);
      }
    }
    traerInfo();
  }, [id]);

  return (
    <div className="info-container">
      <div className="charla-card">
        <div className="charla-header">
          <img
            src="https://b2472105.smushcdn.com/2472105/wp-content/uploads/2022/11/10-Poses-para-foto-de-Perfil-Profesional-Mujer-04-2022-1-819x1024.jpg?lossy=1&strip=1&webp=1"
            alt="Foto recurso"
            className="charla-foto"
          />
          <div className="charla-info">
            <h1 className="charla-titulo">
              {infoRecurso ? infoRecurso.nombre_recurso : "Cargando..."}
            </h1>
            <h2 className="charla-nombre">Dra. Polo Cerrado</h2>
            <p className="charla-descripcion">
              {infoRecurso ? infoRecurso.descripcion : "Sin descripción disponible"}
            </p>
          </div>
          <div className="charla-lateral">
            <p className="charla-fecha">25 de noviembre, 6:00 p.m.</p>
            <button className="btn-seguir">Inscribirse</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoRecursos;
