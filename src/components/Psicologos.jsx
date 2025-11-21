import React, { useState, useEffect } from 'react';
import '../styles/Psicologos.css';
import { getData } from '../services/fetch';

const Psicologos = () => {
  const [especialistas, setEspecialistas] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchEspecialistas = async () => {
    setLoading(true);
    const data = await getData("especialistas/especialistas");
    setEspecialistas(data || []);
    setLoading(false);
  };
  fetchEspecialistas();
}, []);

  const filtrarEspecialistas = () => {
    if (filtro === "todos") return especialistas;
    return especialistas.filter((e) => e.especialidad === filtro);
  };

  if (loading) {
    return <p className="loading">Cargando especialistas...</p>;
  }

  return (
    <div className="psicologos-container">
      <aside className="filtro">
        <h3>Filtrar por especialidad</h3>
        <select onChange={(e) => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="Psicologia Infantil">Psicología Infantil</option>
          <option value="Psicologia Clínica">Psicología Clínica</option>
          <option value="Psicologia Educativa">Psicología Educativa</option>
        </select>
      </aside>

      <section className="lista-psicologos">
        <h2>Especialistas registrados</h2>
        <div className="bloques">
          {filtrarEspecialistas().length > 0 ? (
            filtrarEspecialistas().map((e) => (
              <div key={e.id} className="bloque">
                <h4>{e.nombre_completo}</h4>
                <p><strong>Especialidad:</strong> {e.especialidad}</p>
                <p><strong>Teléfono:</strong> {e.telefono}</p>
                <p><strong>Correo:</strong> {e.correo}</p>
                <p className="descripcion">{e.descripcion}</p>
              </div>
            ))
          ) : (
            <p className="no-resultados">No hay especialistas para esta categoría.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Psicologos;
