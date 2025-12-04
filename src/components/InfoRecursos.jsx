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
     
    </div>
  );
}

export default InfoRecursos;
