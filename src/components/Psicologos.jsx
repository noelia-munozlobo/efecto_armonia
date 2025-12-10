import React, { useState, useEffect } from 'react';
import '../styles/Psicologos.css';
import { getData } from '../services/fetch';

const Psicologos = () => {
  // Estado para lista de especialistas obtenidos desde la API
  const [especialistas, setEspecialistas] = useState([]);
  // Estado para filtro de especialidad (por defecto "todos")
  const [filtro, setFiltro] = useState("todos");
  // Estado para mostrar indicador de carga
  const [loading, setLoading] = useState(true);

  // Al montar el componente, cargar especialistas
  useEffect(() => {
    const fetchEspecialistas = async () => {
      setLoading(true);
      // Petición GET al backend
      const data = await getData("especialistas/especialistas");
      // Guardar especialistas en estado
      setEspecialistas(data || []);
      setLoading(false);
    };
    fetchEspecialistas();
  }, []);

  // Función para filtrar especialistas según especialidad seleccionada
  const filtrarEspecialistas = () => {
    if (filtro === "todos") return especialistas;
    return especialistas.filter((e) => e.especialidad === filtro);
  };

  // Mostrar mensaje de carga mientras se obtienen datos
  if (loading) {
    return <p className="loading">Cargando especialistas...</p>;
  }

  return (
    <div className="psicologos-container">
      {/* Barra lateral con filtro */}
      <aside className="filtro">
        <h3>Filtrar por especialidad</h3>
        <select onChange={(e) => setFiltro(e.target.value)}>
          <option value="todos">Todos</option>
          <option value="Psicología Clínica">Psicología Clínica</option>
          <option value="Psicología Organizacional">Psicología Organizacional</option>
          <option value="Neuropsicología">Neuropsicología</option>
          <option value="Psicopedagogía">Psicopedagogía</option>
        </select>
      </aside>

      {/* Lista de especialistas */}
      <section className="lista-psicologos">
        <h2>Especialistas registrados</h2>
        <div className="bloques">
          {filtrarEspecialistas().length > 0 ? (
            // Mostrar especialistas filtrados
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
            // Mensaje si no hay resultados
            <p className="no-resultados">No hay especialistas para esta categoría.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Psicologos;
