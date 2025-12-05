import React, { useState, useEffect } from 'react';
import '../styles/Recursos.css';
import { getData } from '../services/fetch';
import { useNavigate } from "react-router-dom";

const Recursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [orden, setOrden] = useState('asc');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecursos = async () => {
      const info = await getData('recursos/crear-recurso');
      setRecursos(info || []);
      setData(info || []);
    };
    fetchRecursos();
  }, []);

  const filtrarRecursos = () => {
    let filtrados = filtro === 'todos'
      ? recursos
      : recursos.filter(r => r.tipo === filtro);

    return orden === 'asc'
      ? [...filtrados].sort((a, b) => (a.precio || 0) - (b.precio || 0))
      : [...filtrados].sort((a, b) => (b.precio || 0) - (a.precio || 0));
  };

  return (
    <div className="recursos-page">
      <div className="recursos-layout">

        <aside className="recursos-filtro">
          <h3>Filtrar por</h3>
          <select onChange={(e) => setFiltro(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="charla">Charlas</option>
            <option value="taller">Talleres</option>
            <option value="articulo">Artículos</option>
          </select>
        </aside>

        <section className="recursos-contenido">
          <h2 className="recursos-titulo">Recursos disponibles</h2>

          {data.length === 0 ? (
            <h3 className="recursos-vacio">No hay recursos disponibles</h3>
          ) : (
            <div className="recursos-bloques">
              {filtrarRecursos().map((r) => (
                <div key={r.id} className="recursos-bloque">
                  <img
                    src={r.imagen_recurso}
                    alt={r.nombre_recurso}
                    className="recursos-imagen"
                  />
                  <h4 className="recursos-subtitulo">{r.nombre_recurso}</h4>
                  <p className="recursos-tipo">Tipo: {r.tipo}</p>

                  <button
                    className="recursos-boton"
                    onClick={() => {
                      localStorage.setItem("recurso_unico", r.id);
                      navigate(`/recurso/${r.id}`);
                    }}
                  >
                    Ver Más
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Recursos;
