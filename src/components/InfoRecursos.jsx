import React, { useEffect, useState } from 'react';
import "../styles/InfoRecursos.css";
import { getData } from '../services/fetch';
import { useParams } from "react-router-dom";

function InfoRecursos() {
  const { id } = useParams();
  const [infoRecurso, setInfoRecurso] = useState(null);

  useEffect(() => {
    async function traerInfo() {
      try {
        const recursoId = id || localStorage.getItem("recurso_unico");
        if (!recursoId) return;

        const peticion = await getData(`recursos/recurso/${recursoId}`);

        // La API devuelve un array, así que tomamos el primer elemento
        if (Array.isArray(peticion) && peticion.length > 0) {
          setInfoRecurso(peticion[0]);
        }

        console.log("Respuesta recurso:", peticion);
      } catch (error) {
        console.error("Error al traer recurso:", error);
      }
    }
    traerInfo();
  }, [id]);

  if (!infoRecurso) return <h3>Cargando información del recurso...</h3>;

  return (
    <div className="info-container">
      <div className="info-imagen">
        <img src={infoRecurso.imagen_recurso} alt="" />
      </div>
      <h2>{infoRecurso.nombre_recurso}</h2>

      <div className="info-detalles">
        <p><strong>Autor:</strong> {infoRecurso.nombre_usuario}</p>
        <p><strong>Fecha:</strong> {infoRecurso.fecha}</p>
        <p><strong>Tipo:</strong> {infoRecurso.tipo}</p>
      </div>
      <p><strong></strong> {infoRecurso.descripcion}</p>

    </div>
  );
}

export default InfoRecursos;
