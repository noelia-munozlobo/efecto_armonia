import React from 'react';
import '../styles/Destacados.css';

//carrusel de productos destacados
const Destacados = () => {
  const cursos = [
    { id: 1, titulo: "Autoestima", descripcion: "Fortalece tu valor personal." },
    { id: 2, titulo: "Mindfulness", descripcion: "Aprende a vivir el presente." },
    { id: 3, titulo: "Arteterapia", descripcion: "Aprende a plasmar tus emociones en papel atraves del arte" }
  ];

  return (
    <section className="destacados">
      <h2>Cursos destacados</h2>
      <div className="tarjetas">
        {cursos.map(curso => (
          <div key={curso.id} className="tarjeta">
            <h3>{curso.titulo}</h3>
            <p>{curso.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Destacados;

