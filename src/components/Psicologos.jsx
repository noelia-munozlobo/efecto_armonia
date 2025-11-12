import React, { useState, useEffect } from 'react';
import '../styles/Psicologos.css';
import { getData } from '../services/fetch';

const Psicologos = () => {
  const [especialistas, setEspecialistas] = useState([]);
  const [filtro, setFiltro] = useState('todos');

  useEffect(() => {
    const fetchEspecialistas = async () => {
      const data = await getData('especialistas');
      setEspecialistas(data || []);
    };
    fetchEspecialistas();
  }, []);

  const filtrarEspecialistas = () => {
    return filtro === 'todos'
      ? especialistas
      : especialistas.filter(e => e.especialidad === filtro);
  };

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
          {filtrarEspecialistas().map((e) => (
            <div key={e.id} className="bloque">
              <h4>{e.nombre}</h4>
              <p><strong>Especialidad:</strong> {e.especialidad}</p>
              <p><strong>Teléfono:</strong> {e.telefono}</p>
              <p><strong>Correo:</strong> {e.correo}</p>
              <p className="descripcion">{e.descripcion}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Psicologos;

