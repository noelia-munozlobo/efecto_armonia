import React, { useEffect, useState } from 'react';
import { getData, postData } from "../services/fetch";
import '../styles/ComentariosRecursos.css';

function ComentariosRecursos({ recursoId }) {

  const [comentario, setComentario] = useState('');
  const [error, setError] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("usuarioId"));

  const cargarComentarios = async () => {
    try {
      const data = await getData(`comentarios/comentarios-recurso/${recursoId}`);
      setComentarios(data);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
    }
  };

  useEffect(() => {
    cargarComentarios();
  }, [recursoId]);

  const enviarComentario = async () => {
    if (!usuario) {
      setError("Debe iniciar sesión para comentar.");
      return;
    }

    if (!comentario.trim()) {
      setError("El comentario es obligatorio.");
      return;
    }

    const nuevo = {
      contenido: comentario,
      usuario: localStorage.getItem("usuarioId"),              // ← Corregido: usuario.id
      recursos: recursoId               // ← ID del recurso
    };

    console.log("Datos a enviar:", nuevo); // Para debugging

    try {
      await postData("comentarios/crear-comentario/", nuevo);
      setComentario('');
      setError('');
      cargarComentarios();
    } catch (e) {
      console.error("Error al enviar:", e);
      setError("Error al enviar el comentario. Intenta nuevamente.");
    }
  };

  return (
    <section className="comentarios-recursos">

      <h2 className="comentarios-titulo">Comparte tu reflexión o experiencia</h2>

      {/* Formulario */}
      <div className="comentario-formulario">
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className={`form-input form-textarea ${error ? 'is-invalid' : ''}`}
          placeholder="Escribe tu comentario sobre la charla"
        />
        {error && <p className="error">{error}</p>}

        {!usuario && <p className="error">Inicia sesión para agregar un comentario</p>}

        <button
          className="btn-submit"
          onClick={enviarComentario}
          disabled={!usuario}
        >
          Enviar
        </button>
      </div>

      {/* Comentarios */}
      <div className="comentarios-ver">
        <h3>Comentarios de la comunidad</h3>
        {comentarios.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          <ul className="comentarios-lista">
            {comentarios.map((c) => (
              <li key={c.id} className="comentario-item">
                <p><strong>{c.usuario_nombre}</strong></p>
                <p>{c.contenido}</p>
                <small>{c.fecha}</small>
              </li>
            ))}
          </ul>
        )}
      </div>

    </section>
  );
}

export default ComentariosRecursos;