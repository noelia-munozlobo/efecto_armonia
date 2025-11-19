import React, { useState, useEffect } from 'react';
import '../styles/Recursos.css';
import { getData, postData } from '../services/fetch';


const Recursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [orden, setOrden] = useState('asc');
  const [alerta, setAlerta] = useState(false);
  const [data, setData] = useState([]);
  // Carga los recursos
  useEffect(() => {
    const fetchRecursos = async () => {
      const info = await getData('recursos/crear-recurso');
      setRecursos(info || []);
      setData(info || []);
    };
    fetchRecursos();
  }, []);
  // Filtra y ordena los recursos
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
    {/* Filtro a la izquierda */}
    <aside className="recursos-filtro">
      <h3>Filtrar por</h3>
      <select onChange={(e) => setFiltro(e.target.value)}>
        <option value="todos">Todos</option>
        <option value="curso">Cursos</option>
        <option value="charla">Charlas</option>
        <option value="recurso">Recursos</option>
      </select>
    </aside>

    {/* Contenido a la derecha */}
    <section className="recursos-contenido">
      <h2 className="recursos-titulo">Recursos disponibles</h2>

      {alerta && (
        <div className="recursos-alerta">¡Te has suscrito correctamente!</div>
      )}

      {data.length === 0 ? (
        <h3 className="recursos-vacio">No hay recursos disponibles</h3>
      ) : (
        <div className="recursos-bloques">
          {filtrarRecursos().map((r, index) => {
            const uniqueId = `${r.id}-${index}-${r.nombre || r.titulo}`;
            return (
              <div key={uniqueId} className="recursos-bloque">
                <h4 className="recursos-subtitulo">{r.nombre || r.titulo}</h4>
                <p className="recursos-tipo">Tipo: {r.tipo}</p>
                <p className="recursos-descripcion">{r.descripcion}</p>
                <button
                  className="recursos-boton"
                  onClick={() => localStorage.setItem("recurso_unico", uniqueId)}
                >
                  Ver Más
                </button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  </div>
</div>

  )}   
 export default Recursos