
import React, { useEffect, useState } from 'react';
import { getData, postData } from "../services/fetch";
import '../styles/ComentariosRecursos.css';

function ComentariosRecursos() {
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const usuario = JSON.parse(localStorage.getItem("authUser"));

  const cargarComentarios = async () => {
    try {
      await postData('comentarios', nuevoComentario);
      setComentarios(data);
    } catch (error) {
      console.error('Error al cargar comentarios:', error);
    }
  };

  useEffect(() => {
    cargarComentarios();
  }, []);

  const enviarComentario = async () => {
    if (!descripcion.trim()) {
      setError("La descripción es obligatoria.");
      return;
    }
    try {
      const nuevoComentario = {
        descripcion,
        autor: usuario?.email || "Anónimo"
      };
      await Services.postDatos('comentarios', nuevoComentario);
      setDescripcion('');
      setError('');
      cargarComentarios(); // Actualiza la lista inmediatamente
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="comentarios-recursos">
      <h2 className="comentarios-titulo">Comparte tu reflexión o experiencia</h2>

      <div className="comentario-formulario">
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className={`form-input form-textarea ${error ? 'is-invalid' : ''}`}
          placeholder="Escribe tu comentario sobre la charla"
        />
        {error && <p className="error">{error}</p>}
        <p className={`${usuario ? "inactivo" : "activo"}`}>
          Inicia sesión para agregar un comentario
        </p>
        <button
          className={`btn-submit ${usuario ? "activo" : "inactivo"}`}
          onClick={enviarComentario}
        >
          Enviar
        </button>
      </div>

      <div className="comentarios-ver">
        <h3>Comentarios de la comunidad</h3>
        {comentarios.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          <ul className="comentarios-lista">
            {comentarios.map((comentario, index) => (
              <li key={index} className="comentario-item">
                <p><strong>Autor:</strong> {comentario.autor}</p>
                <p>{comentario.descripcion}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default ComentariosRecursos;
