
import React from 'react';
import "../styles/InfoRecursos.css"


function InfoRecursos() {
  return (
    <div className="info-container">
      <div className="charla-card">
        <div className="charla-header">
          <img src="https://b2472105.smushcdn.com/2472105/wp-content/uploads/2022/11/10-Poses-para-foto-de-Perfil-Profesional-Mujer-04-2022-1-819x1024.jpg?lossy=1&strip=1&webp=1"  className="charla-foto" />
          <div className="charla-info">
            <h1 className="charla-titulo">Etapas del duelo</h1>
            <h2 className="charla-nombre">Dra. Marianka Solís</h2>
            <p className="charla-descripcion">
              En esta charla abordaremos las cinco etapas del duelo desde una perspectiva emocional y psicológica.
              Exploraremos cómo se manifiestan en diferentes contextos, cómo acompañar a quienes las atraviesan
              y qué herramientas pueden ayudarnos a transitar el proceso con mayor conciencia y compasión.
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
