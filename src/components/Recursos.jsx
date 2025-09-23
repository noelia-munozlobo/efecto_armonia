import React, { useState } from 'react';
import '../styles/Recursos.css';

// Datos simulados de recursos disponibles
const recursosData = [
  { id: 1, tipo: 'curso', titulo: 'Autoestima', precio: 20 },
  { id: 2, tipo: 'charla', titulo: 'Mindfulness', precio: 15 },
  { id: 3, tipo: 'manual', titulo: 'Guía emocional', precio: 10 },
  { id: 4, tipo: 'curso', titulo: 'Comunicación asertiva', precio: 25 },
  { id: 5, tipo: 'charla', titulo: 'Gestión del estrés', precio: 18 },
  { id: 6, tipo: 'manual', titulo: 'Primeros auxilios emocionales', precio: 12 },
];

const Recursos = () => {
  // Estado para filtrar por tipo (curso, charla, manual)
  const [filtro, setFiltro] = useState('todos');

  // Estado para ordenar por precio (ascendente o descendente)
  const [orden, setOrden] = useState('asc');

  // Función que filtra y ordena los recursos 
  const filtrarRecursos = () => {
    // Filtrar por tipo si se seleccionó algo distinto a "todos"
    let filtrados = filtro === 'todos'
      ? recursosData
      : recursosData.filter(r => r.tipo === filtro);

    // Ordenar por precio según el estado "orden"
    return orden === 'asc'
      ? filtrados.sort((a, b) => a.precio - b.precio)
      : filtrados.sort((a, b) => b.precio - a.precio);
  };

  return (
    <div className="recursos-container">
      <aside className="filtro">
        <h3>Filtrar por</h3>
        <select onChange={(e) => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="curso">Cursos</option>
          <option value="charla">Charlas</option>
          <option value="manual">Manuales</option>
        </select>

        <h3>Ordenar por</h3>
        <select onChange={(e) => setOrden(e.target.value)}>
          <option value="asc">Menor precio</option>
          <option value="desc">Mayor precio</option>
        </select>
      </aside>

      <section className="lista-recursos">
        <h2>Recursos disponibles</h2>

        <div className="bloques">
          {filtrarRecursos().map((r) => (
            <div key={r.id} className="bloque">
              <h4>{r.titulo}</h4>
              <p>Tipo: {r.tipo}</p>
              <p>Precio: ${r.precio}</p>
              <button>Ver más</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Recursos;
