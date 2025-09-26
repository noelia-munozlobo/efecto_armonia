import React from 'react';
import '../styles/Destacados.css';

const Destacados = () => {
  const cursos = [
    {
      id: 1,
      titulo: "Autoestima",
      descripcion: "Fortalece tu valor personal.",
      imagen: "/src/assets/autoestima.png"
    },
    {
      id: 2,
      titulo: "Mindfulness",
      descripcion: "Aprende a vivir el presente.",
      imagen: "/src/assets/mindfulness.webp"
    },
    {
      id: 3,
      titulo: "Arteterapia",
      descripcion: "Aprende a plasmar tus emociones en papel a través del arte.",
      imagen: "/src/assets/arteterapia.jpg"
    }
  ];

  return (
    <section className="destacados">
      <h2>Cursos destacados</h2>
      <div className="tarjetas">
        {cursos.map(curso => (
          <div
            key={curso.id}
            className="tarjeta"
            style={{
              backgroundImage: `url(${curso.imagen})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="contenido">
              <h3>{curso.titulo}</h3>
              <p>{curso.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Destacados;
