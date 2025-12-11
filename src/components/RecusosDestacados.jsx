// RecursosDestacados.jsx
import React, { useState, useEffect } from 'react';
import "../styles/RecusosDestacados.css"
import { getData } from '../services/fetch';
import { useNavigate } from "react-router-dom";

const RecursosDestacados = () => {
  const [recursos, setRecursos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestacados = async () => {
      const info = await getData('recursos/recursos-destacados');
      setRecursos(info || []);
    };
    fetchDestacados();
  }, []);

  return (
    <div className="recursos-destacados">
      <h2 className="recursos-destacados__titulo">Recursos Destacados</h2>
      
      {recursos.length === 0 ? (
        <h3 className="recursos-destacados__vacio">No hay recursos destacados</h3>
      ) : (
        <div className="recursos-destacados__grid">
          {recursos.map((r) => (
            <article key={r.id} className="recurso-card">
              <div className="recurso-card__imagen-wrapper">
                <img
                  src={r.imagen_recurso}
                  alt={r.nombre_recurso}
                  className="recurso-card__imagen"
                />
              </div>
              
              <div className="recurso-card__body">
                <h4 className="recurso-card__nombre">{r.nombre_recurso}</h4>
                <p className="recurso-card__tipo">Tipo: {r.tipo}</p>
                
                <button
                  className="recurso-card__btn"
                  onClick={() => {
                    localStorage.setItem("recurso_unico", r.id);
                    navigate(`/recurso/${r.id}`);
                  }}
                >
                  Ver Más
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecursosDestacados;