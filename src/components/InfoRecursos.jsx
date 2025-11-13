
import React from 'react';
import "../styles/InfoRecursos.css"


function InfoRecursos() {
  return (
    <div className="info-container">
      <div className="charla-card">
        <div className="charla-header">
          <img src="/images/especialista.jpg" alt="Especialista" className="charla-foto" />
          <div className="charla-info">
            <h1 className="charla-titulo">Etapas del duelo</h1>
            <h2 className="charla-nombre">Dra. Mariana Solís</h2>
            <p className="charla-descripcion">
              En esta charla abordaremos las cinco etapas del duelo desde una perspectiva emocional y psicológica.
              Exploraremos cómo se manifiestan en diferentes contextos, cómo acompañar a quienes las atraviesan
              y qué herramientas pueden ayudarnos a transitar el proceso con mayor conciencia y compasión.
            </p>
          </div>
          <div className="charla-lateral">
            <p className="charla-fecha">🗓️ 25 de noviembre, 6:00 p.m.</p>
            <button className="btn-seguir">Seguir</button>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default InfoRecursos;
