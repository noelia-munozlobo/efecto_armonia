
import React, { useEffect, useState } from 'react';
import "../styles/InfoRecursos.css"
import { getData } from '../services/fetch';


function InfoRecursos() {
  const [infoRecurso,setInfoRecurso] = useState([])

  useEffect(()=>{
      async function traerInfo() {
        const peticion = await getData(`recursos/recurso/${localStorage.getItem("id_recurso")}`);
        setInfoRecurso(peticion[0]);
        console.log(peticion);
        
      }
      traerInfo();
  },[])

  return (
    <div className="info-container">
      <div className="charla-card">
        <div className="charla-header">
          <img src="https://b2472105.smushcdn.com/2472105/wp-content/uploads/2022/11/10-Poses-para-foto-de-Perfil-Profesional-Mujer-04-2022-1-819x1024.jpg?lossy=1&strip=1&webp=1"  className="charla-foto" />
          <div className="charla-info">
            <h1 className="charla-titulo">{infoRecurso.nombre_recurso} </h1>
            <h2 className="charla-nombre">Dra. Polo Cerrado</h2>
            <p className="charla-descripcion">
              {infoRecurso.descripcion}
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
