import React, { useState, useEffect } from 'react';
import '../styles/Recursos.css';
import { getData, postData } from '../services/fetch';

const Recursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [filtro, setFiltro] = useState('todos');
  const [orden, setOrden] = useState('asc');
  const [alerta, setAlerta] = useState(false); // Nuevo estado para la alerta

  useEffect(() => {
    const fetchRecursos = async () => {
      const data = await getData('recursos');
      setRecursos(data || []);
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

  async function seguirCurso(idCurso, nombreCurso) {
    const objCurso = {
      idUsuario: JSON.parse(localStorage.getItem("usuarios")).id,
      nombreUsuario: JSON.parse(localStorage.getItem("usuarios")).nombre,
      idCurso: idCurso,
      nombreCurso: nombreCurso
    }
    await postData('suscripciones', objCurso);
    setAlerta(true); // Mostrar alerta
    setTimeout(() => setAlerta(false), 2000); // Ocultar después de 2 segundos
  }

  return (
    <div className="recursos-container">
      <aside className="filtro">
        <h3>Filtrar por</h3>
        <select onChange={(e) => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="curso">Cursos</option>
          <option value="charla">Charlas</option>
          <option value="recurso">Recursos</option>
        </select>
      </aside>

      <section className="lista-recursos">
        <h2>Recursos disponibles</h2>
        {alerta && (
          <div className="alerta-suscrito" style={{ color: 'green', marginBottom: '10px' }}>
            ¡Te has suscrito correctamente!
          </div>
        )}
        <div className="bloques">
          {filtrarRecursos().map((r) => (
            <div key={r.id} className="bloque">
              <h4>{r.nombre || r.titulo}</h4>
              <p>Tipo: {r.tipo}</p>
              <p>{r.descripcion}</p>
              <button
                onClick={() => seguirCurso(r.id, r.nombre)}
              >Seguir</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Recursos;