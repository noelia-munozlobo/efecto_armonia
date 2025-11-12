return (
  <div className="contenedor-suscritos">
    <h2>Lista de Suscripciones</h2>
    {suscritos.length > 0 ? (
      <ul className="lista-suscritos">
        {suscritos.map((s, idx) => (
          <li key={idx}>
            <strong>{s.nombre}</strong> - {s.email}
          </li>
        ))}
      </ul>
    ) : (
      <p className="sin-suscritos">No hay suscripciones registradas.</p>
    )}
  </div>
);

